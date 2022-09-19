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

const baseUrl="http://localhost:3002/documentos";
const cookies = new Cookies();

const Eliminar = () => {

    const [dialogValidation,setDialogValidation] = React.useState(false);
    const [dialogDeleteConfirmation,setDialogDeleteConfirmation] = React.useState(false);
    const [eliminaForm, setEliminaForm] = React.useState({
        tipoDoc: "",
        fechaIni: "",
        fechaFin: "",
      });

    const documentData = {
      tipodoc: "",
      sucursal: "",
      correlativo: "",
      mail: "",
      fechaRegistro: "",
      estado: ""
    
    }  
    const [responseData, setResponseData] = React.useState(documentData);

    const handleChange = async (e) =>{
        setEliminaForm({
            
                ...eliminaForm,
                [e.target.name]: e.target.value
            
        });
    }

    const eliminarDoc = async()=>{
        await axios.get(baseUrl, {params: {tipodoc: eliminaForm.tipoDoc, fechaRegistro: eliminaForm.fechaIni}})
        .catch(error=>{
          setDialogValidation(true);
      })
        .then(response=>{
          if (typeof response.data[0] === 'undefined') {
            setDialogValidation(true);

          }else{
            setResponseData(response.data[0]);
            console.log(response.status);
            console.log(response.data[0]);
            setDialogDeleteConfirmation(true);
            return response.data;
          }
        })


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
                value={eliminaForm.tipoDoc}
                onChange={handleChange}
                />
                </Grid>

                <Grid item xs={12}>
                <TextField id="outlined-basic" label="Fecha inicial" variant="outlined"
                type="text"
                className="form-control"
                name="fechaIni"
                value={eliminaForm.fechaIni}
                onChange={handleChange}
                />
                </Grid>

                <Grid item xs={12}>
                <TextField id="outlined-basic" label="Fecha final" variant="outlined"
                type="text"
                className="form-control"
                name="fechaFin"
                value={eliminaForm.fechaFin}
                onChange={handleChange}
                />
                </Grid>
               
                <Grid item xs={12}>
                <Button variant="contained"  onClick={()=> 
                {
                    
                    eliminarDoc();
                    
                }} style={{maxWidth: '250px', maxHeight: '40px', minWidth: '250px', minHeight: '40px'}}> Elimina  documentos </Button>
                </Grid>
                <Grid item xs={12}>
                
                </Grid>
                
           
            </Grid>
            <Grid item xs={5}>

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
            <Grid item xs={12}>

            </Grid>
            <Grid item xs={12}>

            </Grid>
            <Grid item xs={12}>

            </Grid>

            </Grid>

    <Dialog
        open={dialogValidation}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Ups!, algo salió mal..."}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Al parecer los datos suministrados no coinciden, favor intentar nuevamente.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogValidation(false)}>
            Aceptar
          </Button>
        </DialogActions>
    </Dialog>


    <Dialog
        open={dialogDeleteConfirmation}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Documento encontrado"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Presione boton aceptar para confirmar.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => 
            {
            setDialogDeleteConfirmation(false);
            window.location.href="./menu";
            }
            }>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
            </>

        );
    
}

export default Eliminar;