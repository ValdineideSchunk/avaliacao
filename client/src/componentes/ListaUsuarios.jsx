import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ListaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get("http://localhost:5000/usuarios");
        setUsuarios(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Erro ao carregar a lista de usuários.");
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  // Função para deletar usuário
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Você tem certeza que deseja excluir este usuário?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/usuarios/${id}`);
        setUsuarios(usuarios.filter((usuario) => usuario.id_usuario !== id)); // Atualiza a lista
        alert("Usuário excluído com sucesso!");
      } catch (error) {
        console.error(error);
        alert("Erro ao excluir usuário.");
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
      <h2 className="text-center mb-4">Lista de Usuários</h2>
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
          {usuarios.map((usuario) => (
            <tr key={usuario.id_usuario}>
              <td>{usuario.id_usuario}</td>
              <td>{usuario.nome}</td>
              <td>{usuario.email}</td>
              <td>
                {/* Botão Editar */}
                <Link
                  to={`/cadastro_usuarios/${usuario.id_usuario}`}
                  className="btn btn-warning btn-sm me-2"
                >
                  Editar
                </Link>

                {/* Botão Deletar */}
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(usuario.id_usuario)}
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

export default ListaUsuarios;
