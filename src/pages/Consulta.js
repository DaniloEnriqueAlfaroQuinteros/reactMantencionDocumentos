import React, { Component } from 'react';
import '../css/Consulta.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Logo from '../../src/static/Logo.jpg';
import AccountMenu from '../components/AccountMenu.js';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    Grid,
    TextField,
    Typography,
    DialogContentText,
  } from '@mui/material';
import { DataObject } from '@mui/icons-material';

const baseUrl="http://localhost:3002/documentos";
const cookies = new Cookies();

const Consulta = () => {

  const [dialogDocumentFound,setDialogDocumentFound] = React.useState(false);
  const [listaDoc,setListaDoc] = React.useState([]);
  const [listaNumCol,setListaNumCol] = React.useState(0);
  const [listaEleCol,setListaEleCol] = React.useState(1);
  const [dialogDocumentNotFound,setDialogDocumentNotFound] = React.useState(false);
  const [consultaForm, setConsultaForm] = React.useState({
    tipoDoc: "",
    sucursal: "",
    correlativo: "",
  });

  const documentData = {
    tipodoc: "0",
    sucursal: "0",
    correlativo: "0",
    mail: "0",
    fechaRegistro: "0",
    estado: "0"

  }

  const [responseData, setResponseData] = React.useState(documentData);

  const handleChange = async (e) =>{
      setConsultaForm({
           
                ...consultaForm,
                [e.target.name]: e.target.value
     
        });
  }

    const consultaDoc=async()=>{
      try{
        await axios.get(baseUrl, {params: {tipodoc: consultaForm.tipoDoc, sucursal: consultaForm.sucursal, correlativo: consultaForm.correlativo}})
        .catch(error=>{
          setDialogDocumentNotFound(true);
        })
        .then(response=>{
          if (typeof response.data[0] === 'undefined') {
            setDialogDocumentNotFound(true);

          }else{
            setResponseData(response.data[0]);
            console.log(response.status);
            console.log(response.data[0]);
            setDialogDocumentFound(true);
            return response.data;
          }
        });
      }
      catch(e){
        setDialogDocumentNotFound(true);
        console.log(e);
      }



    }
    const volver = () => {
      window.location.href='./Menu';
    }
    const enviar = () => {
      window.location.href='./Menu';
    }
    
    const addNumbers = () =>{
      listaDoc[listaNumCol] = listaEleCol;
      console.log(listaDoc[listaNumCol]);
      setListaDoc(listaDoc);
      setListaNumCol(listaNumCol+1);
      setListaEleCol(listaEleCol+1);
    }
   
        return (
      <>
      <Grid
      container
      style={{ background: "linear-gradient(#FFFFFF 30%, #003CFF)" }}
      textAlign="center"
      rowSpacing={5}
      gap={1}
      id="PageGrid"
    >

      <Grid item xs={1}>

      </Grid>
      <Grid item xs={2} textAlign="left" >
      <img
          src={Logo}
          width={50} height={50}
          style={{borderRadius: '50%'}}
          />
      </Grid>
      <Grid item xs={6}>
      
      </Grid>
      <Grid item xs={2} textAlign="right">
      <AccountMenu/>
      </Grid>
      <Grid item xs={1}>
      
      </Grid>
      <Grid item xs={12}>

      </Grid>

      <Grid item xs={5}>

      </Grid>
      <Grid container textAlign="Center" rowSpacing={1} xs={2}>



          <Grid item xs={12}>
          <TextField id="outlined-basic" label="Tipo documento" variant="outlined"
          type="text"
          className="form-control"
          name="tipoDoc"
          value={consultaForm.tipoDoc}
          onChange={handleChange}
          />
          </Grid>

          <Grid item xs={12}>
          <TextField id="outlined-basic" label="Sucursal" variant="outlined"
          type="text"
          className="form-control"
          name="sucursal"
          value={consultaForm.sucursal}
          onChange={handleChange}
          />
          </Grid>

          <Grid item xs={12}>
          <TextField id="outlined-basic" label="Correlativo" variant="outlined"
          type="text"
          className="form-control"
          name="correlativo"
          value={consultaForm.correlativo}
          onChange={handleChange}
          />
          </Grid>
         
          <Grid item xs={12}>
          <Button variant="contained"  onClick={()=>
            { 
              consultaDoc()
            }
            } style={{maxWidth: '250px', maxHeight: '40px', minWidth: '250px', minHeight: '40px'}}> Consulta  documento </Button>
          </Grid>
          <Grid item xs={12}>
          <Button variant="contained"  onClick={()=>
            { 
              addNumbers();
            }
            } style={{maxWidth: '250px', maxHeight: '40px', minWidth: '250px', minHeight: '40px'}}> volver </Button>
          </Grid>

          
     
      </Grid>
      <Grid item xs={5}>

      </Grid>



      <Grid item xs={12}>
      <ul>{
      listaDoc.map((listaDoc) =>
        <li>{listaDoc}</li>
      )}</ul>
      </Grid>

      <Grid item xs={12}>

      </Grid>
      <Grid item xs={12}>

      </Grid>
      <Grid item xs={12}>

      </Grid>
      <Grid item xs={12}>

      </Grid>
      <Grid item xs={12}>

      </Grid>
      <Grid item xs={12}>

      </Grid>

      </Grid>


      <Dialog
        open={dialogDocumentFound}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Documento encontrado!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Tipo de Documento: {responseData.tipodoc} - Sucursal: {responseData.sucursal} - Correlativo: {responseData.correlativo} - Email: {responseData.mail} - Fecha de registro: {responseData.fechaRegistro} - Estado: {responseData.estado}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogDocumentFound(false)}>
            Enviar
          </Button>
        </DialogActions>
    </Dialog>

    <Dialog
        open={dialogDocumentNotFound}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Ups!, algo salió mal..."}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Documento no encontrado, favor reintentar con documento valido. 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogDocumentNotFound(false)}>
            Aceptar
          </Button>
        </DialogActions>
    </Dialog>

      
      </>
      );

}

export default Consulta;