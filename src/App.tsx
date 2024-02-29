import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Home} from "./pages/Home";
import {Analysis} from "./pages/Analysis";
import {About} from "./pages/About";

const App: React.FC = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/scanner/:hash" element={<Analysis />} />
        </Routes>
    </BrowserRouter>
);

export default App;
