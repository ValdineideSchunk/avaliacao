import { cadastrarDependente, listarDependentes } from '../models/dependentesModel.js';

// Função para cadastrar dependente
export const cadastrarDependenteController = async (req, res) => {
    const { nome_dependente, data_nascimento, id_responsavel } = req.body;
    
    try {
        // Chama a função do modelo para cadastrar o dependente
        const dependenteId = await cadastrarDependente(nome_dependente, data_nascimento, id_responsavel);
        res.status(201).json({ message: 'Dependente cadastrado com sucesso!', id: dependenteId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao cadastrar dependente', error: error.message });
    }
};

// Função para listar dependentes
export const listarDependentesController = async (req, res) => {
    try {
        const dependentes = await listarDependentes();
        res.status(200).json(dependentes); // Retorna a lista de dependentes
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao listar dependentes', error: error.message });
    }
};
