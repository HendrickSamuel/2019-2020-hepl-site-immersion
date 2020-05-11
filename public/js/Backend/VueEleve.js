export function Eleve(data) {
    this.clone = document.importNode(document.querySelector("#templateEleve").content, true); // clonage du template dans le HTML
    this.corps = this.clone.querySelector('.card');

    this.id = data[0].Etudiant;
    this.corps.id = 'eleve'+this.id;

    this.entete = this.corps.querySelector('.data-entete');
    this.entete.innerHTML = data[0].Nom + ' ' + data[0].Prenom;

    this.tables = this.corps.querySelector('.data-horaires');

    console.log(this.corps);

    this.Render = function () {

        document.querySelector("#a").appendChild(this.corps);
    }

    this.addHoraire = function () {
        let jour = document.querySelector("#templateTable");
        let jourclone = document.importNode(jour.content, true);
        this.tables.appendChild(jourclone);
    }

}