
export class Pessoa{
    private nome: string;
    private idade: number;
    
    constructor(nome : string, idade: number){
        this.nome = nome;
        this.idade = idade
    }

    getPessoa(): {readonly nome: string, readonly idade: number}{
        return {"nome" : this.nome, "idade" : this.idade}
    }

    getNome(){
        return this.nome
    }

    getIdade(){
        return this.idade
    }
}


export const listaPessoas: Pessoa[] = [
    new Pessoa(`bruno`,24),
    new Pessoa(`andre`,35),
    new Pessoa(`maria`,32)
]