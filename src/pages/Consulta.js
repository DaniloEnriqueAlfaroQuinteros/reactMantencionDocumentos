import React, { Component } from 'react';
import '../css/Consulta.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Cookies from 'universal-cookie';

const baseUrl="http://localhost:3002/documentos";
const cookies = new Cookies();

class Consulta extends Component {
    state={
        data:[],
        form:{
            tipodoc: '',
            sucursal: '',
            correlativo: ''
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

    consultaDoc=async()=>{
        await axios.get(baseUrl, {params: {tipodoc: this.state.form.tipodoc, sucursal: this.state.form.sucursal, correlativo: this.state.form.correlativo}})
        .then(response=>{
            this.setState({data: response.data});
            return response.data;
        })
        .then(response=>{
            if(response.length>0){
                let respuesta=response[0];
                cookies.set('tipodoc', respuesta.tipodoc, {path: "/"});
                cookies.set('sucursal', respuesta.sucursal, {path: "/"});
                cookies.set('correlativo', respuesta.correlativo, {path: "/"});
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
    volver() {
      window.location.href='./';
    }
    

    render() {
        return (
          <React.Fragment>
            
    <div className="containerPrincipal">
    
        CONSULTA DOCUMENTOS
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
            <label>Sucursal: </label>
            
            <input 
              type="sucursal"
              className="form-control"
              name="sucursal"
              onChange={this.handleChange}
            />
            <label>Correlativo: </label>
            <input width="5px" height="10px"
              type="correlativo"
              className="form-control"
              name="correlativo"
              onChange={this.handleChange}
            />
            <br />
            <button className="btn btn-primary" onClick={()=> this.consultaDoc()}>Consulta Documento</button>
            <br /><br />
            <button className="btn btn-primary" onClick={()=> this.volver()}>Volver</button>
         
          </div>
          </div>
      </div>

<div className="containerPrincipalTable">
        DETALLE DOCUMENTOS
        <div className="containerSecundarioTable">
          <div className="form-group">
    <table className="table ">
      <thead>
        <tr>
          <th>TipoDoc</th>
          <th>Sucursal</th>
          <th>Correlativo</th>
          <th>Mail</th>
          <th>Fecha</th>
          <th>Estado</th>
        </tr>        
      </thead>
     
      <tbody>
        {this.state.data.map(empresa=>{
          return(
            <React.Fragment>
          <tr>
          <td>{empresa.tipodoc}</td>
          <td>{empresa.sucursal}</td>
          <td>{empresa.correlativo}</td>
          <td>{empresa.mail}</td>
          <td>{empresa.fechaRegistro}</td>
          <td>{empresa.estado}</td>
          </tr>
         <br />
         <button className="btn btn-primary" onClick={()=> this.enviar()}>Enviar Docto</button>
         </React.Fragment>
          )
        })}
      </tbody>
    </table>


          </div>
        </div>
      </div>
      


      </React.Fragment>
      );
    }
}

export default Consulta;