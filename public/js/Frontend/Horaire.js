/*

*/
import {
    COURS_DISPO, ELEVE_IMMERSION
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
    let formulaireValide = false;
    const masqueNomPrenom = /^[A-Za-z]+[\s\-A-Za-z]$/;
    const masqueEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const masqueEcole = /^[A-Za-z][0-9A-Za-z\-\s]*[A-Za-z0-9]$/;
    COURS_DISPO.selectAll(CoursDisponibleRequeteOK, CoursDisponibleRequeteKO);

    function CoursDisponibleRequeteOK(data) {
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

    function CoursDisponibleRequeteKO(data) {
        alert(`Resultat CoursDisponible KO : \n ${data}`);
        console.log(data);
        // nbEssai++;
        // if(nbEssai < 3)
        //     COURS_DISPO.selectAll(CoursDisponibleRequeteOK, CoursDisponibleRequeteKO);
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
        // alert('OK btn inscription');
        let formulaireInscription = document.querySelector("#form-inscription");
        let inputNom = formulaireInscription.querySelector('#nom');
        let inputPrenom = formulaireInscription.querySelector('#prenom');
        let inputEcole = formulaireInscription.querySelector('#ecole');
        let inputMail = formulaireInscription.querySelector('#email');
        NomValide(inputNom);
        PrenomValide(inputPrenom);
        EcoleValide(inputEcole);
        MailValide(inputMail);
        formulaireInscription.addEventListener('submit', (e)=>{
            e.preventDefault();
            if(formulaireValide){
                let champs = formulaireInscription.elements;
                // console.log(champs);
                let data = {};
                for(let i = 0; i < champs.length; i++){
                    data[champs[i].name] = champs[i].value;
                }
                console.log(data);
                //Essai Insertion de l'eleve + horaire
                ELEVE_IMMERSION.insertEleve(data, InsertEleveRequeteOK, InsertEleveRequeteKO);
            }
            else
                alert('FormulaireInvalide');
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
        EventChampCorrect(zoneEleve.querySelector('#form-inscription'));
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
            formulaireValide = true;
        }
        else{
            console.log(`Nom incorrect : ${value} Test = ${masqueNomPrenom.test(value)}`);
            inputNom.classList.add('border-danger');
            inputNom.classList.remove('border-success');
            formulaireValide = false;
        }
    }
    function PrenomValide(inputPrenom){
        let value = inputPrenom.value;
        if(masqueNomPrenom.test(value) === true){
            console.log(`PreNom correct : ${value} Test = ${masqueNomPrenom.test(value)}`);
            inputPrenom.classList.add('border-success');
            inputPrenom.classList.remove('border-danger');
            formulaireValide = true;
        }
        else{
            console.log(`PreNom incorrect : ${value} Test = ${masqueNomPrenom.test(value)}`);
            inputPrenom.classList.add('border-danger');
            inputPrenom.classList.remove('border-success');
            formulaireValide = false;
        }
    }
    function EcoleValide(inputEcole){
        let value = inputEcole.value;
        if(masqueEcole.test(value) === true){
            console.log(`Ecole correct : ${value} Test = ${masqueEcole.test(value)}`);
            inputEcole.classList.add('border-success');
            inputEcole.classList.remove('border-danger');
            formulaireValide = true;
        }
        else{
            console.log(`Ecole incorrect : ${value} Test = ${masqueEcole.test(value)}`);
            inputEcole.classList.add('border-danger');
            inputEcole.classList.remove('border-success');
            formulaireValide = false;
        }
    }
    function MailValide(inputMail){
        let value = inputMail.value;
        if(masqueEmail.test(value) === true){
            console.log(`Mail correct : ${value} Test = ${masqueEmail.test(value)}`);
            inputMail.classList.add('border-success');
            inputMail.classList.remove('border-danger');
            formulaireValide = true;
        }
        else{
            console.log(`Mail incorrect : ${value} Test = ${masqueEmail.test(value)}`);
            inputMail.classList.add('border-danger');
            inputMail.classList.remove('border-success');
            formulaireValide = false;
        }
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

    function InsertEleveRequeteOK(data){
        let retour = (Object)(JSON.parse(JSON.stringify(data)));
        console.log("retour InsertEleveRequeteOK :")
        console.log(retour);
    }
    function InsertEleveRequeteKO(data){
        alert(`Resultat InsertEleveRequeteKO : \n ${data}`);
        console.log(data);
    }

    function InsertHoraireRequeteOK(){
        
    }
    function InsertHoraireRequeteKO(){
    }
});