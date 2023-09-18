import { listaPessoas } from "../Model/Pessoa";

export class Main extends HTMLElement{
    constructor(){
        super();
        this.build();
    }

    build(){
        const shadow = this.attachShadow({mode: "open"});

        //Div do container total do crud
        const container_crud: HTMLDivElement = document.createElement("div");
        container_crud.id = "crud-container";

        //Div do container cabecalho do crud
        const crud_header: HTMLDivElement = document.createElement("div");
        crud_header.id = "crud-header";

        //Div do container do corpo onde os card de pessoas vao ficar
        const crud_body: HTMLDivElement = document.createElement("div");
        crud_body.id = "crud-body";

        //Criando input text e label que acompanha
        const input_nome: HTMLInputElement = document.createElement("input");
        input_nome.type = "text";
        input_nome.id = "input-nome";
        input_nome.placeholder = "Seu nome..."

        const label_nome : HTMLLabelElement = document.createElement("label")
        label_nome.innerText = "NOME";
        label_nome.htmlFor = "input-nome";

        //Criando input text e label que acompanha
        const input_idade: HTMLInputElement = document.createElement("input");
        input_idade.type = "number";
        input_idade.id = "input-idade";
        input_idade.placeholder = "Sua idade..."

        const label_idade: HTMLLabelElement = document.createElement("label")
        label_idade.innerText = "IDADE"
        label_idade.htmlFor = "input-idade";

        const container_inputs: HTMLDivElement = document.createElement("div");
        container_inputs.id = "container-input";

        container_inputs.append(label_nome, input_nome, label_idade, input_idade);

        const container_botao: HTMLDivElement = document.createElement("div");
        container_botao.id = "container-botao";

        const botao_novo_card: HTMLButtonElement = document.createElement("button");
        botao_novo_card.id = "btn-newcard";
        botao_novo_card.innerText = "+"

        container_botao.append(botao_novo_card);
        crud_header.append(container_inputs, container_botao);

        this.handlePessoas().map((cards)=>{
            crud_body.append(cards);
        })

        container_crud.append(crud_header, crud_body);
        shadow.append(container_crud, this.styles());
    }

    handlePessoas(){
        const nodes: Node[] = [];
        listaPessoas.map((pessoas)=> {

            const container: HTMLDivElement = document.createElement("div")
            container.id = "pessoa-container"

            const titulo: HTMLHeadingElement = document.createElement("h1");
            titulo.innerText = pessoas.getNome();

            const sub: HTMLHeadingElement = document.createElement("h2");
            sub.innerText = String(pessoas.getIdade());

            container.append(titulo,sub);

            nodes.push(container);
        });

        return nodes;
    }

    styles(){
        const style = document.createElement("style");
        style.innerText = `
            #crud-container{
                width: 800px;
                height: 500px;

                padding: 20px;
        
                background-color: #044389;
                border: #044389 1px solid;
                border-radius: 20px;
        
                display: flex;
                flex-direction: column;
                gap: 20px;
            }

            #crud-header{
                height: 40%;
                padding: 5px;
        
                display: flex;
                gap: 20px;
                justify-content: space-between;
            }

            #container-input{
                width: 80%;

                color: white;

                display: flex;
                flex-direction: column;
                gap: 10px;
                
                font-size: 18px;
            }

            #container-input input{
                padding: 10px;
                font-size: 10px;

                font-size: 20px;
        
                border-radius: 20px;
            }

            #container-botao{
                height: 100%;
                width: 20%;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        
            #btn-newcard{
                background-color: #1E96FC;

                width: 130px;
                height: 130px;
        
                display: flex;
                justify-content: center;
                align-items: center;
        
                font-size: 50px;
                color: white;
        
                border: #1E96FC 1px solid;
                border-radius: 50%;
            }

            #btn-newcard:hover{
                background-color: whitesmoke;
                color: black;
                cursor: pointer;
            }

            #crud-body{
                height: 80%;
                padding: 5px;

                overflow: -moz-scrollbars-none; 
                overflow-y: scroll;    

                display: flex;
                flex-direction: column;
                gap: 5px;    
            }
        
            #crud-body::-webkit-scrollbar 
            {
                width: 0! important
            }

            #pessoa-container{
                height: 100px;
                padding: 20px;

                background-color: #7CAFC4;
                font-size: 10px;

                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                border: #7CAFC4 1px solid;
                border-radius: 30px;
            }
        `
        return style;
    }
}