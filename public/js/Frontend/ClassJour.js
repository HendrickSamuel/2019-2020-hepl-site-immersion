import { CarteCours } from "./ClassCarteCours";
import { PlageHoraire } from "./ClassPlage";
import {
    INIT_DRAGGABLE
} from './carteDraggable';
/* 
	Fichier	:	ClassJour.js

	Auteurs	:	Hendrick Samuel
				Khamana B. Benedict 

*/
export class JourImmersion{
    constructor(id, date, plagesHoraire){
        this.id = id;
        this.idHTML = `jour-${id}`;
        this.date = date;
        this.dateFormatBD = undefined;
        this.plages = [];
        this.btnChoix = undefined;
        console.log('date recue :')
        console.log(date);
        console.log('Liste de PLages recue :')
        console.log(plagesHoraire);
        console.log('type Liste de PLages recue :')
        console.log(typeof(plagesHoraire));
        this.InitBtnChoixJour();
        this.InitIdSectionPlageHoraire();
        this.InitPlageHoraire(plagesHoraire);

        this.ChoixJourEvent();
    }
    Affiche(){
        console.log(this);
    }
    InitPlageHoraire(plagesHoraire){
        this.plages[0] = new PlageHoraire(1, true);
        this.plages[1] = new PlageHoraire(2, true);
        this.plages[2] = new PlageHoraire(3, true);
        this.plages[3] = new PlageHoraire(4, false);
        console.log(`Taille de la liste de plage recue = ${plagesHoraire.length}`);
        // Tableaux de plages
        let i = 1;
        for (const plage in plagesHoraire) {
            console.log("Dans Jour Init : choix plage ");
            console.log('Plage recue');
            console.log(plagesHoraire[plage]);
            console.log(`Taille de la plage = ${plagesHoraire[plage].length}`); 
            for (let j = 0; j < plagesHoraire[i].length; j++){
                console.log("Dans Jour Init : ajout carte");
                console.log(plagesHoraire[plage][j]);
                switch (i){
                    case 1:
                        this.plages[0].cartesDispo.push(new CarteCours(plagesHoraire[plage][j]));
                        this.dateFormatBD = plagesHoraire[plage][j].DateFormatBD;
                        break;
                    case 2:
                        this.plages[1].cartesDispo.push(new CarteCours(plagesHoraire[plage][j]));
                        break;
                    case 3:
                        this.plages[2].cartesDispo.push(new CarteCours(plagesHoraire[plage][j]));
                        break;
                    case 4:
                        this.plages[3].cartesDispo.push(new CarteCours(plagesHoraire[plage][j]));
                        break;
                    default:
                        console.log("Houla On a depasse 4 plages ?!");
                        break;
                    
                }
            }
            i++;
        }
    }
    InitBtnChoixJour(){
        let listeBtnJourImmersion = document.getElementById('liste-jours-immersion');
        let buttonJour = document.createElement('button');
        let attribute = document.createAttribute('class');
        buttonJour.setAttributeNode(attribute)
        buttonJour.classList.add('btn-jour', 'btn', 'btn-outline-info', 'mx-3', 'my-2');
        buttonJour.textContent = `Jour ${this.id} : \n ${this.date}`;
        this.btnChoix = buttonJour;
        listeBtnJourImmersion.appendChild(this.btnChoix);
    }
    InitIdSectionPlageHoraire(){
        let sectionPlagesHoraire = document.body.querySelector('.plages-horaire');
        sectionPlagesHoraire.setAttribute('id', this.idHTML);
    }
    ChoixJourEvent(){
        this.btnChoix.addEventListener('click', () =>{
            // alert(`On a appuye sur : ${this.idHTML}, ${this.date}`);
            console.log( `#${this.plages[0].idHTML}`);
            let sectionPlagesHoraire = document.body.querySelector('.plages-horaire');
            let idSection = sectionPlagesHoraire.getAttribute('id');
            // alert(`idSection = ${idSection} | idJour object = ${this.idHTML}`);
            if(this.idHTML != idSection){
                this.RemovePlages(sectionPlagesHoraire);
                this.RenderPlages(sectionPlagesHoraire);
            }
        });
    }
    RenderPlages(sectionPlagesHoraire){
        this.InitIdSectionPlageHoraire();
        this.plages.forEach(plage => {
            // plage.corps.style.opacity = '0';
            sectionPlagesHoraire.appendChild(plage.corps); /*jour-1-plage-1*/
            plage.InitSlider();
            // $(`#${this.idHTML} > #${plage.idHTML}`).fadeIn("slow");
            // console.log(document.querySelector(`#${this.idHTML} > #${plage.idHTML}`));
            // plage.corps.style.visibility = 'none';;
        });
        // INIT_DRAGGABLE();
    }
    RemovePlages(sectionPlagesHoraire){
        console.log('Dans RemovePlages');
        console.log(sectionPlagesHoraire);
        console.log(sectionPlagesHoraire.children);
        
        sectionPlagesHoraire.querySelectorAll('.container-fluid').forEach(plage => 
            // $(`#${this.idHTML} > #${plage.idHTML}`).fadeOut("slow"),
            plage.remove()
        );
        console.log(sectionPlagesHoraire.children);
    }
    ChoisiCours(){
        let valide = false;
        if((this.plages[0].carteChoisie != null) || (this.plages[1].carteChoisie != null) 
            || (this.plages[2].carteChoisie != null) || (this.plages[3].carteChoisie != null)){
                valide = true;
            }
        return valide;
    }
    MinimumCoursUneJournee(){
        let valide = false;
        if((this.plages[0].carteChoisie != null) && (this.plages[1].carteChoisie != null) && (this.plages[2].carteChoisie != null)){
            valide = true;
        }
        return valide;
    }
    MinimumCoursPlusieursJournee(){
        let valide = false;
        if(this.plages[0].carteChoisie != null && this.plages[1].carteChoisie != null){
            valide = true;
        }
        else if(this.plages[2].carteChoisie != null && this.plages[3].carteChoisie != null){
            valide = true;
        }
        return valide;
    }
}