export function CreateCoursDisponibleTr(champ)
{
    let tr = document.createElement("tr");

    let intitule = document.createElement("td");
    intitule.innerText = champ.Intitule;
    tr.appendChild(intitule);

    let professeur = document.createElement("td");
    professeur.innerText = champ.Professeur;
    tr.appendChild(professeur);

    let date = document.createElement("td");
    date.innerText = champ.Date;
    tr.appendChild(date);

    let hdebut = document.createElement("td");
    hdebut.innerText = champ.HeureDebut;
    tr.appendChild(hdebut);

    let hfin = document.createElement("td");
    hfin.innerText = champ.HeureFin;
    tr.appendChild(hfin);

    let pdispos = document.createElement("td");
    pdispos.innerText = champ.PlacesTotal;
    tr.appendChild(pdispos);

    let ptotales = document.createElement("td");
    ptotales.innerText = champ.PlacesDisponibles;
    tr.appendChild(ptotales);

    return tr;
}

export function createTeacherTr(champ){
    let td;
    let tr = document.createElement("tr");
    tr.id = champ.ID;

    td = document.createElement("td")
    td.innerText = champ.ID;
    tr.appendChild(td);

    td = document.createElement("td")
    td.innerText = champ.Nom;
    tr.appendChild(td);

    return tr;
}

export function createCourseTr(champ){
    let td;
    let action;

    let tr = document.createElement("tr");
    tr.id = champ.ID;

    td = document.createElement("td");
    td.innerText = champ.ID;
    tr.appendChild(td);

    td = document.createElement("td");
    td.innerText = champ.Intitule;
    tr.appendChild(td);

    return tr;
}