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
            <h2 className="text-center mb-4">Lista de Dependentes</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome do Dependente</th>
                        <th>Data de Nascimento</th>
                        <th>Responsável</th>
                    </tr>
                </thead>
                <tbody>
                    {dependentes.map((dependente) => (
                        <tr key={dependente.id_dependente}>
                            <td>{dependente.id_dependente}</td>
                            <td>{dependente.nome_dependente}</td>
                            <td>{dependente.data_nascimento}</td>
                            <td>{dependente.responsavel_nome}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListaDependentes;
