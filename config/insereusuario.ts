import db from './conexao';

export async function InsereUsu(email: string, cpf: string, senha: string, nome: string) {
    try {
        await db.connect();
        const Novousuario = 'insert into usuarios(email,cpf,senha,nome) values ($1,$2,$3,$4)';
        await db.query(Novousuario, [email, cpf, senha, nome]);
    } catch (error) {
        console.error('Erro ao inserir dados:', error);
    } finally {
        await db.end();
    }
}
