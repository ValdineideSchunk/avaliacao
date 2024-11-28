import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './componentes/NavBar'; 
import ListaUsuarios from './componentes/ListaUsuarios';
import CadastroUsuarios from './componentes/CadastroUsuario';
import ListaTarefas from './componentes/ListaTarefas';
import CadastroTarefa from './componentes/CadastroTarefas';

function App() {
    return (
        <Router>
            <NavBar /> {/* Adiciona a barra de navegação */}
            <div className="container mt-4">
                <Routes>
                    {/* Rota para cadastro de tarefas */}
                    <Route path="/cadastro_tarefas" element={<CadastroTarefa />} />

                    {/* Rota para editar tarefa ao passar o ID */}
                    <Route path="/editar_tarefa/:id" element={<CadastroTarefa />} />

                    {/* Rota para listar tarefas */}
                    <Route path="/lista_tarefas" element={<ListaTarefas />} /> 

                    {/* Rota para listagem de usuários */}
                    <Route path="/lista_usuarios" element={<ListaUsuarios />} />

                    {/* Rota para cadastro de usuários e edição ao passar o ID */}
                    <Route path="/cadastro_usuarios/:id?" element={<CadastroUsuarios />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
