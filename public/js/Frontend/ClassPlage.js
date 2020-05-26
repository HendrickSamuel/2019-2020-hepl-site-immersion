/* 
	Fichier	:	ClassJour.js

	Auteurs	:	Hendrick Samuel
				Khamana B. Benedict 

*/

import * as swiper from '../lib/swiper.min.js';
// import { CarteCours } from "./ClassCarteCours";
import { CarteCoursChoisi } from "./ClassCarteCours";
import * as toast from '../toaster/toaster';
export class PlageHoraire {
    constructor(id, obligatoire){
        this.id = id;
        this.idHTML = `plage-${id}`;
        this.carteChoisie = null;
        this.cartesDispo = [];
        this.template = document.importNode(document.querySelector("#plageHoraireTemplate").content, true);
        this.corps = this.template.querySelector('.container-fluid');
        this.obligatoire = obligatoire;
        this.slider = undefined;
        this.zoneDrop = undefined;
        this.carteEnDeplacement = undefined;
    }
    Affiche(){
        console.log(this);
    }
    InitContenuHTML(idJourHTML){
        switch (this.id) {
            case 1:
                this.corps.querySelector('.title > h2').textContent = `Plage ${this.id} : 8h20 / 8h50 – 10h20`;
                break;
            case 2:
                this.corps.querySelector('.title > h2').textContent = `Plage ${this.id} : 10h30 – 12h30 / 13h`;
                break;
            case 3:
                this.corps.querySelector('.title > h2').textContent = `Plage ${this.id} : 13h / 13h30 – 15h / 15h30`;
                break;
            case 4:
                this.corps.querySelector('.title > h2').textContent = `Plage ${this.id} : 15h / 15h30 – 16h / 17h30`;
                break;
        }
        this.idHTML = `${idJourHTML}-${this.idHTML}`;
        let sliderHTML = this.corps.querySelector('#slider');
        let zoneDropHTML = this.corps.querySelector('#drop');
        this.corps.setAttribute("id", `${this.idHTML}`);
        sliderHTML.setAttribute("id", `slider-${this.idHTML}`);
        zoneDropHTML.setAttribute("id", `drop-${this.idHTML}`);
        this.NotifyCarteChoisie();
        let contenuSlider = this.corps.querySelector('.swiper-wrapper');
        if(this.cartesDispo.length > 0){
            this.cartesDispo.forEach(carte => {
                contenuSlider.insertAdjacentElement('afterbegin', carte.GetHTML());
                console.log("contenuSlider : ")
                console.log(contenuSlider);
            });
        }
        else{
            let template = document.importNode(document.querySelector("#carteIndisponibleTemplate").content, true);
            let slide = template.querySelector('.swiper-slide');
            contenuSlider.insertAdjacentElement('afterbegin', slide);
        }
        this.cartesDispo.forEach(carteDispo => {
            carteDispo.InitIdHTML(this.idHTML, this.corps);
        });
    }
    InitSlider(){
        if(this.cartesDispo.length > 2){
            this.slider = new Swiper(`#${this.idHTML} .swiper-container`, {
                loop: false,
                autoHeight: true,
                grabCursor: false,
                slidesPerView: 1,
                autoHeight: false,
                centeredSlides: true,
                speed: 300,
                spaceBetween: 0,
                centeredSlidesBounds: true,
                allowTouchMove: false,
                // mousewheel: true,
                pagination: {
                    el: `#${this.idHTML} .swiper-pagination`,
                    clickable: true,
                    dynamicBullets: true,
                },
                navigation: {
                    nextEl: `#${this.idHTML} .swiper-button-next`,
                    prevEl: `#${this.idHTML} .swiper-button-prev`,
                },
            });
        }
        else{
            this.slider = new Swiper(`#${this.idHTML} .swiper-container`, {
                loop: false,
                autoHeight: true,
                grabCursor: false,
                slidesPerView: 1,
                autoHeight: true,
                centeredSlides: true,
                speed: 300,
                spaceBetween: 0,
                centeredSlidesBounds: true,
                allowTouchMove: false,
                // mousewheel: true,
                pagination: {
                    el: `#${this.idHTML} .swiper-pagination`,
                    clickable: true,
                    dynamicBullets: true,
                },
                navigation: {
                    nextEl: `#${this.idHTML} .swiper-button-next`,
                    prevEl: `#${this.idHTML} .swiper-button-prev`,
                },
            });
        }
    }
    InitDraggable(){
        this.cartesDispo.forEach(carteDispo => {
            let carteCours = carteDispo.corps.querySelector('.carte-cours');
            // carteCours.setAttribute();
            carteCours.addEventListener('dragstart', e => {
                console.log('Drag start for carteCours');
                this.carteEnDeplacement = e.target;
                console.log(e);
                setTimeout(() => (carteCours.classList.add('dragging', 'hold')), 50);
            }, false);

            carteCours.addEventListener('dragend', () => {
                carteCours.classList.remove('dragging', 'hold');
                console.log('Drag end for carteCours');
                this.carteEnDeplacement = null;// truc marant
            });
        });
    }
    InitZoneDrop(){
        this.zoneDrop = this.corps.querySelector('.zone-drop');
        this.zoneDrop.addEventListener('dragenter', () => {
            console.log(`A drag is entered !`);
        });
        this.zoneDrop.addEventListener('dragover', e => {
            console.log(e);
            let idCarteDeplacement = this.carteEnDeplacement.getAttribute('id');
            console.log("Carte en deplacement = " + idCarteDeplacement);
            console.log(this.carteEnDeplacement);
            if(idCarteDeplacement != null){
                if (this.carteChoisie != null) {
                    console.log("Deja   cours choisi pour la plage");
                    if(idCarteDeplacement.includes(this.idHTML)){
                        let titreCarteCoursChoisi = this.carteChoisie.corps.querySelector('.titre > p');
                        let titreCarteCoursEnDeplacement = this.carteEnDeplacement.querySelector('.titre > p');
                        if (titreCarteCoursChoisi.textContent === titreCarteCoursEnDeplacement.textContent){
                            this.zoneDrop.classList.add('border-danger');
                            console.log(`Place prise, le cours a deja ete choisi !`);
                        }
                        else{
                            e.preventDefault();
                            this.zoneDrop.classList.add('border-success');
                            console.log(`Place PAS prise bonne zone !`);
                        }
                    }
                }else{
                    console.log("Pas cours choisi pour la plage");
                    if(idCarteDeplacement.includes(this.idHTML)){
                        e.preventDefault();
                        this.zoneDrop.classList.add('border-success');
                        console.log(`Place PAS prise bonne zone !`);
                    }
                }
            }else{
                this.zoneDrop.classList.add('border-danger');
                console.log(`Cet objet n'est pas une carte cours !`);
            }
            console.log(`I have been hoverred !`);
            this.zoneDrop.classList.add('hovered');
        });
        this.zoneDrop.addEventListener('dragleave', () => {
            if (this.zoneDrop.classList.contains('border-danger'))
                this.zoneDrop.classList.remove('border-danger');
            if (this.zoneDrop.classList.contains('border-success'))
                this.zoneDrop.classList.remove('border-success');
            this.zoneDrop.classList.remove('hovered');
        });
        this.zoneDrop.addEventListener('drop', (e) => {
            e.preventDefault();
            console.log(`A drag is dropped !`);
            if(this.carteChoisie != null){
                this.carteChoisie.btnRemove.click();
            }
            let nomCours = this.carteEnDeplacement.querySelector('.titre > p').textContent;
            const eventAjout = new CustomEvent('carteChoisieAjoutee', {
                detail:{
                    idCours : -1,
                    idHTMLCarte : null,
                    nomCours: nomCours,
                    gestion: null,
                    indus: null,
                    reseau: null
                }
            });
            this.corps.dispatchEvent(eventAjout);

            this.carteEnDeplacement.classList.remove('dragging', 'hold');

            this.zoneDrop.classList.remove('hovered');
            if(this.zoneDrop.classList.contains('border-success'))
                this.zoneDrop.classList.remove('border-success');
        });

    }
    NotifyCarteChoisie(){
        this.corps.addEventListener('carteChoisieAjoutee', (e) =>{
            let zoneDrop = this.corps.querySelector('.zone-drop');
            console.log("e ID = " + e.detail.id);
            if(e.detail.idCours != -1){
                console.log(zoneDrop);
                console.log(zoneDrop.children.length);
                if(zoneDrop.children.length > 0){
                    let carteChoisieAncienne = zoneDrop.querySelector('.carte-cours-choisi');
                    let nomCours = carteChoisieAncienne.querySelector('.titre > p').textContent;
                    if(nomCours != e.nomCours){
                        let carteChoisieNouvelle = new CarteCoursChoisi(
                            e.detail.idCours, e.detail.nomCours, e.detail.gestion, e.detail.indus, e.detail.reseau);
                        carteChoisieNouvelle.Affiche();
                        carteChoisieNouvelle.InitContenuHTML();
                        carteChoisieNouvelle.InitIdHTML(this.idHTML, this.corps);
                        carteChoisieNouvelle.Affiche();
                        this.carteChoisie = carteChoisieNouvelle;
                        zoneDrop.replaceChild(carteChoisieNouvelle.GetHTML(), carteChoisieAncienne);
                        this.Affiche();
                    }
                }
                else{
                    // La Zone de drop est vide
                    let carteChoisieNouvelle = new CarteCoursChoisi(e.detail.idCours, e.detail.nomCours, e.detail.gestion, e.detail.indus, e.detail.reseau);
                    carteChoisieNouvelle.Affiche();
                    carteChoisieNouvelle.InitContenuHTML();
                    carteChoisieNouvelle.InitIdHTML(this.idHTML, this.corps);
                    carteChoisieNouvelle.Affiche();
                    this.carteChoisie = carteChoisieNouvelle;
                    zoneDrop.appendChild(carteChoisieNouvelle.GetHTML());
                    this.Affiche();
                }
            }else{
                for (let i = 0; i < this.cartesDispo.length; i++) {
                    if(this.cartesDispo[i].nomCours == e.detail.nomCours){
                        let carteChoisieNouvelle = new CarteCoursChoisi(this.cartesDispo[i].idCours, 
                            this.cartesDispo[i].nomCours, this.cartesDispo[i].gestion, this.cartesDispo[i].indus,this.cartesDispo[i].reseau);
                            carteChoisieNouvelle.InitContenuHTML();
                            carteChoisieNouvelle.InitIdHTML(this.idHTML, this.corps);
                        carteChoisieNouvelle.Affiche();
                        this.carteChoisie = carteChoisieNouvelle;
                        zoneDrop.appendChild(carteChoisieNouvelle.GetHTML());
                        break;
                    }
                    
                }
            }
        });
        this.corps.addEventListener('carteChoisieEnlevee', (e) =>{
            // alert(`Ajout de la carte : ${e.detail.nomCours} ${e.detail.idCarte} dans la plage horaire ${this.idHTML}`);
            let zoneDrop = this.corps.querySelector('.zone-drop');
            let carteChoisieAncienne = zoneDrop.querySelector('.carte-cours-choisi');
            carteChoisieAncienne.remove();
            this.carteChoisie = null;
            this.Affiche();
        });
    }
}