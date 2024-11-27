import pool from '../conexao.js'; // Conexão com o banco de dados

// Função para cadastrar dependente
export const cadastrarDependente = async (nome_dependente, data_nascimento, id_responsavel) => {
    const sql = `
        INSERT INTO dependentes (nome_dependente, data_nascimento, id_responsavel)
        VALUES (?, ?, ?)
    `;
    
    const params = [nome_dependente, data_nascimento, id_responsavel];

    try {
        const [result] = await pool.query(sql, params);
        return result.insertId; // Retorna o ID do dependente inserido
    } catch (error) {
        throw new Error('Erro ao cadastrar dependente: ' + error.message);
    }
};

// Função para listar todos os dependentes
export const listarDependentes = async () => {
    const sql = `
        SELECT d.id_dependente, d.nome_dependente, d.data_nascimento, r.nome AS responsavel_nome
        FROM dependentes d
        JOIN responsaveis r ON d.id_responsavel = r.id_responsavel
    `;
    
    try {
        const [result] = await pool.query(sql);
        return result; // Retorna a lista de dependentes com o nome do responsável
    } catch (error) {
        throw new Error('Erro ao listar dependentes: ' + error.message);
    }
};
