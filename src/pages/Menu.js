import React from 'react';
import Cookies from 'universal-cookie';
import Logo from '../../src/static/Logo.jpg';
import Box from '@mui/material/Box';
import {

    Button,
    Grid,

  } from '@mui/material';
import AccountMenu from '../components/AccountMenu.js';

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



        return (
            <>
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
            </>
        );
    
}

export default Menu;