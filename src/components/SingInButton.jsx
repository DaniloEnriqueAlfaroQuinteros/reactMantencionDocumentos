import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import {
    Button
  } from '@mui/material';
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';

export const SignInButton = () => {
    const { instance } = useMsal();
    
    const handleLogin = (loginType) => {
     
        if (loginType === "redirect") {
            instance.loginRedirect(loginRequest)
            .catch(e => {
                console.log(e);
            });
           
        }

    }
    const goToMenu = () => {
        window.location.href="./menu";
    }

    return (
        <Button variant="contained" endIcon={<PlayCircleFilledWhiteOutlinedIcon />} onClick={() => { handleLogin("redirect").then(()=>goToMenu());
        
    }}>Acceder</Button>
    );
}