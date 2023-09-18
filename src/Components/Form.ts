

export class Formulario extends HTMLElement{
    constructor(){
        super();
        this.build();
    }

    build(){
        const shadow = this.attachShadow({mode : "open"});
        
        const div_formulario: HTMLDivElement = document.createElement("div");
        div_formulario.id = "formulario"
        
        const input_nome: HTMLInputElement = document.createElement("input");
        input_nome.type = "text";
        input_nome.id = "nome";
        const label_nome: HTMLLabelElement = document.createElement("label");
        label_nome.htmlFor = "nome";

        const input_idade: HTMLInputElement = document.createElement("input");
        input_idade.type = "text";
        input_idade.id = "idade";
        const label_idade: HTMLLabelElement = document.createElement("label");
        label_idade.htmlFor = "idade";

        const btn: HTMLButtonElement = document.createElement("button");
        btn.id = "btn"
        btn.innerText = "Clique em mim"
        btn.onclick = ()=>{
            console.log(`ola`)
        }

        div_formulario.append(label_nome,input_nome,label_idade,input_idade,btn)
        shadow.append(div_formulario, this.styles())
    }

    styles(){
        const style: HTMLStyleElement = document.createElement("style");
        style.innerText = `
        #formulario{
            height: 400px;
            width: 600px;
            padding: 5px;
            display: flex;
            flex-direction: column;
            justify-content: center;
        
            border: 1px solid black;
            border-radius: 20%;
        }

        input{
            font-size: 20px;
            padding: 20px;
        }

        #idade{
            margin-bottom: 20px;
        }

        button{
            font-size: 20px;
            padding: 20px;
            border: 1px solid black;
            border-radius: 20px
        }
        `

        return style
    }
}