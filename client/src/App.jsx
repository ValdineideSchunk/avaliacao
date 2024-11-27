import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListaResponsaveis from './componentes/ListaResponsaveis';
import CadastroResponsaveis from './componentes/CadastroResponsaveis';
import CadastroDependente from './componentes/CadastroDependente';
import ListaDependentes from './componentes/ListaDependentes';

function App() {
    return (
        <Router>
            <Routes>
                {/* Rota para cadastro de dependente */}
                <Route path="/cadastro_dependente" element={<CadastroDependente />} />

                {/* Rota para listar dependentes */}
                <Route path="/lista_dependentes" element={<ListaDependentes />} />

                {/* Rota para listagem de responsáveis */}
                <Route path="/lista_responsaveis" element={<ListaResponsaveis />} />

                {/* Rota para cadastro de responsáveis e edição ao passar o ID */}
                <Route path="/cadastro_responsaveis/:id?" element={<CadastroResponsaveis />} />
            </Routes>
        </Router>
    );
}

export default App;
