import express from 'express';
import cors from 'cors';
import {
    cadastroResponsavel,
    listarResponsaveis,
    mostrarUmResponsavel,
    atualizarResponsavel,
    excluirResponsavel
} from './controllers/responsaveisController.js';

const app = express();
app.use(express.json());
app.use(cors());

// Rotas para responsáveis
app.post('/responsaveis', cadastroResponsavel);
app.get('/responsaveis', listarResponsaveis);
app.get('/responsaveis/:id', mostrarUmResponsavel);
app.put('/responsaveis/:id', atualizarResponsavel);
app.delete('/responsaveis/:id', excluirResponsavel);

app.listen(5000, () => {
    console.log('Servidor rodando na porta 5000');
});
