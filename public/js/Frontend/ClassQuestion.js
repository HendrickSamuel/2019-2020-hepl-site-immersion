export class Question{
    constructor(id, texte){
        this.id = id;
        this.titre = texte;
        // this.type = type;
        this.ressentiReponseValeur = undefined;
        this.idHTML = `question-${this.id}`;
        this.template = document.importNode(document.querySelector("#questionTemplate").content, true);
        this.corps = this.template.querySelector('.question');
        this.ressentiInputInsatisfait = undefined;
        this.ressentiInputMeh = undefined;
        this.ressentiInputNeutre = undefined;
        this.ressentiInputSatisfait = undefined;
        this.ressentiInputHeureux = undefined;
    }
    Affiche(){
		console.log(this);
	}
    InitContenuHTML(){
        this.corps.querySelector('.titre-question > h3').textContent = `${this.titre}`;
        this.ressentiInputInsatisfait = this.corps.querySelector('#reponse-1-1');
        this.ressentiInputInsatisfait.setAttribute('id', `${this.idHTML}-reponse-1`);
        this.ressentiInputInsatisfait.setAttribute('name', `${this.idHTML}-reponse`);
        let label = this.corps.querySelector('.r-btn-insatisfait');
        label.setAttribute('for', `${this.idHTML}-reponse-1`);

        this.ressentiInputMeh = this.corps.querySelector('#reponse-1-2');
        this.ressentiInputMeh.setAttribute('id', `${this.idHTML}-reponse-2`);
        this.ressentiInputMeh.setAttribute('name', `${this.idHTML}-reponse`);
        label = this.corps.querySelector('.r-btn-insatisfait');
        label.setAttribute('for', `${this.idHTML}-reponse-2`);

        this.ressentiInputNeutre = this.corps.querySelector('#reponse-1-3');
        this.ressentiInputNeutre.setAttribute('id', `${this.idHTML}-reponse-3`);
        this.ressentiInputNeutre.setAttribute('name', `${this.idHTML}-reponse`);
        label = this.corps.querySelector('.r-btn-insatisfait');
        label.setAttribute('for', `${this.idHTML}-reponse-3`);

        this.ressentiInputSatisfait = this.corps.querySelector('#reponse-1-4');
        this.ressentiInputSatisfait.setAttribute('id', `${this.idHTML}-reponse-4`);
        this.ressentiInputSatisfait.setAttribute('name', `${this.idHTML}-reponse`);
        label = this.corps.querySelector('.r-btn-insatisfait');
        label.setAttribute('for', `${this.idHTML}-reponse-4`);

        this.ressentiInputHeureux = this.corps.querySelector('#reponse-1-5');
        this.ressentiInputHeureux.setAttribute('id', `${this.idHTML}-reponse-5`);
        this.ressentiInputHeureux.setAttribute('name', `${this.idHTML}-reponse`);
        label = this.corps.querySelector('.r-btn-insatisfait');
        label.setAttribute('for', `${this.idHTML}-reponse-5`);

        InitEventCheck(ressentiInputInsatisfait);
        InitEventCheck(ressentiInputMeh);
        InitEventCheck(ressentiInputNeutre);
        InitEventCheck(ressentiInputSatisfait);
        InitEventCheck(ressentiInputHeureux);
    }
    InitEventCheck(radioBtn){
        radioBtn.addEventListener('change', () =>{
            if(radioBtn.getAttribute('checked') == true){
                this.ressentiReponseValeur = radioBtn.getAttribute('value');
            }
        });
    }
    GetHTML(){
		return this.corps;
	}
}