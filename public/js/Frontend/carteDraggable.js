/* 

*/
export let INIT_DRAGGABLE = function() {
    // console.log('DOM is loaded');

    let carteEnDeplacement = null;
    let draggableCartes = document.querySelectorAll('.carte-cours');
    let dropZones = document.querySelectorAll('.zone-drop');
    let idCarteDeplacement = 'carteDeplacement';

    //#region Fonctions
    function InitDraggable(carte) {
        let attribute = document.createAttribute('draggable');
        attribute.value = 'true';
        carte.setAttributeNode(attribute);
        // carte.setAttribute('draggable', 'true');
        carte.addEventListener('dragstart', e => {
            console.log('Drag start for carte-cours');
            carteEnDeplacement = e.target;
            console.log(e);
            setTimeout(() => (carte.classList.add('dragging', 'hold')), 50);
        }, false);

        carte.addEventListener('dragend', () => {
            carte.classList.remove('dragging', 'hold');
            console.log('Drag end for carte-cours');
        });
    }
    //#region Carte
    function CreateRow() {
        let row = document.createElement('div');
        row.classList.add('row');
        return row;
    }

    function CreateCol() {
        let col = document.createElement('div');
        row.classList.add('col');
        return col;
    }

    function CreateRadioBtn() {
        let btn = document.createElement('div');
        btn.classList.add('r-btn');
        let icon = document.createElement('i');
        // icon.style.color = 'green';
        let attribute = document.createAttribute('class');
        icon.setAttributeNode(attribute)
        icon.setAttribute('class', 'fas fa-check-circle');
        btn.appendChild(icon);
        return btn;
    }
    function CreateRadioBtnClose() {
        let div = document.createElement('div');
        div.classList.add('r-btn-close');
        let btn = document.createElement('button');
        let icon = document.createElement('i');
        // icon.style.color = 'green';
        let attribute = document.createAttribute('class');
        icon.setAttributeNode(attribute)
        icon.setAttribute('class', 'fas fa-times-circle');
        btn.appendChild(icon);
        div.appendChild(btn)
        return div;
    }

    function CreateInfoCours() {
        let info = document.createElement('div');
        info.classList.add('info-cours');
        return info;
    }

    function CreateTitre() {
        let col = document.createElement('div');
        let p = document.createElement('p');
        col.classList.add('col-12', 'px-4', 'titre');
        col.appendChild(p);
        return col;
    }

    function CreateDescription() {
        let col = document.createElement('div');
        let p = document.createElement('p');
        col.classList.add('col-12', 'px-4', 'description');
        col.appendChild(p);
        return col;
    }

    function CreateGhostImage(dragElement, e) {

    }
    //#endregion

    //#endregion

    //#region Draggable Event
    draggableCartes.forEach(carte => {
        InitDraggable(carte);
    });
    //#endregion
    //#region Drop Event
    dropZones.forEach(dropZone => {
        dropZone.addEventListener('dragenter', () => {
            console.log(`A drag is entered !`);
        })
        dropZone.addEventListener('dragover', e => {
            // let col = dropZone.querySelector('.col-12');
            // console.log(col);
            console.log(e);
            let carteCoursChoisi = dropZone.querySelector('.carte-cours-choisi');
            console.log(`carteCoursChoisi : ${carteCoursChoisi}`);
            if (carteCoursChoisi != null) {
                let titreCarteCoursChoisi = carteCoursChoisi.querySelector('.titre > p');
                console.log(`Titre carte choisi : ${titreCarteCoursChoisi}`);
                let titreCarteCoursEnDeplacement = carteEnDeplacement.querySelector('.titre > p');
                console.log(`Titre carte en deplacement : ${titreCarteCoursEnDeplacement}`);
                if (titreCarteCoursChoisi.textContent === titreCarteCoursEnDeplacement.textContent) {
                    dropZone.classList.add('border-danger');
                    console.log(`Place prise, le cours a deja ete choisi !`);
                } else {
                    e.preventDefault();
                    dropZone.classList.add('border-success');
                    console.log(`Place PAS prise !`);
                }
            } else {
                e.preventDefault();
                dropZone.classList.add('border-success');
                console.log(`Place PAS prise !`);
            }
            console.log(`I have been hoverred !`);
            dropZone.classList.add('hovered');
        });
        dropZone.addEventListener('dragleave', () => {
            console.log(`A drag is leave !`);
            if (dropZone.classList.contains('border-danger'))
                dropZone.classList.remove('border-danger');
            if (dropZone.classList.contains('border-success'))
                dropZone.classList.remove('border-success');

            dropZone.classList.remove('hovered');
        });
        dropZone.addEventListener('drop', e => {
            e.preventDefault(); // Cette méthode est toujours nécessaire pour éviter une éventuelle redirection inattendue
            console.log(`A drag is dropped !`);
            let draggableCopy = carteEnDeplacement.cloneNode(true);
            let carteCoursChoisi = dropZone.querySelector('.carte-cours-choisi');
            console.log(`Carte cours avant-1 : ${carteCoursChoisi}`);
            if (carteCoursChoisi != null) {
                console.log("Avant");
                console.log(dropZone);
                dropZone.removeChild(dropZone.querySelector('.carte-cours-choisi'))
                console.log("Apres");
                console.log(dropZone);
                // return;
            }
            console.log(`Carte cours avant-2 : ${carteCoursChoisi}`);
            carteCoursChoisi = document.createElement('div');
            let radioBtn = CreateRadioBtn();
            let radioBtnClose = CreateRadioBtnClose();
            // let radioBtnIcon = radioBtn.querySelector('ion-icon');
            // radioBtnIcon.setAttribute('name', 'checkmark-circle');
            // let radioBtnIcon = radioBtn.querySelector('i');
            // radioBtnIcon.setAttribute('class', 'fas fa-check-circle');

            let infoCours = CreateInfoCours();

            let ligneTitre = CreateRow();
            let titre = CreateTitre();
            console.log(titre);
            titre.querySelector('p').textContent = draggableCopy.querySelector('.titre > p').textContent;
            ligneTitre.appendChild(titre);


            let ligneDescription = CreateRow();
            let description = CreateDescription();
            console.log(description);
            description.querySelector('p').textContent = draggableCopy.querySelector('.description > p').textContent;
            ligneDescription.appendChild(description);

            infoCours.appendChild(ligneTitre);
            infoCours.appendChild(ligneDescription);


            carteCoursChoisi.classList.add('carte-cours-choisi');
            carteCoursChoisi.appendChild(radioBtn);
            carteCoursChoisi.appendChild(radioBtnClose);
            carteCoursChoisi.appendChild(infoCours);
            console.log(`Carte cours choisi apres : ${carteCoursChoisi}`);

            draggableCopy.classList.add('col-12');
            draggableCopy.classList.remove('dragging', 'hold');
            // let col = dropZone.querySelector('.col-12');
            dropZone.insertAdjacentElement('afterbegin', carteCoursChoisi);
            dropZone.classList.remove('hovered');
            if (dropZone.classList.contains('border-success'))
                dropZone.classList.remove('border-success');
        });
    });
    //#endregion
};