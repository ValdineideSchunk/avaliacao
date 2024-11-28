import { cadastrarTarefa, listarTarefas, excluirTarefa } from '../models/tarefasModel.js';

// Função para cadastrar tarefa
export const cadastrarTarefaController = async (req, res) => {
    const {
        id_usuario,
        descricao_tarefa,
        nome_setor,
        prioridade,
        data_cadastro,
        status_tarefa,
    } = req.body;

    try {
        // Chama a função do modelo para cadastrar a tarefa
        const tarefaId = await cadastrarTarefa(
            id_usuario,
            descricao_tarefa,
            nome_setor,
            prioridade,
            data_cadastro,
            status_tarefa
        );

        console.log("Dados recebidos do frontend:", {
            id_usuario,
            descricao_tarefa,
            nome_setor,
            prioridade,
            data_cadastro,
            status_tarefa,
        });

        res.status(201).json({
            message: "Tarefa cadastrada com sucesso!",
            id: tarefaId,
        });
    } catch (error) {
        console.error("Erro ao cadastrar tarefa:", error);
        res.status(500).json({
            message: "Erro ao cadastrar tarefa.",
            error: error.message,
        });
    }
};

// Função para listar tarefas
export const listarTarefasController = async (req, res) => {
    try {
        // Chama a função do modelo para listar as tarefas
        const tarefas = await listarTarefas();
        console.log("Lista de tarefas:", tarefas);
        res.status(200).json(tarefas); // Retorna a lista de tarefas
    } catch (error) {
        console.error("Erro ao listar tarefas:", error.message);
        res.status(500).json({ message: 'Erro ao listar tarefas', error: error.message });
    }
};



export const excluirTarefaController = async (req, res) => {
  const { id } = req.params;

  try {
    const resultado = await excluirTarefa(id);

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ message: "Tarefa não encontrada." });
    }

    res.status(200).json({ message: "Tarefa excluída com sucesso!" });
  } catch (error) {
    console.error("Erro ao excluir tarefa:", error.message);
    res.status(500).json({ message: "Erro ao excluir tarefa.", error: error.message });
  }
};

import { buscarUmaTarefa } from '../models/tarefasModel.js';

export const mostrarUmaTarefaController = async (req, res) => {
  const { id } = req.params; // Captura o ID da URL
  try {
    const tarefa = await buscarUmaTarefa(id);
    if (!tarefa) {
      return res.status(404).json({ message: 'Tarefa não encontrada.' });
    }
    res.status(200).json(tarefa);
  } catch (error) {
    console.error('Erro ao buscar tarefa:', error.message);
    res.status(500).json({ message: 'Erro ao buscar tarefa.', error: error.message });
  }
};

import { editarTarefa } from '../models/tarefasModel.js';

// Controlador para editar uma tarefa
export const editarTarefaController = async (req, res) => {
  const { id } = req.params; // Captura o ID da tarefa da URL
  const {
    id_usuario,
    descricao_tarefa,
    nome_setor,
    prioridade,
    data_cadastro,
    status_tarefa,
  } = req.body; // Captura os dados enviados no corpo da requisição

  try {
    const tarefaAtualizada = await editarTarefa(
      id,
      id_usuario,
      descricao_tarefa,
      nome_setor,
      prioridade,
      data_cadastro,
      status_tarefa
    );

    if (tarefaAtualizada) {
      res.status(200).json({ message: "Tarefa atualizada com sucesso!" });
    } else {
      res.status(404).json({ message: "Tarefa não encontrada." });
    }
  } catch (error) {
    console.error("Erro ao atualizar tarefa:", error.message);
    res.status(500).json({ message: "Erro ao atualizar tarefa.", error: error.message });
  }
};
