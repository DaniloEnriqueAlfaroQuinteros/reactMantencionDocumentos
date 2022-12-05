import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Logo from '../../src/static/Logo.jpg';
import AccountMenu from '../components/AccountMenu.js';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import InputIcon from '@mui/icons-material/Input';
import env from "react-dotenv";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    Grid,
    TextField,
    DialogContentText,
  } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";

const baseUrl=env.URL_DOCUMENTS_GET;
const baseUrl_post=env.URL_DOCUMENTS_POST;
var rows = new Array();

const documentBoF = [
  {
    value: 'BLT',
    label: 'BLT',
  },
  {
    value: 'FME',
    label: 'FAC',
  },
];
var objEnvia = new Object();


const Consulta = () => {

  const [dialogDocumentFound,setDialogDocumentFound] = React.useState(false);
  const [listaDoc,setListaDoc] = React.useState([]);
  const [listaEleCol,setListaEleCol] = React.useState(0);
  const [dialogDocumentNotFound,setDialogDocumentNotFound] = React.useState(false);
  const [dialogDocumentSend,setDialogDocumentSend] = React.useState(false);
  const [dialogDocumentNotSend,setDialogDocumentNotSend] = React.useState(false);
  const [consultaForm, setConsultaForm] = React.useState({
    tipoDoc: "",
    sucursal: "",
    correlativo: "",
  });


  const [responseData, setResponseData] = React.useState([]);

  const handleChange = async (e) =>{
      setConsultaForm({
           
                ...consultaForm,
                [e.target.name]: e.target.value
     
        });
  }
  const [documentTypeState, setDocumentTypeState] = React.useState('BLT');

  const handleChangeDocumentType = (event) => {
    setDocumentTypeState(event.target.value);
  };

    const consultaDoc=async()=>{
      try{
        const URL=baseUrl+"/"+consultaForm.correlativo;
        /*const headers = { "Content-Type": "application/json", 
                          "Access-Control-Allow-Origin": "*" };*/
        await axios.get(URL)
        .catch(error=>{ 
          setDialogDocumentNotFound(true);
        })
        .then(response=>{
          if (typeof response === 'undefined') {
            setDialogDocumentNotFound(true);

          }else{
            console.log(response.data);
            setResponseData(response.data);
            setDialogDocumentFound(true);
            rows =[...rows,{ id: listaEleCol, tipodoc: response.data.tipodoc, sucursal: response.data.sucursal, correlativo: response.data.correlativo, mail: response.data.mail, fecha: response.data.fecha, estado: response.data.estado }];
            setListaDoc(rows); 
            setListaEleCol(listaEleCol+1);
            console.log(rows);
            return response.data;
          }
        });
      }
      catch(e){
        
        setDialogDocumentNotFound(true);
        console.log(e);
      }
    }

    const enviaDoc=async()=>{
      const requestBody = asignaRequestBody(objEnvia);
      try{
        console.log("Objeto a enviar");
        //console.log(requestBody);
        //const req = JSON.stringify(Object.assign({}, objEnvia));
        console.log(requestBody);
        await axios.post(baseUrl_post,requestBody)
        .catch(error=>{
          setDialogDocumentNotSend(true);
        })
        .then(response=>{
          console.log(response.status);
          if (typeof response.status === '500'){
            console.log("status 500 recibido, error del lado del servidor");
            setDialogDocumentNotSend(true);
          }else{
            console.log(response.status);
            setDialogDocumentSend(true);
            return response.data;
          }
        });
      }
      catch(e){
        setDialogDocumentNotSend(true);
        console.log(e);
      }
    }

    const volver = () => {
      window.location.href='./Menu';
    }

    const asignaRequestBody = (obj) => {
      const requestDocs = {
        "tipodoc": obj[0].tipodoc,
        "sucursal": obj[0].sucursal,
        "correlativo": obj[0].correlativo,
        "mail": obj[0].mail,
        "fecha": obj[0].fecha
        }
      return requestDocs;
    return requestDocs;
  }
    

    const columns = [
      { field: 'id', headerName: 'ID', width: 90, editable: false },
      { field: 'tipodoc', headerName: 'Tipo documento', width: 160, editable: false },
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
        field: 'fecha',
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
      <AuthenticatedTemplate>
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
          select
          className="form-control"
          name="tipoDoc"
          value={documentTypeState}
          onChange={handleChangeDocumentType}
       >
                  {documentBoF.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
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
              consultaDoc();

             
            }
            } style={{maxWidth: '250px', maxHeight: '55px', minWidth: '250px', minHeight: '55px'}}> Consulta  documento </Button>
      </Grid>
      <Grid item xs={2}></Grid>

    </Grid>


      </Grid>
      <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        onSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);
          const selectedRowData = rows.filter((row) =>
            selectedIDs.has(row.id));
          console.log(typeof(selectedRowData));
          console.log(selectedRowData);
          objEnvia = selectedRowData;
          console.log(JSON.stringify(objEnvia));
        }}
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
              enviaDoc()
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
            Aceptar
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


    <Dialog
        open={dialogDocumentSend}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Todo correcto!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Documento enviado exitosamente. 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogDocumentSend(false)}>
            Aceptar
          </Button>
        </DialogActions>
    </Dialog>

    <Dialog
        open={dialogDocumentNotSend}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Ups!, algo salió mal..."}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Documento no recibido, favor reintentar nuevamente. 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogDocumentNotSend(false)}>
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
    </AuthenticatedTemplate>
      </>
      );

}

export default Consulta;