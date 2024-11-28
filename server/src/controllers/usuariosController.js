import {
  createUsuario,
  readUsuarios,
  getOneUsuario,
  updateUsuario,
  deleteUsuario
} from '../models/usuariosModel.js';

export async function cadastroUsuario(req, res) {
  const usuario = req.body;
  const [status, resultado] = await createUsuario(usuario);
  res.status(status).json(resultado);
}

export async function listarUsuarios(req, res) {
  const [status, resultado] = await readUsuarios();
  res.status(status).json(resultado);
}

export async function mostrarUmUsuario(req, res) {
  const { id } = req.params;
  const [status, resultado] = await getOneUsuario(id);
  res.status(status).json(resultado);
}

export async function atualizarUsuario(req, res) {
  const { id } = req.params;
  const usuario = req.body;
  const [status, resultado] = await updateUsuario(usuario, id);
  res.status(status).json(resultado);
}

export async function excluirUsuario(req, res) {
  const { id } = req.params;
  const [status, resultado] = await deleteUsuario(id);
  res.status(status).json(resultado);
}
