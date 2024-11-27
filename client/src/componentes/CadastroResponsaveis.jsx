import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const CadastroResponsaveis = () => {
    const { id } = useParams(); // Captura o parâmetro de id da URL
    const navigate = useNavigate(); // Para navegar de volta à lista após salvar
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        telefone: '',
    });
    const [message, setMessage] = useState('');

    // Carrega os dados do responsável para edição se um id for passado
    useEffect(() => {
        if (id) {
            const fetchResponsavel = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/responsaveis/${id}`);
                    setFormData(response.data);
                } catch (error) {
                    setMessage('Erro ao carregar os dados do responsável.');
                }
            };
            fetchResponsavel();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                // Atualiza os dados do responsável
                await axios.put(`http://localhost:5000/responsaveis/${id}`, formData);
                setMessage('Responsável atualizado com sucesso!');
            } else {
                // Cria um novo responsável
                await axios.post('http://localhost:5000/responsaveis', formData);
                setMessage('Responsável cadastrado com sucesso!');
            }
            // Redireciona para a lista de responsáveis após salvar
            navigate('/lista_responsaveis');
        } catch (error) {
            setMessage('Erro ao salvar os dados.');
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">{id ? 'Editar Responsável' : 'Cadastrar Responsável'}</h2>
            <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
                <div className="mb-3">
                    <label className="form-label">Nome:</label>
                    <input
                        type="text"
                        name="nome"
                        className="form-control"
                        value={formData.nome}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email:</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Telefone:</label>
                    <input
                        type="text"
                        name="telefone"
                        className="form-control"
                        value={formData.telefone}
                        onChange={handleChange}
                        required  
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                    {id ? 'Salvar Alterações' : 'Cadastrar'}
                </button>
            </form>
            {message && <p className="mt-3 text-center">{message}</p>}
        </div>
    );
};

export default CadastroResponsaveis;
