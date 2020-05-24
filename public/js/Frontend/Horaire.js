/*

*/
import {
    COURS_DISPO
} from '/js/ajax/requeteAjaxFrontend';

import * as jours from './ClassJour';
// import * as plages from './ClassPlage';
// import * as cartes from './ClassCarteCours';

document.addEventListener('DOMContentLoaded', () => {
    let coursDispoParJour = {};
    let joursImmersion = [];
    let nbEssai = 0;
    let btnConfirmer = null;
    let btnAnnuler = null;
    let btnInscrire = null;
    COURS_DISPO.selectAll(ResultatRequeteOK, ResultatRequeteKO);

    function ResultatRequeteOK(data) {
        coursDispoParJour = (Object)(JSON.parse(JSON.stringify(data)));
        console.log("Cours dispo :")
        console.log(coursDispoParJour);

        let numeroJour = 1;
        for (const date in coursDispoParJour) {
            joursImmersion.push(new jours.JourImmersion(numeroJour, date, coursDispoParJour[date]));
            numeroJour++;
        }
        // console.log("lesJours apres  :");
        // joursImmersion.forEach(jour => {
        //     jour.Affiche();
        // });
        // Init des cartes
        joursImmersion.forEach(jour => {
            jour.plages.forEach(plage => {
                InitHTMLAllCard(plage);
            });
        });
        // Init des plages horaire
        joursImmersion.forEach(jour => {
            InitHTMLAllPlages(jour);
        });

        // console.log("lesJours apres init HTML des cartes :");
        // joursImmersion.forEach(jour => {
        //     jour.Affiche();
        // });

        let jour1 = joursImmersion[0];
        jour1.Affiche();
        let sectionPlagesHoraire = document.body.querySelector('.plages-horaire');
        jour1.RenderPlages(sectionPlagesHoraire);
        // INIT_DRAGGABLE();
        btnConfirmer = document.getElementById('btn-confirmation');
        btnConfirmer.addEventListener('click', EventConfirmation);
    }

    function ResultatRequeteKO(data) {
        alert(`Resultat KO : \n ${data}`);
        console.log(data);
        nbEssai++;
        if(nbEssai < 3)
            COURS_DISPO.selectAll(ResultatRequeteOK, ResultatRequeteKO);
    }

    function InitHTMLAllCard(plageHoraire){
        plageHoraire.cartesDispo.forEach(carte => {
            carte.InitContenuHTML();
        });
    }
    function InitHTMLAllPlages(jour){
        jour.plages.forEach(plage => {
            plage.InitContenuHTML(jour.idHTML);
        });
    }
    function EventConfirmation() {
        // alert('OK');
        if(VerificationChoixCours()){
            let sectionJour = document.querySelector('#jour-plage-horaire');
            let sectionPlages = document.querySelector('.plages-horaire');
            let sectionConfirmation = document.querySelector('#zone-confirmation');

            // Pas propre changera apres
            sectionJour.style.visibility = 'hidden';
            sectionPlages.style.visibility = 'hidden';
            sectionConfirmation.style.visibility = 'hidden';
            sectionJour.style.visibility = 'hidden';
            CreationRecap();
        }
        else
            alert('Pas assez de cours');
    }
    function EventInscription(){
        alert('OK btn inscription');
        let formulaireInscription = document.querySelector("#form-inscription");
        formulaireInscription.addEventListener('submit', (e)=>{
            e.preventDefault();
            let champs = formulaireInscription.elements;
            console.log(champs);
            let data = {};
            for(let i = 0; i < champs.length; i++){
                data[champs[i].name] = champs[i].value;

            }
            console.log(data);
        });

    }
    function EventAnnulation(){
        alert('OK btn annuler');
    }
    function CreationRecap(){
        let recapTemplate = document.importNode(document.querySelector("#recapTemplate").content, true);
        let zoneRecap = recapTemplate.querySelector('#zone-recap');
        let zoneJournee = zoneRecap.querySelector('#zone-journee');
        document.documentElement.scrollTop = 0;
        document.querySelector('nav').insertAdjacentElement('afterend', zoneRecap);
        // Creation des journees
        CreationRecapJournee(zoneJournee);
        // Creation du formulaire
        CreationRecapForm(zoneRecap)
    }
    function CreationRecapJournee(zoneJournee){
        joursImmersion.forEach(jour => {
            jour.btnChoix.disabled = true;
            let recapJourneeTemplate = document.importNode(document.querySelector("#recapJourneeTemplate").content, true);
            let uneJournee = recapJourneeTemplate.querySelector('.journee');
            console.log(uneJournee);
            uneJournee.querySelector('.titre-jour > h2').textContent = `Jour ${jour.id} : ${jour.date}`;

            let listePlages = uneJournee.querySelector('.liste-plage');
            jour.plages.forEach(plage => {
                let recapPlageTemplate = document.importNode(document.querySelector("#recapPlageTemplate").content, true);
                let unePlage = recapPlageTemplate.querySelector('.plage');
                console.log(unePlage);
                unePlage.querySelector('.numero-plage > h3').textContent = `Plage ${plage.id}`;
                let coursChoisi = unePlage.querySelector('.cours');
                    console.log(plage.carteChoisie);
                    let carteRecapTemplate = document.importNode(document.querySelector("#carteRecapTemplate").content, true);
                    let unCours = carteRecapTemplate.querySelector('.carte-cours-recap');
                    if(plage.carteChoisie != null){
                        unCours.querySelector('.titre > p').textContent = `${plage.carteChoisie.nomCours}`;
                    }
                    else{
                        unCours.querySelector('.titre > p').textContent = `Aucun cours choisi`;
                        unCours.style.borderStyle = "dashed";
                    }
                    unCours.querySelector('.description > p').textContent = ``;
                    coursChoisi.appendChild(unCours);
                listePlages.appendChild(unePlage);
            });
            zoneJournee.appendChild(uneJournee);
        });
    }
    function CreationRecapForm(zoneRecap){
        let inscriptionTemplate = document.importNode(document.querySelector("#inscriptionTemplate").content, true);
        let zoneEleve = inscriptionTemplate.querySelector('#zone-info-eleve');
        btnInscrire = zoneEleve.querySelector('#btn-inscrire');
        btnInscrire.addEventListener('click', EventInscription);
        btnAnnuler = zoneEleve.querySelector('#btn-annuler');
        btnAnnuler.addEventListener('click', EventAnnulation);

        zoneRecap.insertAdjacentElement('afterend', zoneEleve);
    }
    function VerificationChoixCours(){
        let valide = false;
        //Nombre de journee où un cours a ete choisi
        let nbJourChoisi = 0;
        joursImmersion.forEach(jour =>{
            if(jour.ChoisiCours())
                nbJourChoisi++;
        });
        // Verification si seulement une seule journee(3 premieres plages horaires obligatoire)
        if(nbJourChoisi == 1){
            for (let i = 0; i < joursImmersion.length; i++) {
                if(joursImmersion[i].MinimumCoursUneJournee()){
                    valide = true;
                    break;
                }
            }
        }
        // Verification si plusieurs journee(Minimum une demi-journee par jour => 2 plages par jour)
        else if(nbJourChoisi > 1){
            for (let i = 0; i < joursImmersion.length; i++) {
                if(joursImmersion[i].ChoisiCours()){
                    if(joursImmersion[i].MinimumCoursPlusieursJournee()){
                        valide = true;
                    }
                    else{
                        valide = false;
                        break;
                    }
                }
            }
        }
        // Aucun jour complete
        else{
            valide = false;
        }
        return valide;
    }
});