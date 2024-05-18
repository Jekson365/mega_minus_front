import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Stack from '@mui/material/Stack'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { UserContext, defaultImage } from '../App';
import useCurrentUser from '../hooks/useCurrentUser';
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import SettingsIcon from '@mui/icons-material/Settings';
import instance from '../api';
import { GoldenButton } from '../styles/styles';
import LogoutIcon from '@mui/icons-material/Logout';
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ProductMenu from './nav_components/ProductMenu';
import CalculationMenu from './nav_components/CalculationMenu';
import OverHeadMenu from './nav_components/OverHeadMenu';

export default function Navbar() {
    const [loged, setLoged] = useState(localStorage.getItem("token") == "" ? false : true)
    const { loading, user } = useCurrentUser()

    const logOut = () => {
        localStorage.setItem("token", "")
        window.location.href = 'login'
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
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant='h6' mr={2}>
                            Mega Minus
                        </Typography>
                        {loged ? (
                            <>
                                <Box sx={{ flexGrow: 1 }}>
                                    <Stack direction={'row'} gap={'10px'}>
                                        <ProductMenu />
                                        <CalculationMenu/>
                                        <OverHeadMenu/>
                                        {user.role_id == 2 ?
                                            <Typography component={Link} to={'/users'}>
                                                <GoldenButton variant='contained'>მომხმარებლები</GoldenButton>
                                            </Typography> : ""}
                                    </Stack>
                                </Box>
                                <Stack direction={'row'} gap={'10px'} alignItems={'center'}>
                                    <Typography
                                        mt={1}
                                        color={'white'}
                                        to={'/login'}
                                        onClick={logOut}
                                        variant="h6" component={Link}>
                                        <LogoutIcon />
                                    </Typography>
                                    <Typography component={Link} to={'/edit'} color={'white'} mt={1}>
                                        <SettingsIcon
                                        ></SettingsIcon>
                                    </Typography>
                                    <Typography color="inherit" component={Link} to={'/user'}>{user.username}</Typography>
                                    <Avatar src={user.avatar ? "http://localhost:3000" + user.avatar.url : defaultImage}></Avatar>
                                </Stack>
                            </>
                        ) :
                            <>
                                <Button color='inherit' component={Link} to={'/login'} >შესვლა</Button>
                                <Button color='inherit' component={Link} to={'/signup'}>რეგისტრაცია</Button>
                            </>}
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    );
}
