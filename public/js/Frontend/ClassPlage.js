/* 
	Fichier	:	ClassJour.js

	Auteurs	:	Hendrick Samuel
				Khamana B. Benedict 

*/

import * as swiper from '../lib/swiper.min.js';
import { CarteCours } from "./ClassCarteCours";
import { CarteCoursChoisi } from "./ClassCarteCours";
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
    }
    Affiche(){
        console.log(this);
    }
    InitContenuHTML(idJourHTML){
        if(this.obligatoire)
            this.corps.querySelector('.title > h2').textContent = `Plage ${this.id} (obligatoire)`;
        else
            this.corps.querySelector('.title > h2').textContent = `Plage ${this.id} (non obligatoire)`;
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
                slidesPerView: 2,
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
    NotifyCarteChoisie(){
        this.corps.addEventListener('carteChoisieAjoutee', (e) =>{
            // alert(`Ajout de la carte : ${e.detail.nomCours} ${e.detail.idCarte} dans la plage horaire ${this.idHTML}`);
            let zoneDrop = this.corps.querySelector('.zone-drop');
            console.log(zoneDrop);
            console.log(zoneDrop.children.length);
            if(zoneDrop.children.length > 0){
                let carteChoisieAncienne = zoneDrop.querySelector('.carte-cours-choisi');
                let nomCours = carteChoisieAncienne.querySelector('.titre > p').textContent;
                if(nomCours == e.nomCours){
                    // toaster erreur
                }
                else{
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