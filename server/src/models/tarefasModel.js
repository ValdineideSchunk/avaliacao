import pool from '../conexao.js'; // Conexão com o banco de dados

// Função para cadastrar tarefa
export const cadastrarTarefa = async (
  id_usuario,
  descricao_tarefa,
  nome_setor,
  prioridade,
  data_cadastro,
  status_tarefa
) => {
  const sql = `
          INSERT INTO tarefas (
              id_usuario,
              descricao_tarefa,
              nome_setor,
              prioridade,
              data_cadastro,
              status_tarefa
          )
          VALUES (?, ?, ?, ?, ?, ?)
      `;

  const params = [
    id_usuario,
    descricao_tarefa,
    nome_setor,
    prioridade,
    data_cadastro,
    status_tarefa,
  ];

  try {
    console.log('Dados recebidos para salvar tarefa:', params);
    const [result] = await pool.query(sql, params);
    return result.insertId; // Retorna o ID da tarefa inserida
  } catch (error) {
    console.error('Erro ao cadastrar tarefa no banco:', error.message);
    throw new Error('Erro ao cadastrar tarefa: ' + error.message);
  }
};

// Função para listar todas as tarefas
export const listarTarefas = async () => {
  const sql = `
    SELECT 
      tarefas.*, 
      usuario.nome AS nome
    FROM 
      tarefas
    LEFT JOIN 
      usuario
    ON 
      tarefas.id_usuario = usuario.id_usuario
  `;

  try {
    const [result] = await pool.query(sql);
    console.log('Tarefas encontradas:', result);
    return result; // Retorna a lista de tarefas com o nome do usuário vinculado
  } catch (error) {
    throw new Error('Erro ao listar tarefas: ' + error.message);
  }
};

// Função para excluir uma tarefa por ID
export const excluirTarefa = async (id) => {
  const sql = `DELETE FROM tarefas WHERE id_tarefas = ?`;
  const params = [id];

  try {
    console.log(`Tentando excluir tarefa com ID: ${id}`);
    const [result] = await pool.query(sql, params);
    console.log(`Resultado da exclusão:`, result);
    return result; // Retorna o resultado da operação
  } catch (error) {
    console.error('Erro ao excluir tarefa no banco:', error.message);
    throw new Error('Erro ao excluir tarefa: ' + error.message);
  }
};
export const buscarUmaTarefa = async (id) => {
  const sql = `SELECT * FROM tarefas WHERE id_tarefas = ?`;
  try {
    const [result] = await pool.query(sql, [id]);
    return result.length > 0 ? result[0] : null; // Retorna a tarefa encontrada ou null
  } catch (error) {
    console.error('Erro ao buscar tarefa no banco:', error.message);
    throw new Error('Erro ao buscar tarefa: ' + error.message);
  }
};

// Função para editar uma tarefa por ID
export const editarTarefa = async (
  id_tarefas,
  id_usuario,
  descricao_tarefa,
  nome_setor,
  prioridade,
  data_cadastro,
  status_tarefa
) => {
  const sql = `
    UPDATE tarefas
    SET
      id_usuario = ?,
      descricao_tarefa = ?,
      nome_setor = ?,
      prioridade = ?,
      data_cadastro = ?,
      status_tarefa = ?
    WHERE id_tarefas = ?
  `;

  const params = [
    id_usuario,
    descricao_tarefa,
    nome_setor,
    prioridade,
    data_cadastro,
    status_tarefa,
    id_tarefas,
  ];

  try {
    console.log('Dados recebidos para editar tarefa:', params);
    const [result] = await pool.query(sql, params);
    console.log('Resultado da edição:', result);
    return result.affectedRows > 0; // Retorna true se a tarefa foi atualizada
  } catch (error) {
    console.error('Erro ao editar tarefa no banco:', error.message);
    throw new Error('Erro ao editar tarefa: ' + error.message);
  }
};

// Função para editar o status de uma tarefa por ID
export const editarStatusTarefa = async (id_tarefas, status_tarefa) => {
  const sql = `
    UPDATE tarefas
    SET status_tarefa = ?
    WHERE id_tarefas = ?
  `;

  const params = [status_tarefa, id_tarefas];

  try {
    console.log('Dados recebidos para editar Status tarefa:', params);

    const [result] = await pool.query(sql, params);

    console.log('Resultado da edição do status:', result);

    return result;
  } catch (error) {
    console.error('Erro ao editar o status da tarefa no banco:', error.message);

    throw new Error('Erro ao editar o status da tarefa: ' + error.message);
  }
};
