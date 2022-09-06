import React, { Component } from 'react';
import '../css/Login.css';
import Logo from '../../src/static/Logo.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import md5 from 'md5';
import Cookies from 'universal-cookie';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    Grid,
    Theme,
    TextField,
    Typography,
    Avatar,
  } from '@mui/material';
  import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';

const baseUrl="http://localhost:3002/usuarios";
const cookies = new Cookies();

class Login extends Component {
   
    
    state={
        form:{
            username: '',
            password: ''
        }
    }

    handleChange=async e=>{
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
    }

    iniciarSesion=async()=>{
        await axios.get(baseUrl, {params: {username: this.state.form.username, password: md5(this.state.form.password)}})
        .then(response=>{
            return response.data;
        })
        .then(response=>{
            if(response.length>0){
                let respuesta=response[0];
                cookies.set('id', respuesta.id, {path: "/"});
                cookies.set('apellido_paterno', respuesta.apellido_paterno, {path: "/"});
                cookies.set('apellido_materno', respuesta.apellido_materno, {path: "/"});
                cookies.set('nombre', respuesta.nombre, {path: "/"});
                cookies.set('username', respuesta.username, {path: "/"});
                alert(`Bienvenido ${respuesta.nombre} ${respuesta.apellido_paterno}`);
                window.location.href="./menu";
            }else{
                alert('El usuario o la contraseña no son correctos');
            }
        })
        .catch(error=>{
            console.log(error);
        })

    }

    componentDidMount() {
        if(cookies.get('username')){
            window.location.href="./menu";
        }
    }
    

    render() {
        return (
            <Grid
            container
            textAlign="center"
            rowSpacing={5}
            gap={1}
            id="PageGrid"
          >
            
            <Grid item xs={12}>
            </Grid>
            <Grid item xs={12}>
                
            </Grid>
            <Grid item xs={12}>
            <img
                src={Logo}
                width={200} height={200}
                />
            </Grid>


            <Grid item xs={12}>
            </Grid>
            <Grid item xs={5}>
            
            </Grid>
            <Grid container textAlign="Center" rowSpacing={1} xs={2}>



                <Grid item xs={12}>
                <TextField id="outlined-basic" label="User" variant="outlined"
                type="text"
                className="form-control"
                name="username"
                onChange={this.handleChange}
                />
                </Grid>

                <Grid item xs={12}>
                <TextField
                id="outlined-basic" label="Password" variant="outlined"
                type="password"
                className="form-control"
                name="password"
                onChange={this.handleChange}
                />
                </Grid>
                <Grid item xs={12}>
            
                </Grid>
                <Grid item xs={12}>
            
                </Grid>
               
                <Grid item xs={12}>
                <Button variant="contained" endIcon={<PlayCircleFilledWhiteOutlinedIcon />} onClick={()=> this.iniciarSesion()}> Acceder </Button>
                </Grid>
                <Grid item xs={12}>
                <Typography variant="h8" color="secondary">
                Recupera tu contraseña aquí.
                </Typography>
                </Grid>
           
            </Grid>
            <Grid item xs={5}>
            
            </Grid>

            <Grid item xs={12}>
            
            </Grid>
            <Grid item xs={12}>
        
            </Grid>
          </Grid>

        );
    }
}

export default Login;