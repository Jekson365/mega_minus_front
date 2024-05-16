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


export default function Navbar() {
    const [loged, setLoged] = useState(localStorage.getItem("token") == "" ? false : true)
    const { loading, user } = useCurrentUser()

    const logOut = () => {
        localStorage.setItem("token", "")
        window.location.href = 'login'
    }
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
                                        <Typography
                                            color={'white'}
                                            to={'/login'}
                                            onClick={logOut}
                                            variant="h6" component={Link}>
                                            logout
                                        </Typography>
                                        <Typography
                                            color={'white'}
                                            to={'/products'}
                                            variant="h6" component={Link}>
                                            products
                                        </Typography>
                                        <Typography color={'white'}
                                            component={Link}
                                            variant='h6'
                                            to={'/new_product'}
                                        >create</Typography>
                                        <Typography color={'white'}
                                            component={Link}
                                            variant='h6'
                                            to={'/calculation'}
                                        >calculation</Typography>
                                         <Typography color={'white'}
                                            component={Link}
                                            variant='h6'
                                            to={'/mycalcs'}
                                        >my calculations</Typography>
                                        {user.role_id == 2 ? 
                                        <Typography component={Link} to={'/users'}>
                                            <GoldenButton variant='contained'>Users</GoldenButton>
                                        </Typography> : ""}
                                    </Stack>
                                </Box>
                                <Stack direction={'row'} gap={'10px'} alignItems={'center'}>
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
                                <Button color='inherit' component={Link} to={'/login'} >login</Button>
                                <Button color='inherit' component={Link} to={'/signup'}>Sign up</Button>
                            </>}
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    );
}
