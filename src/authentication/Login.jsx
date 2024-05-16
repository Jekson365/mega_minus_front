import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import instance from '../api';
import Snackbar from '@mui/material/Snackbar'

function Login() {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [open, setOpen] = React.useState(false);
    const [message,setMessage] = useState("")

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen(false);
    };

    const login = async () => {
        try {

            instance.post('/users/login',{username,password})
            .then((res)=> {
                if (res.data.status == 401) {
                    setOpen(true)
                    setMessage('credentials incorrect')
                }
                else {  
                    localStorage.setItem('token',res.data.token)
                    setOpen(true)
                    setMessage("Success!")
                    window.location.href = '/user'
                }
            })
        }
        catch (err) {
            throw err
        }

    }
  return (
    <>
    <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message={message}
        severity='danger'
    >
    </Snackbar>
    <div className={'center-container'}>
        <Container className='foo'>
            <FormControl>
                <Typography variant='h5'>
                    Login
                </Typography>
                <TextField
                    fullWidth
                    id='username'
                    type='text'
                    placeholder='username'
                    label='username'
                    margin='dense'
                    onChange={(e)=>setUsername(e.target.value)}
                    />
                <TextField
                    margin='dense'
                    fullWidth
                    id='password'
                    type='password'
                    placeholder='password'
                    label='your password'
                    onChange={(e)=>setPassword(e.target.value)}
                    />
            <Button
                variant='contained' size='large'
                onClick={login}
            >Login</Button>
            </FormControl>
        </Container>
        
    </div>
    </>
  )
}

export default Login