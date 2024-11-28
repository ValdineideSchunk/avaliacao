import pool from '../conexao.js';

// Cadastrar um responsável
export async function createResponsavel(responsavel) {
    const sql = `
        INSERT INTO usuario (nome, email) 
        VALUES (?, ?)
    `;
    const params = [responsavel.nome, responsavel.email];

    try {
        const [retorno] = await pool.query(sql, params);
        console.log('usuario cadastrado com sucesso.');
        return [201, { id: retorno.insertId, ...responsavel }];
    } catch (error) {
        console.error(error);
        return [500, { message: 'Erro ao cadastrar usuario', error }];
    }
}

// Listar todos os responsáveis
export async function readResponsaveis() {
    const sql = 'SELECT * FROM usuario';

    try {
        const [retorno] = await pool.query(sql);
        console.log('Listando usuario');
        return [200, retorno];
    } catch (error) {
        console.error(error);
        return [500, { message: 'Erro ao listar usuario', error }];
    }
}

// Obter um responsável por ID
export async function getOneResponsavel(id) {
    const sql = 'SELECT * FROM usuario WHERE id_usuario = ?';
    const params = [id];

    try {
        const [retorno] = await pool.query(sql, params);
        if (retorno.length < 1) {
            return [404, { message: 'usuario não encontrado' }];
        }
        return [200, retorno[0]];
    } catch (error) {
        console.error(error);
        return [500, { message: 'Erro ao buscarusuario', error }];
    }
}

// Atualizar um responsável por ID
export async function updateResponsavel(responsavel, id_responsavel) {
    const sql = `
        UPDATE usuario SET 
            nome = ?, 
            email = ? 
             
        WHERE id_usuario = ?
    `;
    const params = [responsavel.nome, responsavel.email, id_responsavel];

    try {
        const [retorno] = await pool.query(sql, params);
        if (retorno.affectedRows < 1) {
            return [404, { message: 'usuario não encontrado' }];
        }
        return [200, { message: 'usuario atualizado com sucesso' }];
    } catch (error) {
        console.error(error);
        return [500, { message: 'Erro ao atualizar usuario', error }];
    }
}

// Deletar um responsável por ID
export async function deleteResponsavel(id) {
    const sql = 'DELETE FROM responsaveis WHERE id_usuario = ?';
    const params = [id];

    try {
        const [retorno] = await pool.query(sql, params);
        if (retorno.affectedRows < 1) {
            return [404, { message: 'usuario não encontrado' }];
        }
        return [200, { message: 'usuario deletado com sucesso' }];
    } catch (error) {
        console.error(error);
        return [500, { message: 'Erro ao deletar usuario', error }];
    }
}
