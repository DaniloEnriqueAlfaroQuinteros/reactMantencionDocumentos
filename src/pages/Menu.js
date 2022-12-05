import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import Logo from '../../src/static/Logo.jpg';
import Box from '@mui/material/Box';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    Grid,
    DialogContentText,
  } from '@mui/material';
import AccountMenu from '../components/AccountMenu.js';
import { callMsGraph } from "../graph";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";

const cookies = new Cookies();


const Menu = () => {

    const [superUser,setSuperUser] = React.useState(false);

    const consultaDoc=()=>{
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
    const mantencionUsuarios=()=>{
        cookies.remove('id', {path: "/"});
        cookies.remove('apellido_paterno', {path: "/"});
        cookies.remove('apellido_materno', {path: "/"});
        cookies.remove('nombre', {path: "/"});
        cookies.remove('username', {path: "/"});
        cookies.remove('tipodoc', {path: "/"});
        cookies.remove('fechainical', {path: "/"});
        cookies.remove('fechafinal', {path: "/"});
        window.location.href='./mantencionUsuarios';
    }
    React.useEffect (() => {
    
     if(cookies.get('userType')==="1"){
        setSuperUser(false);
        console.log("Super user");
     }else{
        setSuperUser(true);
        console.log("Not Super user");
     }
     }, []);

     const { instance, accounts } = useMsal();
     const [graphData, setGraphData] = React.useState(null);
     const [dialog, setDialog] = React.useState(true);
  
     const name = accounts[0] && accounts[0].name;
   
     function RequestProfileData() {
         const request = {
             ...loginRequest,
             account: accounts[0]
         };
   
         // Silently acquires an access token which is then attached to a request for Microsoft Graph data
         instance.acquireTokenSilent(request).then((response) => {
             callMsGraph(response.accessToken).then(response => setGraphData(response));
         }).catch((e) => {
             instance.acquireTokenPopup(request).then((response) => {
                 callMsGraph(response.accessToken).then(response => setGraphData(response));
             });
         });
         console.log(name);
     }


        return (
            
            <>
             <AuthenticatedTemplate>
            <Box style={{ background: "linear-gradient(#FFFFFF 30%, #2596be)", height: '100%', width: '100%'}}>
            <Grid
            container
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
                <Button variant="contained"  onClick={()=> 
                {
                    
                    consultaDoc();
                    
                }} style={{maxWidth: '250px', maxHeight: '40px', minWidth: '250px', minHeight: '40px'}}> Consulta documentos </Button>
                </Grid>
                <Grid item xs={12}>
            
                </Grid>
                <Grid item xs={12}>
                        
                <Button variant="contained"  disabled={superUser} onClick={()=> 
                {
                    
                    mantencionUsuarios();
                    
                }} style={{maxWidth: '250px', maxHeight: '40px', minWidth: '250px', minHeight: '40px'}}> Mantencion usuarios </Button>
                    
                </Grid>

                <Grid item xs={12}>
            
                </Grid>
               
                <Grid item xs={12}>
                
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
            <Grid item xs={12}>
                
            </Grid>

            </Grid>
            </Box>


        <Dialog
        open={dialog}
        onClose={() => setDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Bienvenido!"}
        </DialogTitle>
       
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            
          {name}, Presione aceptar para continuar. 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => 
            {
            setDialog(false);
            RequestProfileData();
            }
            }>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
      </AuthenticatedTemplate>
            </>
        );
    
}

export default Menu;