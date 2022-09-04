import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from '../pages/Login';
import Menu from '../pages/Menu';
import Consulta from '../pages/Consulta';
import Eliminar from '../pages/Eliminar';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route exact path="/menu" component={Menu}/>
        <Route exact path="/consulta" component={Consulta}/>
        <Route exact path="/eliminar" component={Eliminar}/>
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
