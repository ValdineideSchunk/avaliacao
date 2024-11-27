import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CadastroDependente = () => {
    const [responsaveis, setResponsaveis] = useState([]); // Armazena a lista de responsáveis
    const [formData, setFormData] = useState({
        nome_dependente: '',
        data_nascimento: '',
        id_responsavel: '', // ID do responsável
    });
    const [message, setMessage] = useState('');

    // Carregar os responsáveis para preencher o select
    useEffect(() => {
        const fetchResponsaveis = async () => {
            try {
                const response = await axios.get('http://localhost:5000/responsaveis');
                setResponsaveis(response.data); // Preenche a lista de responsáveis
            } catch (error) {
                console.error('Erro ao carregar os responsáveis:', error);
                setMessage('Erro ao carregar responsáveis.');
            }
        };

        fetchResponsaveis();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Enviar os dados do dependente
            await axios.post('http://localhost:5000/dependentes', formData);
            setMessage('Dependente cadastrado com sucesso!');
            setFormData({
                nome_dependente: '',
                data_nascimento: '',
                id_responsavel: '', // Limpa o campo após o envio
            });
        } catch (error) {
            console.error(error);
            setMessage('Erro ao cadastrar dependente.');
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Cadastrar Dependente</h2>
            <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
                <div className="mb-3">
                    <label className="form-label">Nome do Dependente:</label>
                    <input
                        type="text"
                        name="nome_dependente"
                        className="form-control"
                        value={formData.nome_dependente}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Data de Nascimento:</label>
                    <input
                        type="date"
                        name="data_nascimento"
                        className="form-control"
                        value={formData.data_nascimento}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Responsável:</label>
                    <select
                        name="id_responsavel"
                        className="form-control"
                        value={formData.id_responsavel}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecione um responsável</option>
                        {responsaveis.map((responsavel) => (
                            <option key={responsavel.id_responsavel} value={responsavel.id_responsavel}>
                                {responsavel.nome}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="btn btn-primary w-100">
                    Cadastrar Dependente
                </button>
            </form>
            {message && <p className="mt-3 text-center">{message}</p>}
        </div>
    );
};

export default CadastroDependente;
