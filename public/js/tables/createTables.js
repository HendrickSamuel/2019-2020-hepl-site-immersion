export function CreateTr(champ,liste)
{
    let tr = document.createElement("tr");
    tr.id = champ.IDPrincipal;
    console.log(champ);

    let td;

    for(let i=0; i < liste.length; i++)
    {
        td = document.createElement("td");
        td.innerText = champ[liste[i]];
        tr.appendChild(td);
    }

        return tr;
}