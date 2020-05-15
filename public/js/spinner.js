export class Spinner{
    constructor() {
        this.possibilites = ["loader01","loader02", "loader03", "loader04", "loader10", "loader11"]
        this.spin = this.createSpinner();
    }

    createSpinner()
    {
        if(document.getElementById('spinner') == null)
        {
            let div = document.createElement('div');
            div.classList.add('spinner');
            let spinner = document.createElement('p');
            let visuel = this.possibilites[Math.floor(Math.random() * this.possibilites.length)];
            spinner.classList.add(visuel);
            div.appendChild(spinner);
            div.id = "spinner";
            $(div).hide();
            let doc = document.getElementsByTagName('body');
            doc[0].appendChild(div);
            return div;
        }
        else
            return null;
    }

    ChangeStyle(index)
    {
        index--;
        if(index < 0)
            index = 0;
        if(index > this.possibilites.length)
            index = this.possibilites.length;

        let tmp = this.spin.querySelector('p');
        let classList = tmp.classList;
        while (classList.length > 0) {
            classList.remove(classList.item(0));
        }

        tmp.classList.add(this.possibilites[index]);

    }


    Show()
    {
        if(this.spin != null)
        {
            $(this.spin).show();
        }
    }

    Hide()
    {
        if(this.spin != null)
        {
            $(this.spin).hide();
        }
    }


}