/* 
	Fichier	:	testSlider.js

	Auteurs	:	Hendrick Samuel
				Khamana B. Benedict 
*/

//#region Importation des libs
// import * as JQuery from '/js/lib/jquery.min.js';
// import * as SlickLib from '/js/lib/slick.min.js';
//#endregion

//#region Importation de fonction(ajax)

//#endregion

//#region Debut du script quand le document est prêt
$(document).ready(function () {
	// console.log("Prêt");
	var mySwiper1 = new Swiper('#slider .swiper-container', {
		// Optional parameters
		// direction: 'vertical',
		// loop: true,
		loop: false,
		autoHeight: true,
		grabCursor: false,
		slidesPerView: 2,
		autoHeight: true,
		centeredSlides: true,
		speed: 300,
		spaceBetween: 0,
		centeredSlidesBounds: true,
		allowTouchMove: false,
		// If we need pagination
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
			dynamicBullets: true,
		},

		// Navigation arrows
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},

		// And if we need scrollbar
		scrollbar: {
			el: '.swiper-scrollbar',
		},
	})
});
//#endregion