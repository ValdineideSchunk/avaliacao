import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const CadastroTarefa = () => {
  const { id } = useParams(); // Captura o ID da tarefa da URL
  const navigate = useNavigate(); // Para redirecionar após salvar
  const [responsaveis, setResponsaveis] = useState([]); // Lista de responsáveis
  const [formData, setFormData] = useState({
    id_usuario: "",
    descricao_tarefa: "",
    nome_setor: "",
    prioridade: "",
    data_cadastro: "",
    status_tarefa: "",
  });
  const [message, setMessage] = useState("");

  // Carregar responsáveis para preencher o select
  useEffect(() => {
    const fetchResponsaveis = async () => {
      try {
        const response = await axios.get("http://localhost:5000/usuarios");
        setResponsaveis(response.data); // Preenche a lista de responsáveis
      } catch (error) {
        console.error("Erro ao carregar os responsáveis:", error);
        setMessage("Erro ao carregar responsáveis.");
      }
    };

    fetchResponsaveis();
  }, []);

  // Carregar dados da tarefa para edição, se o ID for passado
  useEffect(() => {
    if (id) {
      const fetchTarefa = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/tarefas/${id}`);
          setFormData(response.data); // Preenche o formulário com os dados da tarefa
        } catch (error) {
          console.error("Erro ao carregar os dados da tarefa:", error);
          setMessage("Erro ao carregar os dados da tarefa.");
        }
      };
      fetchTarefa();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.id_usuario) {
      setMessage("Por favor, selecione um usuário responsável.");
      return;
    }

    try {
      if (id) {
        // Atualizar tarefa existente
        await axios.put(`http://localhost:5000/tarefas/${id}`, formData);
        setMessage("Tarefa atualizada com sucesso!");
      } else {
        // Cadastrar nova tarefa
        await axios.post("http://localhost:5000/tarefas", formData);
        setMessage("Tarefa cadastrada com sucesso!");
      }
      navigate("/lista_tarefas"); // Redirecionar para a lista de tarefas após salvar
    } catch (error) {
      console.error("Erro ao salvar a tarefa:", error);
      setMessage("Erro ao salvar a tarefa.");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">{id ? "Editar Tarefa" : "Cadastrar Tarefa"}</h2>
      <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
        <div className="mb-3">
          <label className="form-label">Usuário Responsável:</label>
          <select
            name="id_usuario"
            className="form-control"
            value={formData.id_usuario}
            onChange={handleChange}
            required
          >
            <option value="">Selecione um usuário responsável</option>
            {responsaveis.map((responsavel) => (
              <option key={responsavel.id_usuario} value={responsavel.id_usuario}>
                {responsavel.nome}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Descrição da Tarefa:</label>
          <textarea
            name="descricao_tarefa"
            className="form-control"
            value={formData.descricao_tarefa}
            onChange={handleChange}
            rows="2"
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Nome do Setor:</label>
          <select
            name="nome_setor"
            className="form-control"
            value={formData.nome_setor}
            onChange={handleChange}
            required
          >
            <option value="">Selecione o Setor</option>
            <option value="Financeiro">Financeiro</option>
            <option value="RH">RH</option>
            <option value="Tecnologia">Tecnologia</option>
            <option value="Marketing">Marketing</option>
            <option value="Produção">Produção</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Prioridade:</label>
          <select
            name="prioridade"
            className="form-control"
            value={formData.prioridade}
            onChange={handleChange}
            required
          >
            <option value="">Selecione a Prioridade</option>
            <option value="Alta">Alta</option>
            <option value="Média">Média</option>
            <option value="Baixa">Baixa</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Data de Cadastro:</label>
          <input
            type="date"
            name="data_cadastro"
            className="form-control"
            value={formData.data_cadastro ? formData.data_cadastro.split('T')[0] : ''}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Status:</label>
          <select
            name="status_tarefa"
            className="form-control"
            value={formData.status_tarefa}
            onChange={handleChange}
            required
          >
            <option value="">Selecione o Status</option>
            <option value="A Fazer">A Fazer</option>
            <option value="Fazendo">Fazendo</option>
            <option value="Pronto">Pronto</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          {id ? "Salvar Alterações" : "Cadastrar Tarefa"}
        </button>
      </form>
      {message && <p className="mt-3 text-center">{message}</p>}
    </div>
  );
};

export default CadastroTarefa;
