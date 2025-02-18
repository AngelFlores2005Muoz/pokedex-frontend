import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PokemonsList from './components/PokemonsList';
import PokemonDetail from './components/PokemonDetail';

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<PokemonsList />} />
                    <Route path="/pokemon/:name" element={<PokemonDetail />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
