import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ListaTarefas = () => {
  const [tarefas, setTarefas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTarefas = async () => {
      try {
        const response = await axios.get("http://localhost:5000/tarefas");
        setTarefas(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Erro ao carregar as tarefas:", err);
        setError("Erro ao carregar as tarefas.");
        setLoading(false);
      }
    };

    fetchTarefas();
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Você tem certeza que deseja excluir esta tarefa?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/tarefas/${id}`);
        setTarefas(tarefas.filter((tarefa) => tarefa.id_tarefas !== id));
        alert("Tarefa excluída com sucesso!");
      } catch (error) {
        console.error("Erro ao excluir tarefa:", error);
        alert("Erro ao excluir tarefa.");
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/editar_tarefa/${id}`);
  };

  const statusMap = {
    "A Fazer": "A Fazer",
    Fazendo: "Fazendo",
    Pronto: "Pronto",
  };

  // Função para atualizar o estado local ao alterar o select
  const handleStatusChangeLocal = (id, newStatus) => {
    setTarefas((tarefasAtuais) =>
      tarefasAtuais.map((tarefa) =>
        tarefa.id_tarefas === id ? { ...tarefa, novoStatus: newStatus } : tarefa
      )
    );
  };

  // Função para salvar o status no backend
  
  const handleStatusUpdate = async (id, newStatus) => {
    if (!newStatus) return; // Caso o status não tenha sido alterado
    try {
      const response = await axios.put(`http://localhost:5000/status/${id}`, {
        status_tarefa: newStatus,
      });

      console.log(`Tarefa ${id} atualizada com sucesso!`, response.data);

      // Atualiza o estado local para refletir a alteração persistida
      setTarefas((tarefasAtuais) =>
        tarefasAtuais.map((tarefa) =>
          tarefa.id_tarefas === id
            ? { ...tarefa, status_tarefa: newStatus, novoStatus: undefined }
            : tarefa
        )
      );
    } catch (error) {
      console.error("Erro ao atualizar o status da tarefa:", error);
    }
  };

  const renderTarefasPorStatus = (status) => {
    const tarefasFiltradas = tarefas.filter(
      (tarefa) => tarefa.status_tarefa === status
    );

    if (tarefasFiltradas.length === 0) {
      return <p className="text-center">Nenhuma tarefa encontrada.</p>;
    }

    return (
      <div>
        {tarefasFiltradas.map((tarefa) => (
          <div key={tarefa.id_tarefas} className="card border-primary mb-3">
            <div className="card-body">
              <p>
                <strong>Descrição:</strong> {tarefa.descricao_tarefa}
              </p>
              <p>
                <strong>Setor:</strong> {tarefa.nome_setor}
              </p>
              <p>
                <strong>Prioridade:</strong> {tarefa.prioridade}
              </p>
              <p>
                <strong>Status:</strong> {tarefa.status_tarefa}
              </p>
              <p>
                <strong>Usuário Vinculado:</strong>{" "}
                {tarefa.nome || "Não informado"}
              </p>
              <p>
                <strong>Data Cadastro:</strong>{" "}
                {tarefa.data_cadastro ? tarefa.data_cadastro.split("T")[0] : ""}
              </p>
              <div className="d-flex justify-content-between">
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => handleEdit(tarefa.id_tarefas)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(tarefa.id_tarefas)}
                >
                  Excluir
                </button>
              </div>
              <div className="d-flex justify-content">

                <select
                  id={`status-select-${tarefa.id_tarefas}`}
                  className="form-select form-select-sm"
                  value={tarefa.novoStatus || tarefa.status_tarefa}
                  onChange={(e) =>
                    handleStatusChangeLocal(tarefa.id_tarefas, e.target.value)
                  }
                >
                  <option value="A Fazer">A Fazer</option>
                  <option value="Fazendo">Fazendo</option>
                  <option value="Pronto">Pronto</option>
                </select>

                <button
                  className="btn btn-primary btn-sm"
                  onClick={() =>
                    handleStatusUpdate(
                      tarefa.id_tarefas,
                      tarefa.novoStatus || tarefa.status_tarefa
                    )
                  }
                >
                  Atualizar Status
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Gerenciamento de Tarefas</h2>
      <div className="row">
        {Object.keys(statusMap).map((status) => (
          <div className="col-md-4" key={status}>
            <h4 className="text-center">{statusMap[status]}</h4>
            {renderTarefasPorStatus(status)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListaTarefas;
