import pool from '../conexao.js'; // Conexão com o banco de dados

// Função para cadastrar dependente
export const cadastrarDependente = async (
    id_usuario,
    descricao_tarefa,
    nome_setor,
    prioridade,
    data_cadastro,
    status_tarefa) => {
    const sql = `
        INSERT INTO tarefas (id_usuario,
        descricao_tarefa,
        nome_setor,
        prioridade,
        data_cadastro,
        status_tarefa)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    
    const params = [id_usuario,
        descricao_tarefa,
        nome_setor,
        prioridade,
        data_cadastro,
        status_tarefa];

    try {
        console.log("dados recebidos",params)
        const [result] = await pool.query(sql, params);
        return result.insertId; // Retorna o ID do dependente inserido
    } catch (error) {
        throw new Error('Erro ao cadastrar dependente: ' + error.message);
    }
};

// Função para listar todos os dependentes
export const listarDependentes = async () => {
    const sql = `SELECT * FROM tarefas`;
    
    try {
        
        const [result] = await pool.query(sql);
        console.log(result);
        return result; // Retorna a lista de dependentes com o nome do responsável
    } catch (error) {
        throw new Error('Erro ao listar dependentes: ' + error.message);
    }
};
