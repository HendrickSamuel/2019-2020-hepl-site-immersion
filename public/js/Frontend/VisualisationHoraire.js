/*


*/
import {
    QUESTIONS
} from '/js/ajax/requeteAjaxFrontend';
import * as toast from '/js/toaster/toaster'

document.addEventListener('DOMContentLoaded', () => {
    let formulaireEmail = document.querySelector('#form-email');
    let inputMail = formulaireEmail.querySelector('#email');
    let idEleve;
    let emailValide = false;
    const masqueEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let zoneEleve = document.querySelector('#zone-info-eleve');
    let btnHoraire = document.querySelector('#btn-horaire');
    btnHoraire.classList.add('disabled');

    let inputPrecedent = document.getElementById('InputGetEmail');
    if(inputPrecedent != null)
        PreCharge(inputPrecedent.value);

    function PreCharge(email)
    {
        toast.toastrwarning('Votre email a été détecté, votre visualisation va etre chargée !');
        QUESTIONS.selectIdEleve(email, DemandeIdEleveRequeteOK, DemandeIdEleveRequeteKO);
    }

    inputMail.addEventListener('change', () => {MailValide(inputMail)});
    formulaireEmail.addEventListener('submit', (e) => { 
        e.preventDefault();
        if(emailValide){
            let hash = md5(inputMail.value);
            QUESTIONS.selectIdEleve(hash, DemandeIdEleveRequeteOK, DemandeIdEleveRequeteKO);
        }
    });

    function DemandeIdEleveRequeteOK(data) {
        console.log(data);
        let reponse = (Object)(JSON.parse(JSON.stringify(data)));
        if(reponse['valid'] == true){
            idEleve = reponse['idEtudiant'];
            AfficherHoraire(btnHoraire);
        }        
    }
    function DemandeIdEleveRequeteKO(data) {
        let reponse = (Object)(JSON.parse(JSON.stringify(data)));
        console.log(reponse);
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

    function AfficherHoraire(btnHoraire) {
        btnHoraire.classList.remove('disabled');
        btnHoraire.target = "_blank";
        btnHoraire.href = "/Backend/Export/ExportHoraire.php?etudiant="+ idEleve;
        btnHoraire.click();
    }
});