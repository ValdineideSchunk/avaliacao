import pool from '../conexao.js';

// Cadastrar um responsável
export async function createResponsavel(responsavel) {
    const sql = `
        INSERT INTO responsaveis (nome, email, telefone) 
        VALUES (?, ?, ?)
    `;
    const params = [responsavel.nome, responsavel.email, responsavel.telefone];

    try {
        const [retorno] = await pool.query(sql, params);
        console.log('Responsável cadastrado com sucesso.');
        return [201, { id: retorno.insertId, ...responsavel }];
    } catch (error) {
        console.error(error);
        return [500, { message: 'Erro ao cadastrar responsável', error }];
    }
}

// Listar todos os responsáveis
export async function readResponsaveis() {
    const sql = 'SELECT * FROM responsaveis';

    try {
        const [retorno] = await pool.query(sql);
        console.log('Listando responsáveis');
        return [200, retorno];
    } catch (error) {
        console.error(error);
        return [500, { message: 'Erro ao listar responsáveis', error }];
    }
}

// Obter um responsável por ID
export async function getOneResponsavel(id) {
    const sql = 'SELECT * FROM responsaveis WHERE id_responsavel = ?';
    const params = [id];

    try {
        const [retorno] = await pool.query(sql, params);
        if (retorno.length < 1) {
            return [404, { message: 'Responsável não encontrado' }];
        }
        return [200, retorno[0]];
    } catch (error) {
        console.error(error);
        return [500, { message: 'Erro ao buscar responsável', error }];
    }
}

// Atualizar um responsável por ID
export async function updateResponsavel(responsavel, id_responsavel) {
    const sql = `
        UPDATE responsaveis SET 
            nome = ?, 
            email = ?, 
            telefone = ? 
        WHERE id_responsavel = ?
    `;
    const params = [responsavel.nome, responsavel.email, responsavel.telefone, id_responsavel];

    try {
        const [retorno] = await pool.query(sql, params);
        if (retorno.affectedRows < 1) {
            return [404, { message: 'Responsável não encontrado' }];
        }
        return [200, { message: 'Responsável atualizado com sucesso' }];
    } catch (error) {
        console.error(error);
        return [500, { message: 'Erro ao atualizar responsável', error }];
    }
}

// Deletar um responsável por ID
export async function deleteResponsavel(id) {
    const sql = 'DELETE FROM responsaveis WHERE id_responsavel = ?';
    const params = [id];

    try {
        const [retorno] = await pool.query(sql, params);
        if (retorno.affectedRows < 1) {
            return [404, { message: 'Responsável não encontrado' }];
        }
        return [200, { message: 'Responsável deletado com sucesso' }];
    } catch (error) {
        console.error(error);
        return [500, { message: 'Erro ao deletar responsável', error }];
    }
}
