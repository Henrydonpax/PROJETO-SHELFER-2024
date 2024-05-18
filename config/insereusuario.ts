import db from './conexao';


function validarCPF(cpf: string): boolean {
    // Remover todos os caracteres que não sejam dígitos
    cpf = cpf.replace(/\D/g, '');

    // Verificar se o CPF tem 11 dígitos
    if (cpf.length !== 11) {
        return false;
    }

    // Verificar se todos os dígitos são iguais (ex: 111.111.111-11)
    const allEqual = new Set(cpf.split('')).size === 1;
    if (allEqual) {
        return false;
    }

    return true;
}

function formatarCPF(cpf: string): string {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

function validarSenha(senha: string): boolean {
    return senha.length >= 6;
}

export async function InsereUsu(email: string, cpf: string, senha: string, nome: string) {
    try {

        // function validarEmail(email: string): boolean {
        //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        //     return emailRegex.test(email);
        // }
        
        // if (!validarEmail(email)) {
        //     throw new Error('Email inválido');
            
        // }

        if (!validarCPF(cpf)) {
            throw new Error('CPF inválido');
        }

        if (!validarSenha(senha)) {
            throw new Error('Senha inválida');
        }

        const cpfFormatado = formatarCPF(cpf);

        const Novousuario = 'INSERT INTO usuarios(email,cpf,senha,nome) VALUES ($1,$2,$3,$4)';
        await db.query(Novousuario, [email, cpfFormatado, senha, nome]);
    } catch (error) {
        console.error('Erro ao inserir usuário:', error);
        throw error;
    }
}
