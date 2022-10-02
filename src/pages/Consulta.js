import React, { Component } from 'react';
import '../css/Consulta.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Logo from '../../src/static/Logo.jpg';
import AccountMenu from '../components/AccountMenu.js';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import InputIcon from '@mui/icons-material/Input';
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
  var rows = [];
  const [dialogDocumentFound,setDialogDocumentFound] = React.useState(false);
  const [listaDoc,setListaDoc] = React.useState(rows);
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
            rows.push({ id: listaEleCol, tipoDocumento: responseData.tipodoc, sucursal: responseData.sucursal, correlativo: responseData.correlativo, mail: responseData.mail, fechaRegistro: responseData.fechaRegistro, estado: responseData.estado });
            setListaDoc(rows);
            console.log(rows.length);
            //console.log(listaDoc);
            setListaEleCol(listaEleCol+1);
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
    

    const columns = [
      { field: 'id', headerName: 'ID', width: 90, editable: false },
      { field: 'tipoDocumento', headerName: 'Tipo documento', width: 160, editable: false },
      {
        field: 'sucursal',
        headerName: 'Sucursal',
        description: 'Sucursar donde se emitió documento.',
        width: 150,
        editable: false
      },
      {
        field: 'correlativo',
        headerName: 'Correlativo',
        description: 'Correlativo de documento.',
        width: 150,
        editable: false
      },
      {
        field: 'mail',
        headerName: 'Mail',
        description: 'mail asociado a documento.',
        width: 110,
        editable: false
      },
      {
        field: 'fechaRegistro',
        headerName: 'Fecha de registro',
        description: 'Fecha de registro de documento.',
        sortable: false,
        width: 160
      },
      {
        field: 'estado',
        headerName: 'Estado',
        description: 'Estado de documento',
        sortable: false,
        width: 160
      }

    ]
    ;

        return (
      <>
      <Box style={{ background: "linear-gradient(#FFFFFF 10%, #2596be)", height: '100%', width: '100%'}}>
      <Grid
      container
      textAlign="center"
      rowSpacing={2}
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
      <Button variant="contained"  endIcon={<ArrowBackIcon />} onClick={()=>
            { 
              volver();
            }
            } style={{maxWidth: '150px', maxHeight: '40px', minWidth: '150px', minHeight: '40px'}}> volver </Button>
      </Grid>
      <Grid item xs={2} textAlign="right">
      <AccountMenu/>
      </Grid>
      <Grid item xs={1}>
      
      </Grid>
    <Grid
      container
      textAlign="center"
      rowSpacing={2}
      gap={1}
      id="QueryGrid"
    >
      <Grid item xs={2}></Grid>
      <Grid item xs={2}>
      <TextField id="outlined-basic" label="Tipo documento" variant="outlined"
          type="text"
          className="form-control"
          name="tipoDoc"
          value={consultaForm.tipoDoc}
          onChange={handleChange}
          />
      </Grid>
      <Grid item xs={2}>
      <TextField id="outlined-basic" label="Sucursal" variant="outlined"
          type="text"
          className="form-control"
          name="sucursal"
          value={consultaForm.sucursal}
          onChange={handleChange}
          />
      </Grid>
      <Grid item xs={2}>
      <TextField  id="outlined-basic" label="Correlativo" variant="outlined"
          type="text"
          className="form-control"
          name="correlativo"
          value={consultaForm.correlativo}
          onChange={handleChange}
          />
      </Grid>
      <Grid item xs={2}>
      <Button variant="contained"  endIcon={<FindInPageIcon />} onClick={()=>
            { 
              consultaDoc()
             
            }
            } style={{maxWidth: '250px', maxHeight: '55px', minWidth: '250px', minHeight: '55px'}}> Consulta  documento </Button>
      </Grid>
      <Grid item xs={2}></Grid>

    </Grid>


      </Grid>
      <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={listaDoc}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
        style={{ background: "#FFFFFF" }}
      />
    </Box>
    <Grid
      container
      textAlign="center"
      rowSpacing={2}
      gap={1}
      id="Grid"
    >
      <Grid item xs={12}>
      <Button variant="contained"  endIcon={<InputIcon />} onClick={()=>
            { 
              consultaDoc()
            }
            } style={{maxWidth: '250px', maxHeight: '55px', minWidth: '250px', minHeight: '55px'}}> Envia  documento </Button>
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
          Documento número {responseData.correlativo} encontrado en sucursal {responseData.sucursal}, presione aceptar para agregar a grilla
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
    <Grid item xs={12} direction="column"></Grid>
    <Grid item xs={12} direction="column"></Grid>
    <Grid item xs={12} direction="column"></Grid>
    <Grid item xs={12} direction="column"></Grid>
    <Grid item xs={12} direction="column"></Grid>
    <Grid item xs={12} direction="column"></Grid>
    <Grid item xs={12} direction="column"></Grid>
    <Grid item xs={12} direction="column"></Grid>
    <Grid item xs={12} direction="column"></Grid>
    <Grid item xs={12} direction="column"></Grid>
    <Grid item xs={12} direction="column"></Grid>
    <Grid item xs={12} direction="column"></Grid>
    <Grid item xs={12} direction="column"></Grid>

    </Grid>
    </Box>  
      </>
      );

}

export default Consulta;