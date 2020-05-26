import {getFeedBack} from './../ajax/ajaxFeedBack'
import {Spinner} from "../spinner";

$(document).ready(function () {
    let spinner = new Spinner();
    $("#NoDoughnut").hide();
    spinner.Show();
    getFeedBack(f,alert);


    function f(data) {
        if(data !== null)
        {
            for(let [key, question] of Object.entries(data))
            {
                let liste = [];
                for(let i = 1; i <= 5; i++)
                    liste.push(parseInt(question.avis[i]));

                console.log(liste);
                AfficherPie(question.Question, liste);
            }
        }
        else
        {
            $("#NoDoughnut").show();
        }
        spinner.Hide();
    }

    function AfficherPie(titre, liste)
    {
        let div = document.createElement('div');
        div.classList.add("col-12","col-md-6","col-sm-12","p-lg-5",'p-md-2',"p-sm-0","mt-1","rounded","border","border-dark");
        document.querySelector('#Receptacle').appendChild(div);

        let canvas = document.createElement('canvas');
        canvas.height = 100;
        canvas.width = 100;

        div.appendChild(canvas);
        let somme = document.createElement('p');
        let total = sommeOfAll(liste);
        if(total === 1)
            somme.textContent = total + ' éleve a repondu à la question' ;
        else
            somme.textContent = total + ' éleves ont repondus à la question' ;


        div.appendChild(somme);
        let ctx = canvas.getContext('2d');

        let chiffres = liste;

        let param = {
            datasets: [{
                data: chiffres,
                backgroundColor: [
                    'rgba(255,0,0,0.7)',
                    'rgba(255,154,0,0.7)',
                    'rgba(255,255,255,0.7)',
                    'rgba(167,255,3,0.7)',
                    'rgba(55,255,0,0.7)'
                ],
                borderColor:
                    'rgba(0,0,0,0.7)',
                borderWidth: 0.5
            }],

            labels: [
                'Insatisfait',
                'Mitigé',
                'Neutre',
                'Satisfait',
                'Heureux'
            ],

        };

        let myDoughnutChart = new Chart(ctx, {
            type: 'doughnut',
            data: param,

            options: {
                title: {
                    display: true,
                    text: titre,
                    fontSize: 20
                },
                legend: {
                    display: true,
                    position: 'bottom',

                }}
        });

    }

    function sommeOfAll(liste) {
        let compteur = 0;
        liste.forEach(x => compteur += x);
        return compteur;
    }



})




