import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from '../pages/Login';
import Menu from '../pages/Menu';
import Consulta from '../pages/Consulta';
import MantencionUsuarios from '../pages/MantencionUsuarios';

function Paths() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login/>}/>
        <Route exact path="/menu" element={<Menu/>}/>
        <Route exact path="/consulta" element={<Consulta/>}/>
        <Route exact path="/mantencionUsuarios" element={<MantencionUsuarios/>}/>
      </Routes>
    </Router>
  );
}

export default Paths;
