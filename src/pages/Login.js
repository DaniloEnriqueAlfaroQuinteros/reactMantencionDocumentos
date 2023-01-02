import React, { Component } from 'react';
import Logo from '../../src/static/Logo.jpg';
import Cookies from 'universal-cookie';
import {GridLoader} from "react-spinners";
import Box from '@mui/material/Box';
import { SignInButton } from '../components/SingInButton';
import { AuthenticatedTemplate } from "@azure/msal-react";

import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    Grid,
    Typography,
    DialogContentText,
  } from '@mui/material';

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

    constructor(props) {
        super(props);
        this.state = {
          dialogValidation: false,
          dialogInfo: false,
          isLoading: false
        };
      }

    componentDidMount() {
        if(cookies.get('username')){
            window.location.href="./menu";
        }
    }

    render() {
        return (
            <>
            <Box style={{ background: "linear-gradient(#FFFFFF 30%, #2596be)", height: '100%', width: '100%'}}>
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
            <Grid item xs={12}>
            
            </Grid>
            <Grid item xs={12}>
            <img
                src={Logo}
                alt=""
                width={200} height={200}
                style={{borderRadius: '50%'}}
                />
            </Grid>


            <Grid item xs={12}>
            
            </Grid>

            <Grid item xs={5}>
            
            </Grid>
            <Grid container textAlign="Center" rowSpacing={1} xs={2}>



                <Grid item xs={12}>
                </Grid>

                <Grid item xs={12}>
                </Grid>
                <Grid item xs={12}>
            
                </Grid>
                <Grid item xs={12}>
            
                </Grid>
               
                <Grid item xs={12}>
                <SignInButton/>
                </Grid>
                <Grid item xs={12}>
                <Typography variant="h8" color="secondary">
 
                </Typography>
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

      <Dialog
        open={this.state.dialogValidation}
        onClose={() => this.setState({ dialogValidation: false})}
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
          <Button onClick={() => this.setState({ dialogValidation: false})}>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>


      <AuthenticatedTemplate>
                  
                  
      <Dialog
        open={true}
        onClose={() => this.setState({ dialogInfo: false})}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Bienvenido!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            
            Usuario logeado correctamente en Falabella, presione aceptar para continuar.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => 
            {
            this.setState({ dialogInfo: false});
            window.location.href="./menu";
            }
            }>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
      </AuthenticatedTemplate> 

      <Dialog
        open={this.state.isLoading}
        PaperProps={{
            style: {
              backgroundColor: 'transparent',
              boxShadow: 'none',
            },
          }}
      >
        <DialogContent>
        <GridLoader color="#FFFFFF" loading={this.state.isLoading} size={20}/>
        </DialogContent>
      </Dialog>
      </Box>
          </>
        );
    }
}

export default Login;