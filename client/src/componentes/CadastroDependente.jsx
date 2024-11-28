import React, { useState, useEffect } from "react";
import axios from "axios";


const CadastroDependente = () => {
  const [responsaveis, setResponsaveis] = useState([]); // Armazena a lista de responsáveis
  const [formData, setFormData] = useState({
    id_responsavel: "",
    descricao_tarefa: "",
    nome_setor: "",
    prioridade: "",
    data_cadastro: "",
    status_tarefa: "",
  });
  const [message, setMessage] = useState("");

  // Carregar os responsáveis para preencher o select
  useEffect(() => {
    const fetchResponsaveis = async () => {
      try {
        const response = await axios.get("http://localhost:5000/usuario");
        setResponsaveis(response.data); // Preenche a lista de responsáveis
      } catch (error) {
        console.error("Erro ao carregar os responsáveis:", error);
        setMessage("Erro ao carregar responsáveis.");
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
        console.log(formData)
      // Enviar os dados do dependente
      await axios.post("http://localhost:5000/dependentes", formData);
      setMessage("Tarefa cadastrada com sucesso!");
      setFormData({
        id_usuario: "",
        descricao_tarefa: "",
        nome_setor: "",
        prioridade: "",
        data_cadastro: "",
        status_tarefa: "",
      });
    } catch (error) {
      console.error(error);
      setMessage("Erro ao cadastrar dependente.");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Cadastrar tarefas</h2>
      <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
        <div className="mb-3">
          <label className="form-label">Usuario Responsável:</label>
          <select
            name="id_usuario"
            className="form-control"
            value={formData.id_usuario}
            onChange={handleChange}
            
          >
            <option value="">Selecione um Usuario responsável</option>
            {responsaveis.map((responsavel) => (
              <option
                key={responsavel.id_usuario}
                value={responsavel.id_usuario}
              >
                {responsavel.nome}
              </option>
            ))}
          </select>

        </div>
        <div className="mb-3">
          <label className="form-label">Descrição da Tarefa:</label>
          <input
            type="text"
            name="descricao_tarefa"
            className="form-control"
            value={formData.descricao_tarefa}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Nome do Setor:</label>
          <input
            type="text"
            name="nome_setor"
            className="form-control"
            value={formData.nome_setor}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Prioridade:</label>
          <input
            type="text"
            name="prioridade"
            className="form-control"
            value={formData.prioridade}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
            <label className="form-label">Data de Cadastro:</label>
            <input
              type="date"
              name="data_cadastro"
              className="form-control"
              value={formData.data_cadastro}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
          <label className="form-label">Status:</label>
          <input
            type="text"
            name="status_tarefa"
            className="form-control"
            value={formData.status_tarefa}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Cadastrar Tarefa
        </button>
      </form>
      {message && <p className="mt-3 text-center">{message}</p>}
    </div>
  );
};

export default CadastroDependente;
