import { Pessoa } from "../Model/Pessoa";
//Minha litsa de pessoa pré carregados apenas para iniciar com alguns cards para demonstrar o visual
let listaPessoas = [
    new Pessoa(`bruno`, 24),
    new Pessoa(`andre`, 35),
    new Pessoa(`maria`, 32),
];
//Criando o web component, o nome e ilustrativo, desde que seja uma classe que herda de HTMLElement
export class Main extends HTMLElement {
    /*
        Nos meus construtores de web components eu gosto de fixar coisas que eu nao quero que sofram
        atualizacao, como por exemplo abaixo
     */
    constructor() {
        //Sendo uma classe que herda de HTMLElement eu preciso do super()
        super();
        //Crio a shadowDom e configuro ela como "open" ou seja ela pode ser visualizada e modificada pela DOM
        const shadow = this.attachShadow({ mode: "open" });
        //Criando link para os google icons, aqui é apenas para o visual dos botoes
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200";
        //Criando link para o css separado, dessa maneira fica mais organizado
        const style = document.createElement('link');
        style.rel = 'stylesheet';
        style.href = "http://localhost/Project/main.css";
        //Uma unica vez na execucao do component eu carrego o CSS e o link para os icones do google
        shadow.append(link, style);
        //Chamo o metodo build() que é onde a magica acontece
        this.build(shadow);
    }
    build(shadow) {
        //Div do container total do crud
        const container_crud = document.createElement("div");
        container_crud.id = "crud-container";
        //Div do container cabecalho do crud
        const crud_header = document.createElement("div");
        crud_header.id = "crud-header";
        //Div do container do corpo onde os card de pessoas vao ficar
        const crud_body = document.createElement("div");
        crud_body.id = "crud-body";
        //Criando input text e label que acompanha
        const input_nome = document.createElement("input");
        input_nome.type = "text";
        input_nome.id = "input-nome";
        input_nome.placeholder = "Seu nome...";
        const label_nome = document.createElement("label");
        label_nome.innerText = "NOME";
        label_nome.htmlFor = "input-nome";
        //Criando input text e label que acompanha
        const input_idade = document.createElement("input");
        input_idade.type = "number";
        input_idade.id = "input-idade";
        input_idade.placeholder = "Sua idade...";
        const label_idade = document.createElement("label");
        label_idade.innerText = "IDADE";
        label_idade.htmlFor = "input-idade";
        const container_inputs = document.createElement("div");
        container_inputs.id = "container-input";
        //Colocando os inputs e labels dentro de um container para facilitar a formatacao CSS
        container_inputs.append(label_nome, input_nome, label_idade, input_idade);
        const container_botao = document.createElement("div");
        container_botao.id = "container-botao";
        //Criando o botao, e atribuindo o evento de click dele
        const botao_novo_card = document.createElement("button");
        botao_novo_card.id = "btn-newcard";
        botao_novo_card.innerText = "+";
        botao_novo_card.addEventListener("click", () => {
            this.addingPessoa(shadow, container_crud);
        });
        //Colocando o botao e container contendo os inputs texts e labels em outro pra facilitar
        //o CSS
        container_botao.append(botao_novo_card);
        crud_header.append(container_inputs, container_botao);
        //Percorrendo o metodo handlePessoas() que retorna uma lista de elementos
        //e coloco eles em uma div para facilitar o controle facilitado de CSS
        this.handlePessoas(shadow, container_crud).map((cards) => {
            crud_body.append(cards);
        });
        //Colocando tudo dentro do container principal e colocando o todo dentro da ShadowDOM
        container_crud.append(crud_header, crud_body);
        shadow.append(container_crud);
    }
    //Metodo que le uma lista de obejtos e monta os cards com esses objetos
    handlePessoas(shadow, child) {
        const elementos = [];
        listaPessoas.map((pessoas) => {
            const container = document.createElement("div");
            container.id = "pessoa-container";
            const titulo = document.createElement("h1");
            titulo.innerText = pessoas.getNome();
            const sub = document.createElement("h2");
            sub.innerText = String(pessoas.getIdade());
            /*
                Eu sei que eu disse que o innerHTML nao deve ser usado, mais neste caso
            como a ultilizacao e apenas para o icone o evento em si esta no
            <button> e nao no <span>
            */
            //Criando os botoes de excluir e editar os itens 
            const btn_deletar = document.createElement("button");
            btn_deletar.id = "btn-deletar";
            //Aqui eu atribui o icone da da google pelo padrao da material icons
            btn_deletar.innerHTML = `
            <span class="material-symbols-outlined">
                delete
            </span>`;
            btn_deletar.addEventListener("click", (event) => {
                this.deletePessoa(pessoas.getId(), shadow, child);
            });
            const btn_editar = document.createElement("button");
            btn_editar.id = "btn-editar";
            btn_editar.innerHTML = `
              <span class="material-symbols-outlined">
                edit
            </span>`;
            btn_editar.addEventListener("click", () => {
                this.handleUpdatePessoa(pessoas.getId(), shadow, child);
            });
            //Montando o card
            container.append(titulo, sub, btn_deletar, btn_editar);
            //Alimentando a lista de cards
            elementos.push(container);
        });
        //Para que o metodo possa ser usado mais facilmente em outras paginas
        //eu retorno a lista de elementos para ser percorrida posteriormente
        return elementos;
    }
    //Metodo para adicionar novas pessoas
    addingPessoa(shadow, child) {
        //Pegando os valores digitados no input text
        const nome = shadow.querySelector("#input-nome");
        const idade = shadow.querySelector("#input-idade");
        //Alimentando a lista de objetos com a nova pessoa
        listaPessoas.push(new Pessoa(nome.value, parseInt(idade.value)));
        //Apagando o componente para atualizacao
        shadow.removeChild(child);
        //chamando novamente o metodo build para que o web component seja recerregado
        this.build(shadow);
    }
    //Metodo para apagar uma pessoa
    deletePessoa(id, shadow, child) {
        //Uso filter para retonar a lista de pessoas sem a pessoa que foi excluida
        const nova_lista = listaPessoas.filter((pessoa) => pessoa.getId() != id);
        listaPessoas = nova_lista;
        //Apagando o componente para atualizacao
        shadow.removeChild(child);
        //chamando novamente o metodo build para que o web component seja recerregado
        this.build(shadow);
    }
    //Metodo para atualizar uma pessoa
    //Esse metodo e um pouco mais complexo que o resto pelo efeito visual que eu quis causar
    /*
        A ideia é usar o design de single page, ou seja resolver todas as ações em uma unica pagina sem
        ter que recarrega-la ou abrir uma nova aba para isso.
    */
    handleUpdatePessoa(id, shadow, child) {
        const nome = shadow.querySelector("#input-nome");
        const idade = shadow.querySelector("#input-idade");
        //Primeiro eu tento encontrar a pessoa na lista pelo id dela;
        const pessoa_atualizada = listaPessoas.find((pessoa) => pessoa.getId() == id);
        if (pessoa_atualizada != null) {
            //Para usar os campos ja existentes eu pego as informacoes da pessoa e coloco
            //nos inputs texts
            nome.value = pessoa_atualizada.getNome();
            idade.value = pessoa_atualizada.getIdade().toString();
            //Para causar o efeito que eu quero, eu removo o botao atual
            //pela velocidade da atualizacao da shadowDom o usuario praticamente nao
            //sente essa remocao
            shadow.getElementById("btn-newcard")?.remove();
            //Crio um novo botao para adicionar as pripriedades e acoes do modo editar
            const btn_newedit = document.createElement("button");
            //Coloco o novo botao no mesmo local do antigo
            shadow.getElementById("container-botao")?.append(btn_newedit);
            btn_newedit.id = "btn-newcard";
            btn_newedit.innerText = "SALVAR";
            btn_newedit.style.fontSize = "26px";
            //Quando a pessoa clica no botao os atributos da pessoas selecionada sao
            //atualizados
            btn_newedit.addEventListener("click", () => {
                pessoa_atualizada.setNome(nome.value);
                pessoa_atualizada.setIdade(parseFloat(idade.value));
                //Apagdo a shadowDom para que ela seja limpa e construida com o modo padrao
                shadow.removeChild(child);
                //Chamando o metodo build() o web component e recarregado
                this.build(shadow);
            });
        }
    }
}
