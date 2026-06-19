import { BrowserRouter, Routes, Route } from 'react-router';
import Home from './pages/Home';
import About from './pages/About';
import Navbar from './components/Navbar';
import PokemonDetail from './pages/PokemonDetail';

export default function App() {
    return (<BrowserRouter>
        <Navbar />
        <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<About />} path="/about" />
            <Route element={<PokemonDetail />} path="/pokemon/:name" />
        </Routes>
    </BrowserRouter>
    );
}