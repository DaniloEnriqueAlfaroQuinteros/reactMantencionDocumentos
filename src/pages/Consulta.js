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

  const [consultaForm, setConsultaForm] = React.useState({
    tipoDoc: "",
    sucursal: "",
    correlativo: "",
  });
  const [responseData, setResponseData] = React.useState(DataObject);
  const documentData = {
    tipodoc: "",
    sucursal: "",
    correlativo: "",
    mail: "",
    fechaRegistro: "",
    estado: ""

  }
  const handleChange = async (e) =>{
      setConsultaForm({
           
                ...consultaForm,
                [e.target.name]: e.target.value
     
        });
  }

    const consultaDoc=async()=>{
        await axios.get(baseUrl, {params: {tipodoc: consultaForm.tipoDoc, sucursal: consultaForm.sucursal, correlativo: consultaForm.correlativo}})
        .then(response=>{
            setResponseData(response.data);


            
            return response.data;
        })
        .then(response=>{
            if(response.length>0){
                let respuesta=response[0];
                cookies.set('tipodoc', respuesta.tipodoc, {path: "/"});
                cookies.set('sucursal', respuesta.sucursal, {path: "/"});
                cookies.set('correlativo', respuesta.correlativo, {path: "/"});
                documentData.tipodoc = responseData[0].correlativo;
                documentData.sucursal =  responseData[0].correlativo;
                documentData.correlativo= responseData[0].correlativo;
                documentData.mail= responseData[0].correlativo;
                documentData.fechaRegistro= responseData[0].correlativo;
                documentData.estado= responseData[0].correlativo
            }else{
                alert('Documento NO Encontrado');
            }
        })
        .catch(error=>{
            console.log(error);
        })

    }
    const volver = () => {
      window.location.href='./Menu';
    }
    const enviar = () => {
      window.location.href='./Menu';
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
              volver()
            }
            } style={{maxWidth: '250px', maxHeight: '40px', minWidth: '250px', minHeight: '40px'}}> volver </Button>
          </Grid>

          
     
      </Grid>
      <Grid item xs={5}>

      </Grid>
      <Grid container textAlign="Center" rowSpacing={1} xs={12}>
          <Grid item xs={3}>

          </Grid>
          <Grid item xs={1}>
            <Typography > Tipo Documento</Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography> Sucursal</Typography>
          </Grid>
          <Grid item xs={1}>
          <Typography> Correlativo</Typography>
          </Grid>
          <Grid item xs={1}>
          <Typography> Mail</Typography>
          </Grid>
          <Grid item xs={1}>
          <Typography> Fecha de registro</Typography>
          </Grid>
          <Grid item xs={1}>
          <Typography> Estado</Typography>
          </Grid>
          <Grid item xs={3}>

          </Grid>

          <Grid item xs={3}>

          </Grid>
          <Grid item xs={1}>
          <Typography> {documentData.tipodoc}</Typography>
          </Grid>
          <Grid item xs={1}>
          <Typography> {documentData.sucursal}</Typography>
          </Grid>
          <Grid item xs={1}>
          <Typography>{documentData.correlativo}</Typography>
          </Grid>
          <Grid item xs={1}>
          <Typography>{documentData.mail}</Typography>
          </Grid>
          <Grid item xs={1}>
          <Typography>{documentData.fechaRegistro}</Typography>
          </Grid>
          <Grid item xs={1}>
          <Typography>{documentData.estado}</Typography>
          </Grid>
          <Grid item xs={3}>

          </Grid>
      </Grid>


      <Grid item xs={12}>

      </Grid>
      <Grid item xs={4}>

      </Grid>
      <Grid item xs={4}>
      <Button variant="contained"  onClick={()=>
            { 
              enviar()
            }
            } style={{maxWidth: '250px', maxHeight: '40px', minWidth: '250px', minHeight: '40px'}}> enviar </Button>
      </Grid>
      <Grid item xs={4}>

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
      </>
      );

}

export default Consulta;