import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import '../css/Menu.css';
import Logo from '../../src/static/Logo.jpg';
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
  import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';

const cookies = new Cookies();

const Menu = () => {

    const cerrarSesion = () =>{
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
    const eliminarDoc=()=>{
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


    const componentDidMount = () => {
        if(!cookies.get('username')){
            window.location.href="./";
        }
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
             <Grid item xs={12}>

            </Grid>
            <Grid item xs={1}>

            </Grid>
            <Grid item xs={6} textAlign="left" >
            <img
                src={Logo}
                width={50} height={50}
                style={{borderRadius: '50%'}}
                />
            </Grid>
            <Grid item xs={5}>
            
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
                <Button variant="contained"  onClick={()=> 
                {
                    
                    eliminarDoc();
                    
                }} style={{maxWidth: '250px', maxHeight: '40px', minWidth: '250px', minHeight: '40px'}}> Elimina  documentos </Button>
                </Grid>

                <Grid item xs={12}>
            
                </Grid>
               
                <Grid item xs={12}>
                <Button variant="contained"  onClick={()=> 
                {
                    
                    cerrarSesion();
                    
                }} style={{maxWidth: '250px', maxHeight: '40px', minWidth: '250px', minHeight: '40px'}}>  Cerrar  sesion  </Button>
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
            </>
        );
    
}

export default Menu;