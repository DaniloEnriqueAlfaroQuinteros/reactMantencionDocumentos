import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import '../css/Menu.css';
const cookies = new Cookies();

class Menu extends Component {
    cerrarSesion=()=>{
        cookies.remove('id', {path: "/"});
        cookies.remove('apellido_paterno', {path: "/"});
        cookies.remove('apellido_materno', {path: "/"});
        cookies.remove('nombre', {path: "/"});
        cookies.remove('username', {path: "/"});
        cookies.remove('tipodoc', {path: "/"});
        cookies.remove('sucursal', {path: "/"});
        cookies.remove('correlativo', {path: "/"});
        cookies.remove('fechainical', {path: "/"});
        cookies.remove('fechafinal', {path: "/"});
        window.location.href='./';
    }
    consultaDoc=()=>{
        cookies.remove('id', {path: "/"});
        cookies.remove('apellido_paterno', {path: "/"});
        cookies.remove('apellido_materno', {path: "/"});
        cookies.remove('nombre', {path: "/"});
        cookies.remove('username', {path: "/"});
        cookies.remove('tipodoc', {path: "/"});
        cookies.remove('fechainical', {path: "/"});
        cookies.remove('fechafinal', {path: "/"});
        window.location.href='./consulta';
    }
    eliminarDoc=()=>{
        cookies.remove('id', {path: "/"});
        cookies.remove('apellido_paterno', {path: "/"});
        cookies.remove('apellido_materno', {path: "/"});
        cookies.remove('nombre', {path: "/"});
        cookies.remove('username', {path: "/"});
        cookies.remove('tipodoc', {path: "/"});
        cookies.remove('fechainical', {path: "/"});
        cookies.remove('fechafinal', {path: "/"});
        window.location.href='./eliminar';
    }


    componentDidMount() {
        if(!cookies.get('username')){
            window.location.href="./";
        }
    }

    render() {
        console.log('id: '+ cookies.get('id'));
        console.log('apellido_paterno: '+cookies.get('apellido_paterno'));
        console.log('apellido_materno: '+cookies.get('apellido_materno'));
        console.log('nombre: '+cookies.get('nombre'));
        console.log('username: '+cookies.get('username'));
        return (
            
            <div className="containerPrincipal">
                Menu Principal
                <div className="containerSecundario">
                <br />
                <button className="btn" onClick={()=>this.consultaDoc()}>Consulta Documento</button>
                <br />
                <button className="button" onClick={()=>this.eliminarDoc()}>Elimina Documento</button>
                <br />
                <button className="button" onClick={()=>this.cerrarSesion()}>Cerrar Sesión</button>
                </div>
            </div>
        );
    }
}

export default Menu;