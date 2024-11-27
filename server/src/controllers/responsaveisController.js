import {
  createResponsavel,
  readResponsaveis,
  getOneResponsavel,
  updateResponsavel,
  deleteResponsavel
} from '../models/responsaveisModel.js';

export async function cadastroResponsavel(req, res) {
  const responsavel = req.body;
  const [status, resultado] = await createResponsavel(responsavel);
  res.status(status).json(resultado);
}

export async function listarResponsaveis(req, res) {
  const [status, resultado] = await readResponsaveis();
  res.status(status).json(resultado);
}

export async function mostrarUmResponsavel(req, res) {
  const { id } = req.params;
  const [status, resultado] = await getOneResponsavel(id);
  res.status(status).json(resultado);
}

export async function atualizarResponsavel(req, res) {
  const { id } = req.params;
  const responsavel = req.body;
  const [status, resultado] = await updateResponsavel(responsavel, id);
  res.status(status).json(resultado);
}

export async function excluirResponsavel(req, res) {
  const { id } = req.params;
  const [status, resultado] = await deleteResponsavel(id);
  res.status(status).json(resultado);
}
