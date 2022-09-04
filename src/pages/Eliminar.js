import React, { Component } from 'react';
import '../css/Consulta.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Cookies from 'universal-cookie';

const baseUrl="http://localhost:3002/documentos";
const cookies = new Cookies();

class Eliminar extends Component {
    state={
        form:{
            tipodoc: '',
            fechainicial: '',
            fechafinal: ''
        }
    }

    handleChange=async e=>{
        this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
    }

    eliminarDoc=async()=>{
        await axios.get(baseUrl, {params: {tipodoc: this.state.form.tipodoc, fechainicial: this.state.form.fechainicial, fechafinal: this.state.form.fechafinal}})
        .then(response=>{
            return response.data;
        })
        .then(response=>{
            if(response.length>0){
                let respuesta=response[0];
                cookies.set('tipodoc', respuesta.tipodoc, {path: "/"});
                cookies.set('fechainicial', respuesta.sucursal, {path: "/"});
                cookies.set('fechafinal', respuesta.correlativo, {path: "/"});
                alert(`Encontrado ${respuesta.tipodoc} ${respuesta.sucursal} ${respuesta.correlativo}`);
                window.location.href="./menu";
            }else{
                alert('Documento NO Encontrado');
            }
        })
        .catch(error=>{
            console.log(error);
        })

    }

    componentDidMount() {
        if(cookies.get('tipodoc')){
            window.location.href="./menu";
        }
    }
    

    render() {
        return (
    <div className="containerPrincipal">
        ELIMINA DOCUMENTOS
        <div className="containerSecundario">
          <div className="form-group">
            <label>Tipo Documento: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="tipodoc"
              onChange={this.handleChange}
            />
            <br />
            <label>FechaInicial: </label>
            <br />
            <input
              type="fechainicial"
              className="form-control"
              name="fechainicial"
              onChange={this.handleChange}
            />
            <br />
            <label>FechaFinal: </label>
            <br />
            <input
              type="fechafinal"
              className="form-control"
              name="fechafinal"
              onChange={this.handleChange}
            />
            <br />
            <button className="btn btn-primary" onClick={()=> this.eliminarDoc()}>Eliminar Docto</button>
          </div>
        </div>
      </div>
        );
    }
}

export default Eliminar;