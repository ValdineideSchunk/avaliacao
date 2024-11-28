import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ListaResponsaveis = () => {
    const [responsaveis, setResponsaveis] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchResponsaveis = async () => {
            try {
                const response = await axios.get('http://localhost:5000/usuario');
                setResponsaveis(response.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Erro ao carregar a lista de responsáveis.');
                setLoading(false);
            }
        };

        fetchResponsaveis();
    }, []);

    // Função para deletar responsável
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Você tem certeza que deseja excluir este responsável?');
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:5000/usuario/${id}`);
                setResponsaveis(responsaveis.filter(responsavel => responsavel.id_usuario !== id)); // Atualiza a lista
                alert('Responsável excluído com sucesso!');
            } catch (error) {
                console.error(error);
                alert('Erro ao excluir responsável.');
            }
        }
    };

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Lista de Usuarios</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {responsaveis.map((responsavel) => (
                        <tr key={responsavel.id_usuario}>
                            <td>{responsavel.id_usuario}</td>
                            <td>{responsavel.nome}</td>
                            <td>{responsavel.email}</td>
                            <td>{responsavel.telefone}</td>
                            <td>
                                {/* Botão Editar */}
                                <Link
                                    to={`/cadastro_responsaveis/${responsavel.id_usuario}`}
                                    className="btn btn-warning btn-sm me-2"
                                >
                                    Editar
                                </Link>

                                {/* Botão Deletar */}
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(responsavel.id_usuario)}
                                >
                                    Deletar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListaResponsaveis;
