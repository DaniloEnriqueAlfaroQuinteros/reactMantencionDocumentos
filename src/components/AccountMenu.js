import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import Cookies from 'universal-cookie';
import { useMsal } from "@azure/msal-react";
const cookies = new Cookies();

const AccountMenu = () => {

  const cerrarSesion = () => {
    cookies.remove('id', { path: "/" });
    cookies.remove('apellido_paterno', { path: "/" });
    cookies.remove('apellido_materno', { path: "/" });
    cookies.remove('nombre', { path: "/" });
    cookies.remove('username', { path: "/" });
    cookies.remove('tipodoc', { path: "/" });
    cookies.remove('sucursal', { path: "/" });
    cookies.remove('correlativo', { path: "/" });
    cookies.remove('fechainical', { path: "/" });
    cookies.remove('fechafinal', { path: "/" });
    window.location.href = './';
  }
  const { instance } = useMsal();
    
  const handleLogout = (logoutType) => {
      if (logoutType === "redirect") {
         instance.logoutRedirect({
              postLogoutRedirectUri: "/",
          });
      }
  }
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Typography color="primary" sx={{ minWidth: 100 }}>Bienvenido {cookies.get('username')}</Typography>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <MenuIcon fontSize="large" color="action" />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <Avatar /> Perfil
        </MenuItem>
        <MenuItem>
          <Avatar /> Mi cuenta
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Configuraciones
        </MenuItem>
        <MenuItem onClick={()=> 
                {
                    
                  handleLogout("redirect");
                    
                }}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Cerrar Sesion
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

export default AccountMenu;
