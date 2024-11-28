import express from 'express';
import cors from 'cors';
import {
    cadastroUsuario,
    listarUsuarios,
    mostrarUmUsuario,
    atualizarUsuario,
    excluirUsuario,
    

} from './controllers/usuariosController.js';
import {
    cadastrarTarefaController,
    listarTarefasController,
    excluirTarefaController,
    mostrarUmaTarefaController,
    editarTarefaController
} from './controllers/tarefasController.js';

const app = express();
app.use(express.json());
app.use(cors());

// Rotas para tarefas
app.post('/tarefas', cadastrarTarefaController); // Cadastro de tarefa
app.get('/tarefas', listarTarefasController); // Listar tarefas
app.delete('/tarefas/:id', excluirTarefaController); // Excluir tarefa por ID
app.get('/tarefas/:id', mostrarUmaTarefaController);
app.put('/tarefas/:id', editarTarefaController);// editar uma tarefa

// Rotas para usuários
app.post('/usuarios', cadastroUsuario); // Cadastro de usuário
app.get('/usuarios', listarUsuarios); // Listar usuários
app.get('/usuarios/:id', mostrarUmUsuario); // Buscar um usuário por ID
app.put('/usuarios/:id', atualizarUsuario); // Atualizar usuário
app.delete('/usuarios/:id', excluirUsuario); // Deletar usuário

app.listen(5000, () => {
    console.log('Servidor rodando na porta 5000');
});
