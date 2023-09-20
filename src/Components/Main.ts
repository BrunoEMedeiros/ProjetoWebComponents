import { Pessoa} from "../Model/Pessoa";

let listaPessoas: Pessoa[] = [
    new Pessoa(`bruno`,24),
    new Pessoa(`andre`,35),
    new Pessoa(`maria`,32),
]

export class Main extends HTMLElement{
    constructor(){
        super();
        const shadow = this.attachShadow({mode: "open"});
        shadow.append(this.styles());
        this.build(shadow);
    }

    build(shadow: ShadowRoot){
        const link_icones = document.createElement("link");
        link_icones.rel = "stylesheet";
        link_icones.href = "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"

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
        botao_novo_card.innerText = "+";
        botao_novo_card.addEventListener("click", ()=>{
            this.addingPessoa(shadow, container_crud);
        })

        container_botao.append(botao_novo_card);
        crud_header.append(container_inputs, container_botao);

        this.handlePessoas(shadow,container_crud).map((cards,)=>{
            crud_body.append(cards);
        })

        container_crud.append(crud_header, crud_body);
        shadow.append(link_icones, container_crud);
        //this.shadowRoot?.append(shadow);
    }

    handlePessoas(shadow: ShadowRoot, child: HTMLElement){
        const elementos: HTMLElement[] = [];
        listaPessoas.map((pessoas)=> {

            const container: HTMLDivElement = document.createElement("div")
            container.id = "pessoa-container"

            const titulo: HTMLHeadingElement = document.createElement("h1");
            titulo.innerText = pessoas.getNome();

            const sub: HTMLHeadingElement = document.createElement("h2");
            sub.innerText = String(pessoas.getIdade());

            //Eu sei que eu disse que o innerHTML nao deve ser usado, mais neste caso
            //como a ultilizacao e apenas para o icone o evento em si esta no
            //<button> e nao no <span>
            const btn_deletar: HTMLButtonElement = document.createElement("button");
            btn_deletar.id = "btn-deletar";
            btn_deletar.innerHTML = `
            <span class="material-symbols-outlined">
                delete
            </span>`
            btn_deletar.addEventListener("click",(event: Event)=>{
                this.deletePessoa(pessoas.getId(), shadow, child);
            })

            const btn_editar: HTMLButtonElement = document.createElement("button");
            btn_editar.id = "btn-editar";
            btn_editar.innerHTML = `
              <span class="material-symbols-outlined">
                edit
            </span>`
            btn_editar.addEventListener("click",()=>{
                this.handleUpdatePessoa(pessoas.getId(), shadow, child);
            })

            container.append(titulo,sub,btn_deletar, btn_editar);

            elementos.push(container);
        });

        return elementos;
    }

    addingPessoa(shadow: ShadowRoot, child: HTMLElement){
        const nome: HTMLInputElement = shadow.querySelector("#input-nome")!
        const idade: HTMLInputElement = shadow.querySelector("#input-idade")!

        listaPessoas.push(new Pessoa(nome.value, parseInt(idade.value)));
        
        //Apagando o componente para atualizacao
        shadow.removeChild(child);
        this.build(shadow);
    }

    deletePessoa(id: number, shadow: ShadowRoot, child: HTMLElement){
        //console.log(listaPessoas.find((pessoa)=>pessoa.getId() == id));

        const nova_lista = listaPessoas.filter((pessoa)=>pessoa.getId() != id);
        listaPessoas = nova_lista;
        
        //Apagando o componente para atualizacao
        shadow.removeChild(child);
        this.build(shadow);  
        console.log(listaPessoas);
    }

    handleUpdatePessoa(id: number, shadow: ShadowRoot, child: HTMLElement){

        const nome: HTMLInputElement = shadow.querySelector("#input-nome")!
        const idade: HTMLInputElement = shadow.querySelector("#input-idade")!

       const pessoa_atualizada = listaPessoas.find((pessoa)=>pessoa.getId() == id);
        if(pessoa_atualizada != null){
            nome.value = pessoa_atualizada.getNome();
            idade.value = pessoa_atualizada.getIdade().toString();

            shadow.getElementById("btn-newcard")?.remove();

            const btn_newedit = document.createElement("button");
            shadow.getElementById("container-botao")?.append(btn_newedit);

            btn_newedit.id = "btn-newcard";
            btn_newedit.innerText = "SALVAR";
            btn_newedit.style.fontSize = "26px"
            btn_newedit.addEventListener("click",()=>{
                pessoa_atualizada.setNome(nome.value);
                pessoa_atualizada.setIdade(parseFloat(idade.value));
                shadow.removeChild(child);
                this.build(shadow);
            });

        } 
    }

    styles(): HTMLStyleElement{
        const style: HTMLStyleElement = document.createElement("style");
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
                min-height: 100px;
                max-height: 130px;
                padding: 20px;
            
                background-color: #7CAFC4;
                font-size: 10px;
            
                display: flex;
                justify-content: space-around;
                align-items: center;
            
                border: #7CAFC4 1px solid;
                border-radius: 30px;
            }

           
            #btn-deletar{
                width: 50px;
                display: flex;
                justify-content: center;
                align-items: center;

                background-color: #000;
                color: #fff;

                padding: 10px 20px;

                border: black 1px solid;
                border-radius: 5px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

                cursor: pointer;
            }

            #btn-editar{
                width: 50px;
                display: flex;
                justify-content: center;
                align-items: center;

                background-color: #000;
                color: #fff;

                padding: 10px 20px;

                border: black 1px solid;
                border-radius: 5px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

                cursor: pointer;
            }

        `
        return style;
    }
}