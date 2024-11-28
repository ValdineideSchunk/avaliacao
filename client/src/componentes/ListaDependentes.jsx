import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListaDependentes = () => {
    const [dependentes, setDependentes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDependentes = async () => {
            try {
                const response = await axios.get('http://localhost:5000/dependentes');
                setDependentes(response.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Erro ao carregar os dependentes.');
                setLoading(false);
            }
        };

        fetchDependentes();
    }, []);

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Lista de Tarefas</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Setor</th>
                        <th>Prioridade</th>
                        <th>Data Cadastro</th>
                        <th>Status Tarefa</th>
                    </tr>
                </thead>
                <tbody>
                    {dependentes.map((dependente) => (
                        <tr key={dependente.id_tarefas}>
                            <td>{dependente.id_tarefas}</td>
                            <td>{dependente.nome_setor}</td>
                            <td>{dependente.prioridade}</td>
                            <td>{dependente.data_cadastro}</td>
                            <td>{dependente.status_tarefa}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListaDependentes;
