/*

*/
import {actionconfig} from "../ajax/requetesconfig";
import * as toast from '../toaster/toaster';
import {Spinner} from '../spinner.js';
import {
    COURS_DISPO, ELEVE_IMMERSION
} from '/js/ajax/requeteAjaxFrontend';


import * as jours from './ClassJour';
import * as plages from './ClassPlage';
import * as cartes from './ClassCarteCours';

document.addEventListener('DOMContentLoaded', () => {
    let spinner = new Spinner();
    let coursDispoParJour = {};
    let joursImmersion = [];
    let nbEssai = 0;
    let btnConfirmer = document.getElementById('btn-confirmation');
    let btnTuto = document.getElementById('btn-tuto');
    $(btnConfirmer).hide();
    let btnAnnuler = null;
    let btnInscrire = null;
    let btnRediriger = null;
    let nomValide = false;
    let prenomValide = false;
    let ecoleValide = false;
    let emailValide = false;
    let nbJourChoisi = 0;
    let journeeOuverte = false;
    const masqueNomPrenom = /^[A-Za-z]+[\s\-A-Za-z]$/;
    const masqueEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const masqueEcole = /^[A-Za-z][0-9A-Za-z\-\s]*[A-Za-z0-9]$/;

    $('#jour-plage-horaire').hide();
    
    spinner.Show();
    actionconfig('', 'GET', ImmersionOuverteRequeteOK, ImmersionOuverteRequeteKO);

    //#region Modale slider
    let sliderTuto = new Swiper(`#tuto .swiper-container`, {
        init: false,
        loop: false,
        autoHeight: true,
        grabCursor: false,
        slidesPerView: 1,
        autoHeight: true,
        speed: 500,
        spaceBetween: 15,
        allowTouchMove: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: `#tuto .swiper-pagination`,
            clickable: true,
            dynamicBullets: true,
        },
        navigation: {
            nextEl: `#tuto .swiper-button-next`,
            prevEl: `#tuto .swiper-button-prev`,
        },
        scrollbar: {
			el: '#tuto .swiper-scrollbar',
		},
    });
    //#endregion


    function ImmersionOuverteRequeteOK(data) {
        // alert("Dans ImmersionOuverteRequeteOK ");
        let retour = (Object)(JSON.parse(JSON.stringify(data)));
        console.log(retour);
        if(retour['periodeInscription'] == true){
            $('#jour-plage-horaire').show();
            spinner.ChangeStyle(3);
            COURS_DISPO.selectAll(CoursDisponibleRequeteOK, CoursDisponibleRequeteKO);
        }else{
            spinner.Hide();
            toast.toastrerreur("Désolé, les inscriptions ne sont pas encore ouvertes");
            // creer div inscription fermee 
        } 
    }
    function ImmersionOuverteRequeteKO(data) {
        spinner.Hide();
        toast.toastrerreur(data);
    }
    function CoursDisponibleRequeteOK(data) {
        coursDispoParJour = (Object)(JSON.parse(JSON.stringify(data)));
        console.log("Cours dispo :")
        console.log(coursDispoParJour);

        let numeroJour = 1;
        for (const date in coursDispoParJour) {
            joursImmersion.push(new jours.JourImmersion(numeroJour, date, coursDispoParJour[date]));
            numeroJour++;
        }
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

        let jour1 = joursImmersion[0];
        jour1.Affiche();
        let sectionPlagesHoraire = document.body.querySelector('.plages-horaire');
        jour1.RenderPlages(sectionPlagesHoraire);
        btnConfirmer = document.getElementById('btn-confirmation');
        btnConfirmer.addEventListener('click', EventConfirmation);
        spinner.Hide();
        $(btnConfirmer).show();

        btnConfirmer.addEventListener('click', EventConfirmation);
        btnTuto.addEventListener('click', EventTuto);
    }

    function CoursDisponibleRequeteKO(data) {
        spinner.Hide();
        toast.toastrerreur("Erreur : cours pour la journée d'immersion indisponibles");
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
    function EventTuto(){
        $('#modaleTuto').modal('show');
        sliderTuto.init();
        sliderTuto.slideTo(0, 0, null);
        
    }

    function EventConfirmation() {
        if(VerificationChoixCours()){
            let sectionJour = document.querySelector('#jour-plage-horaire');
            let sectionPlages = document.querySelector('.plages-horaire');
            let sectionConfirmation = document.querySelector('#zone-confirmation');

            $(sectionJour).hide();
            $(sectionPlages).hide();
            $(sectionConfirmation).hide();
            CreationRecap();
        }
        else
            alert('Pas assez de cours');
    }
    function EventInscription(e, formulaireInscription){
        e.preventDefault();
        let inputNom = formulaireInscription.querySelector('#nom');
        let inputPrenom = formulaireInscription.querySelector('#prenom');
        let inputEcole = formulaireInscription.querySelector('#ecole');
        let inputMail = formulaireInscription.querySelector('#email');
        NomValide(inputNom);
        PrenomValide(inputPrenom);
        EcoleValide(inputEcole);
        MailValide(inputMail);
        if(FormulaireValide()){
            let champs = formulaireInscription.elements;
            let dataEleve = {};
            for(let i = 0; i < champs.length; i++){
                dataEleve[champs[i].name] = champs[i].value;
            }
            console.log(dataEleve);
            //Essai Insertion de l'eleve + horaire
            spinner.Show();
            ELEVE_IMMERSION.insertEleveHoraire(dataEleve, CreationHoraireAInserer(joursImmersion), InsertEleveRequeteOK, InsertEleveRequeteKO);
        }
        else
            alert('FormulaireInvalide ' + i);
    }
    function EventAnnulation(){
        let sectionJour = document.querySelector('#jour-plage-horaire');
        let sectionPlages = document.querySelector('.plages-horaire');
        let sectionConfirmation = document.querySelector('#zone-confirmation');
        let sectionRecap = document.querySelector('#zone-recap');
        let footerInfoEleve = document.querySelector('#zone-info-eleve');

        sectionRecap.remove();
        footerInfoEleve.remove();

        $(sectionJour).show();
        $(sectionPlages).show();
        $(sectionConfirmation).show();

        document.documentElement.scrollTop = 0;
    }
    function CreationRecap(){
        let recapTemplate = document.importNode(document.querySelector("#recapTemplate").content, true);
        let zoneRecap = recapTemplate.querySelector('#zone-recap');
        let zoneJournee = zoneRecap.querySelector('#zone-journee');
        document.documentElement.scrollTop = 0;
        document.body.insertAdjacentElement('beforeend', zoneRecap);
        // Creation des journees
        CreationRecapJournee(zoneJournee);
        // Creation du formulaire
        CreationRecapForm(zoneRecap);
    }
    function CreationRecapJournee(zoneJournee){
        joursImmersion.forEach(jour => {
            // jour.btnChoix.disabled = true;
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
                        if(plage.carteChoisie.gestion == 0)
                            unCours.querySelector('.gestion').remove();
                        if(plage.carteChoisie.indus == 0)
                            unCours.querySelector('.indus').remove();
                        if(plage.carteChoisie.reseau == 0)
                            unCours.querySelector('.reseau').remove();
                    }
                    else{
                        unCours.querySelector('.titre > p').textContent = `Aucun cours choisi`;
                        unCours.style.borderStyle = "dashed";
                        unCours.querySelector('.description').remove();
                    }
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
        btnRediriger = zoneEleve.querySelector('#btn-rediriger');
        $(btnRediriger).hide();
        btnAnnuler = zoneEleve.querySelector('#btn-annuler');
        btnAnnuler.addEventListener('click', () => {EventAnnulation()});

        zoneRecap.insertAdjacentElement('afterend', zoneEleve);
        let formulaireInscription = zoneEleve.querySelector("#form-inscription");
        EventChampCorrect(formulaireInscription);
        formulaireInscription.addEventListener('submit', (e) => { EventInscription(e, formulaireInscription)});
    }
    function EventChampCorrect(formulaireInscription){
        let inputNom = formulaireInscription.querySelector('#nom');
        let inputPrenom = formulaireInscription.querySelector('#prenom');
        let inputEcole = formulaireInscription.querySelector('#ecole');
        let inputMail = formulaireInscription.querySelector('#email');

        //#region Change
        inputNom.addEventListener('change', () => {NomValide(inputNom)});
        inputPrenom.addEventListener('change', () => {PrenomValide(inputPrenom)});
        inputEcole.addEventListener('change', () => {EcoleValide(inputEcole)});
        inputMail.addEventListener('change', () => {MailValide(inputMail)});
        //#endregion
    }
    function NomValide(inputNom){
        let value = inputNom.value;
        if(masqueNomPrenom.test(value) === true){
            console.log(`Nom correct : ${value} Test = ${masqueNomPrenom.test(value)}`);
            inputNom.classList.add('border-success');
            inputNom.classList.remove('border-danger');
            nomValide = true;
        }
        else{
            console.log(`Nom incorrect : ${value} Test = ${masqueNomPrenom.test(value)}`);
            inputNom.classList.add('border-danger');
            inputNom.classList.remove('border-success');
            nomValide = false;
        }
    }
    function PrenomValide(inputPrenom){
        let value = inputPrenom.value;
        if(masqueNomPrenom.test(value) === true){
            console.log(`PreNom correct : ${value} Test = ${masqueNomPrenom.test(value)}`);
            inputPrenom.classList.add('border-success');
            inputPrenom.classList.remove('border-danger');
            prenomValide = true;
        }
        else{
            console.log(`PreNom incorrect : ${value} Test = ${masqueNomPrenom.test(value)}`);
            inputPrenom.classList.add('border-danger');
            inputPrenom.classList.remove('border-success');
            prenomValide = false;
        }
    }
    function EcoleValide(inputEcole){
        let value = inputEcole.value;
        if(masqueEcole.test(value) === true){
            console.log(`Ecole correct : ${value} Test = ${masqueEcole.test(value)}`);
            inputEcole.classList.add('border-success');
            inputEcole.classList.remove('border-danger');
            ecoleValide = true;
        }
        else{
            console.log(`Ecole incorrect : ${value} Test = ${masqueEcole.test(value)}`);
            inputEcole.classList.add('border-danger');
            inputEcole.classList.remove('border-success');
            ecoleValide = false;
        }
    }
    function MailValide(inputMail){
        let value = inputMail.value;
        if(masqueEmail.test(value) === true){
            console.log(`Mail correct : ${value} Test = ${masqueEmail.test(value)}`);
            inputMail.classList.add('border-success');
            inputMail.classList.remove('border-danger');
            emailValide = true;
        }
        else{
            console.log(`Mail incorrect : ${value} Test = ${masqueEmail.test(value)}`);
            inputMail.classList.add('border-danger');
            inputMail.classList.remove('border-success');
            emailValide = false;
        }
    }
    function FormulaireValide() {
        if(nomValide && prenomValide && ecoleValide && emailValide)
            return true;
        else
            return false;
    }
    function VerificationChoixCours(){
        let valide = false;
        //Nombre de journee où un cours a ete choisi
        let nbJour = 0;
        joursImmersion.forEach(jour =>{
            if(jour.ChoisiCours())
                nbJour++;
        });
        // Verification si seulement une seule journee(3 premieres plages horaires obligatoire)
        if(nbJour == 1){
            for (let i = 0; i < joursImmersion.length; i++) {
                if(joursImmersion[i].MinimumCoursUneJournee()){
                    valide = true;
                    break;
                }
            }
        }
        // Verification si plusieurs journee(Minimum une demi-journee par jour => 2 plages par jour)
        else if(nbJour > 1){
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
        nbJourChoisi = nbJour;
        return valide;
    }
    /*-------------------------------------------------*/
    function InsertEleveRequeteOK(data){
        let inputMail = document.querySelector('#email');
        let hash = md5(inputMail.value);
        let btn = document.getElementById('btn-redirection');
        btn.href='/Frontend/VisualiserHoraire.php?userKey='+hash;
        spinner.Hide();
        $(btn).show();
        $(btnInscrire).hide();
        btn.click();
        
    }
    function InsertEleveRequeteKO(data){
        spinner.Hide();
        alert(`Resultat InsertEleveRequeteKO : \n ${data}`);
        console.log(data);
    }
    function CreationHoraireAInserer(joursImmersion){
        let data = new Array();
        for(let i = 0; i < joursImmersion.length; i++){
            if(joursImmersion[i].ChoisiCours()){
                // avoir la date
                let date = joursImmersion[i].dateFormatBD;
                for(let j = 0; j < joursImmersion[i].plages.length; j++){
                    if(joursImmersion[i].plages[j].carteChoisie != null){
                        let obj = {};
                        obj.nomCours = joursImmersion[i].plages[j].carteChoisie.nomCours;
                        obj.idCours = parseInt(joursImmersion[i].plages[j].carteChoisie.id);
                        obj.plage = j+1;
                        obj.date = date;
                        data.push(obj);
                    }
                }
            }
        }
        console.log(data);
        return data;
    }
});