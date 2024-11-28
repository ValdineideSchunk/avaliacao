import pool from '../conexao.js';

// Cadastrar um usuário
export async function createUsuario(usuario) {
    const sql = `
        INSERT INTO usuario (nome, email) 
        VALUES (?, ?)
    `;
    const params = [usuario.nome, usuario.email];

    try {
        const [retorno] = await pool.query(sql, params);
        console.log('Usuário cadastrado com sucesso.');
        return [201, { id: retorno.insertId, ...usuario }];
    } catch (error) {
        console.error(error);
        return [500, { message: 'Erro ao cadastrar usuário', error }];
    }
}

// Listar todos os usuários
export async function readUsuarios() {
    const sql = 'SELECT * FROM usuario';

    try {
        const [retorno] = await pool.query(sql);
        console.log('Listando usuários.');
        return [200, retorno];
    } catch (error) {
        console.error(error);
        return [500, { message: 'Erro ao listar usuários', error }];
    }
}

// Obter um usuário por ID
export async function getOneUsuario(id) {
    const sql = 'SELECT * FROM usuario WHERE id_usuario = ?';
    const params = [id];

    try {
        const [retorno] = await pool.query(sql, params);
        if (retorno.length < 1) {
            return [404, { message: 'Usuário não encontrado' }];
        }
        return [200, retorno[0]];
    } catch (error) {
        console.error(error);
        return [500, { message: 'Erro ao buscar usuário', error }];
    }
}

// Atualizar um usuário por ID
export async function updateUsuario(usuario, id_usuario) {
    const sql = `
        UPDATE usuario SET 
            nome = ?, 
            email = ? 
        WHERE id_usuario = ?
    `;
    const params = [usuario.nome, usuario.email, id_usuario];

    try {
        const [retorno] = await pool.query(sql, params);
        if (retorno.affectedRows < 1) {
            return [404, { message: 'Usuário não encontrado' }];
        }
        return [200, { message: 'Usuário atualizado com sucesso' }];
    } catch (error) {
        console.error(error);
        return [500, { message: 'Erro ao atualizar usuário', error }];
    }
}

// Deletar um usuário por ID
export async function deleteUsuario(id) {
    const sql = 'DELETE FROM usuario WHERE id_usuario = ?';
    const params = [id];

    try {
        const [retorno] = await pool.query(sql, params);
        if (retorno.affectedRows < 1) {
            return [404, { message: 'Usuário não encontrado' }];
        }
        return [200, { message: 'Usuário deletado com sucesso' }];
    } catch (error) {
        console.error(error);
        return [500, { message: 'Erro ao deletar usuário', error }];
    }
}
