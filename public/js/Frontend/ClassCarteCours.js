/* 
	Fichier	:	ClassCarteCours.js

	Auteurs	:	Hendrick Samuel
				Khamana B. Benedict 
	
	But 	:	Classe qui gère un cours

	Cours: "10"
Gestion: "0"
Indus: "1"
Intitule: "Logiciel de contrôle"
PlacesDisponibles: "2"
PlacesTotal: "2"
PlageHoraire: "3"
Reseau: "1"
*/
export class CarteCours {
    constructor(data){
		this.id = data.Cours;
		this.nomCours = data.Intitule;
		this.idHTML = undefined;
		this.plage = data.PlageHoraire;
		this.idPlageHTML = undefined;
		this.placeTotal = data.PlacesTotal;
		this.placeDispo = data.PlacesDisponibles;
		this.gestion =  data.Gestion;
		this.indus = data.Indus;
		this.reseau = data.Reseau;
		this.date = data.Date;
		
		this.template = document.importNode(document.querySelector("#carteDisponibleTemplate").content, true);
		this.corps = this.template.querySelector('.swiper-slide');
		this.corpsPlage = undefined;
		this.btnAjout = undefined;
	}
	Affiche(){
		console.log(this);
	}
	InitContenuHTML(){
		let carteCours = this.corps.querySelector('.carte-cours');
		carteCours.setAttribute('id', this.idHTML);
		this.btnAjout = carteCours.querySelector('.r-btn > button');
		carteCours.querySelector('span').textContent = `${this.placeDispo}/${this.placeTotal}`;
		carteCours.querySelector('.titre > p').textContent = `${this.nomCours}`;
		carteCours.querySelector('.description > p').textContent = `Je suis le cours de ${this.nomCours}`;
		this.EventAjoutCarte();
	}
	InitIdHTML(idPlageHTML, corpsPlage){
		this.idHTML = `cours-dispo-${this.id}-${idPlageHTML}`;
		this.idPlageHTML = idPlageHTML;
		this.corps.querySelector('.carte-cours').setAttribute('id', this.idHTML);
		this.corpsPlage = corpsPlage;
	}
	GetHTML(){
		return this.corps;
	}
	
	EventAjoutCarte(){
		this.btnAjout.addEventListener('click', this.CreationEvent.bind(this));
	}
	CreationEvent(){
		const eventAjout = new CustomEvent('carteChoisieAjoutee', {
			detail:{
				idCours : this.id,
				idHTMLCarte : this.idHTML,
				nomCours: this.nomCours
			}
		});
		this.corpsPlage.dispatchEvent(eventAjout);
	}
}
export class CarteCoursChoisi{
	constructor(idCoursDispo, nomCours){
		this.id = idCoursDispo;
		this.nomCours = nomCours;
		this.idHTML = undefined;
		this.plage = undefined;
		this.idPlageHTML = undefined;
		this.placeTotal = undefined;
		this.placeDispo = undefined;
		this.date = undefined;
		this.template = document.importNode(document.querySelector("#carteChoisieTemplate").content, true);
		this.corps = this.template.querySelector('.carte-cours-choisi');
		this.btnRemove = undefined;
	}
	Affiche(){
		console.log(this);
	}
	InitContenuHTML(){
		this.btnRemove = this.corps.querySelector('.r-btn-close > button');
		this.EventRemoveCarte();
		this.corps.querySelector('.titre > p').textContent = `${this.nomCours}`;
		this.corps.querySelector('.description > p').textContent = `Je suis le cours de ${this.nomCours}`;
	}
	GetHTML(){
		return this.corps;
	}
	InitIdHTML(idPlageHTML, corpsPlage){
		this.idHTML = `cours-choisi-${this.id}-${idPlageHTML}`;
		this.idPlageHTML = idPlageHTML;
		this.corps.setAttribute('id', this.idHTML);
		this.corpsPlage = corpsPlage;
	}
	EventRemoveCarte(){
		this.btnRemove.addEventListener('click', this.CreationEvent.bind(this));
	}
	CreationEvent(){
		const eventRemove = new CustomEvent('carteChoisieEnlevee');
		this.corpsPlage.dispatchEvent(eventRemove);
	}
}