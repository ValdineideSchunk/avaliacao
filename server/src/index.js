import express from 'express';
import cors from 'cors';
import {
    cadastroResponsavel,
    listarResponsaveis,
    mostrarUmResponsavel,
    atualizarResponsavel,
    excluirResponsavel
} from './controllers/responsaveisController.js';
import { cadastrarDependenteController, listarDependentesController } from './controllers/dependentesController.js';

const app = express();
app.use(express.json());
app.use(cors());

// Rota para dependente
app.post('/dependentes', cadastrarDependenteController);
// Rota para listar dependentes
app.get('/dependentes', listarDependentesController);

// Rotas para responsáveis
app.post('/usuario', cadastroResponsavel);
app.get('/usuario', listarResponsaveis);
app.get('/usuario/:id', mostrarUmResponsavel);
app.put('/usuario/:id', atualizarResponsavel);
app.delete('/usuario/:id', excluirResponsavel);

app.listen(5000, () => {
    console.log('Servidor rodando na porta 5000');
});
