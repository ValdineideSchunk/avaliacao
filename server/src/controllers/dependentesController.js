import { cadastrarDependente, listarDependentes } from '../models/dependentesModel.js';

// Função para cadastrar dependente
export const cadastrarDependenteController = async (req, res) => {
    const { id_responsavel,
        descricao_tarefa,
        nome_setor,
        prioridade,
        data_cadastro,
        status_tarefa } = req.body;
    
    
    try {
        // Chama a função do modelo para cadastrar o dependente
        const dependenteId = await cadastrarDependente(id_responsavel,
            descricao_tarefa,
            nome_setor,
            prioridade,
            data_cadastro,
            status_tarefa);

            console.log('Dados recebidos do frontend:', dependenteId);
        res.status(201).json({ message: 'Dependente cadastrado com sucesso!', id: dependenteId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao cadastrar dependenteee', error: error.message });
    }
};

// Função para listar dependentes
export const listarDependentesController = async (req, res) => {
    try {
        
        const dependentes = await listarDependentes();
        console.log(dependentes);
        res.status(200).json(dependentes); // Retorna a lista de dependentes
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao listar dependentes', error: error.message });
    }
};
