import {setHoraire} from "../ajax/ajaxInscritAleatoire";
import * as toast from '../toaster/toaster';
import {ELEVE_IMMERSION} from '../ajax/requeteAjaxFrontend';
import {Spinner} from "../spinner";

$(document).ready(function () {
    let spinner = new Spinner();
    spinner.Show();

    let formulaireValide = false;
    const masqueNomPrenom = /^[A-Za-z]+[\s\-A-Za-z]$/;
    const masqueEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const masqueEcole = /^[A-Za-z][0-9A-Za-z\-\s]*[A-Za-z0-9]$/;
    let formulaire = document.getElementById('form-inscription');
    let plagesSelect = 3;
    EventChampCorrect(formulaire);

    function retourSetHoraire(data) {
        spinner.Hide();
        if(data.resultat === true)
        {
            let inputNom = formulaire.querySelector('#nom');
            let inputPrenom = formulaire.querySelector('#prenom');
            let inputEcole = formulaire.querySelector('#ecole');
            let inputMail = formulaire.querySelector('#email');
            inputNom.value = '';
            inputPrenom.value = '';
            inputEcole.value = '';
            inputMail.value = '';


            let a = document.createElement('a');
            a.classList.add('btn');
            a.target = "_blank";
            a.href = "/Backend/Export/ExportHoraire.php?etudiant="+ data.valeurs.etudiant;
            document.querySelector("#ReceptacleResultat").appendChild(a);
            a.innerText = "Afficher l'horaire";
            a.click();
            // aller chercher les infos des cours (Nom, local, profs, heures etc);
        }
        else
        {
            toast.toastrerreur(data.message);
        }
    }

    function EventInscription(e){
        spinner.Show();
        e.preventDefault();
        let inputNom = formulaire.querySelector('#nom');
        let inputPrenom = formulaire.querySelector('#prenom');
        let inputEcole = formulaire.querySelector('#ecole');
        let inputMail = formulaire.querySelector('#email');
        let i = 1;
        NomValide(inputNom);
        PrenomValide(inputPrenom);
        EcoleValide(inputEcole);
        MailValide(inputMail);
        if(formulaireValide){
            let champs = formulaire.elements;
            let data = {};
            for(let i = 0; i < champs.length; i++){
                data[champs[i].name] = champs[i].value;
            }
            plagesSelect = data.plages;
            ELEVE_IMMERSION.insertEleve(data, AjoutEleveOk, toast.toastrerreur);
            formulaireValide = false;
            i++;
        }
        else
            alert('FormulaireInvalide ' + i);
    }

    function AjoutEleveOk(data) {
        if(data.valid === true)
        {
            let aujourdhui = new Date();
            let stringajd = aujourdhui.getDate()+"/"+(aujourdhui.getMonth()+1)+"/"+aujourdhui.getFullYear();
            setHoraire({etudiant: data.id, plages: plagesSelect, date: stringajd }, retourSetHoraire, console.log);
        }
        else
        {
            toast.toastrerreur(data.message);
        }

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

        formulaireInscription.addEventListener('submit',EventInscription);
        //#endregion
        spinner.Hide();
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

})