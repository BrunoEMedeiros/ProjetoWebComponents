

export class Header extends HTMLElement{
    constructor(){
        super();
        this.build();
    }

    build(){
        const shadow = this.attachShadow({ mode:"open" });
        //Meu header
        const header: HTMLElement = document.createElement("header")
        header.id = "cabecalho"

        //Titulo
        const titulo: HTMLHeadingElement = document.createElement("h1");
        titulo.innerText = "SESI/SENAI"

        //Container do titulo, usado para facilitar a estilizacao com CSS
        const div_titulo: HTMLDivElement = document.createElement("div")
        div_titulo.append(titulo);

        //Links para as demais paginas
        let link_a: HTMLAnchorElement = document.createElement("a");
        link_a.href = "https://www.google.com";
        link_a.textContent = "HOME";

        let link_b: HTMLAnchorElement = document.createElement("a");
        link_b.href = "http://localhost/Project/teste.html";
        link_b.textContent = "ABOUT";

        let link_c: HTMLAnchorElement = document.createElement("a");
        link_c.href = "https://www.google.com";
        link_c.textContent = "LOGIN";

        //Div para as tags <a> tambem para facilitar a execucao CSS
        const div_links: HTMLDivElement = document.createElement("div");
        div_links.id = "links";
        div_links.append(link_a, link_b, link_c)

        header.append(div_titulo, div_links);
        shadow.append(header, this.styles());
    }

    styles(){
        const style = document.createElement("style");
        style.innerText = `
            h1{
                font-size: 30px;
            }
            
            a{
                font-size: 20px;
                text-decoration: none;
                color: black;
            }
            
            #cabecalho{
                padding: 10px;
                height: 100%;
                background-color: #FFAD05;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            #links{
                width: 40%;
                display: flex;
                justify-content: space-around;
                align-items: center;
            }
        `
        return style
    }
}