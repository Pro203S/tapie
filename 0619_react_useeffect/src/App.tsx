import { BrowserRouter, Routes, Route } from 'react-router';
import About from './pages/About';
import PokemonDetail from './pages/PokemonDetail';
import Layout from './components/Layout';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

export default function App() {
    return (<BrowserRouter>
        <Routes>
            <Route element={<Layout />} path="/">
                <Route element={<Home />} index />
                <Route element={<About />} path="/about" />
                <Route element={<PokemonDetail />} path="/pokemon/:name" />

                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    </BrowserRouter>
    );
}