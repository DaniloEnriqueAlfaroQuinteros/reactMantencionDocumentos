import React, { Component } from 'react';
import '../css/Consulta.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Logo from '../../src/static/Logo.jpg';
import AccountMenu from '../components/AccountMenu.js';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
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
    const [dialogUserCreated,setDialogUserCreated] = React.useState(false);
    const [dialogUserExist,setDialogUserExist] = React.useState(false);
    const [creaForm, setCreaForm] = React.useState({
        codigoUsuario: "",
        nombreUsuario: "",
        passFirst: "",
        passSecond: "",
      });
    const [values, setValues] = React.useState({
        showPassword: false,
    });
    const handleClickShowPassword = () => {
      setValues({
        ...values,
        showPassword: !values.showPassword,
      });
    };
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const documentData = {
      message: "",
      description: ""
    
    }  
    const [responseData, setResponseData] = React.useState(documentData);

    const handleChange = async (e) =>{
        setCreaForm({
            
                ...creaForm,
                [e.target.name]: e.target.value
            
        });
    }

    const creaUsuario = async()=>{
        await axios.get(baseUrl, {params: {
          nombreUsuario: creaForm.nombreUsuario, 
          codigoUsuario: creaForm.codigoUsuario,
          password: creaForm.passFirst 
                                        }})
        .catch(error=>{
          setDialogValidation(true);
      })
        .then(response=>{

          if (typeof response.status ==! 409) {
            setDialogUserExist(true);

          }

          if (typeof response.status ==! 200) {
            setDialogValidation(true);

          }else{
            setResponseData(response.data[0]);
            console.log(response.status);
            console.log(response.data[0]);
            setDialogUserCreated(true);
            return response.data;
          }
        })


    }
    const volver = () => {
      window.location.href='./Menu';
    }
    
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
            <Grid item xs={12}>

            </Grid>
            <Grid item xs={12}>

            </Grid>
            <Grid item xs={5}>

            </Grid>
            <Grid container textAlign="Center" rowSpacing={1} xs={2}>



                <Grid item xs={12}>
                <TextField id="outlined-basic" label="Código Usuario" variant="outlined"
                type="text"
                className="form-control"
                name="codigoUsuario"
                value={creaForm.codigoUsuario}
                onChange={handleChange}
                />
                </Grid>

                <Grid item xs={12}>
                <TextField id="outlined-basic" label="Nombre Usuario" variant="outlined"
                type="text"
                className="form-control"
                name="nombreUsuario"
                value={creaForm.nombreUsuario}
                onChange={handleChange}
                />
                </Grid>

                <Grid item xs={12}>
                <TextField id="outlined-basic" label="Password" variant="outlined"
                type={values.showPassword ? 'text' : 'password'}
                className="form-control"
                name="passFirst"
                value={creaForm.passFirst}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                  </InputAdornment>
                }
                
                />
                </Grid>
                <Grid item xs={12}>
                <TextField id="outlined-basic" label="Repita password" variant="outlined"
                type={values.showPassword ? 'text' : 'password'}
                className="form-control"
                name="passSecond"
                value={creaForm.passSecond}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                  </InputAdornment>
                }
                
                />
                </Grid>
                <Grid item xs={12}>
                <Button variant="contained"  onClick={()=> 
                {
                    
                    creaUsuario();
                    
                }} style={{maxWidth: '250px', maxHeight: '40px', minWidth: '250px', minHeight: '40px'}}> Crear usuario </Button>
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
        open={dialogUserExist}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Error al crear usuario"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Codigo de usuario ya existe, presione boton aceptar para confirmar.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => 
            {
            setDialogUserExist(false);
            window.location.href="./menu";
            }
            }>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={dialogUserCreated}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Usuario creado"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Presione boton aceptar para confirmar.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => 
            {
            setDialogUserCreated(false);
            window.location.href="./menu";
            }
            }>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>


      </Box>
            </>

        );
    
}

export default Eliminar;