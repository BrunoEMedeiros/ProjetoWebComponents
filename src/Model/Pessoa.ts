
export class Pessoa{
    private id: number = 0;
    private nome: string;
    private idade: number;
    
    constructor(nome : string, idade: number){
        this.id = this.id + 1;
        this.nome = nome;
        this.idade = idade
    }

    getPessoa(): {readonly nome: string, readonly idade: number}{
        return {"nome" : this.nome, "idade" : this.idade}
    }

    getNome(){
        return this.nome
    }

    setNome(nome: string){
        this.nome = nome;
    }

    getIdade(): number{
        return this.idade
    }

    setIdade(idade: number){
        this.idade = idade
    }

    getId(){
        return this.idade
    }
}