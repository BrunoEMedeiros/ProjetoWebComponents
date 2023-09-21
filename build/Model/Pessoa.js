export class Pessoa {
    id = 0;
    nome;
    idade;
    constructor(nome, idade) {
        this.id = this.id + 1;
        this.nome = nome;
        this.idade = idade;
    }
    getPessoa() {
        return { "nome": this.nome, "idade": this.idade };
    }
    getNome() {
        return this.nome;
    }
    setNome(nome) {
        this.nome = nome;
    }
    getIdade() {
        return this.idade;
    }
    setIdade(idade) {
        this.idade = idade;
    }
    getId() {
        return this.idade;
    }
}
