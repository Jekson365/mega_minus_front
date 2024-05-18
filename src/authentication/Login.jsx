import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import instance from '../api';
import Snackbar from '@mui/material/Snackbar'
import Error from '../errors/Error';

function Login() {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [open, setOpen] = React.useState(false);
    const [message,setMessage] = useState("")
    const [isError,setIsError] = useState([])

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
                    // setMessage('credentials incorrect')
                    setIsError(res.data.errors)
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
    <Error isError={isError}/>
    <div className={'center-container'}>
        <Container className='foo'>
            <FormControl>
                <Typography variant='h5'>
                    სისტემაში შესვლა
                </Typography>
                <TextField
                    fullWidth
                    id='username'
                    type='text'
                    placeholder='სახელი'
                    label='სახელი'
                    margin='dense'
                    onChange={(e)=>setUsername(e.target.value)}
                    />
                <TextField
                    margin='dense'
                    fullWidth
                    id='password'
                    type='password'
                    placeholder='პაროლი'
                    label='პაროლი'
                    onChange={(e)=>setPassword(e.target.value)}
                    />
            <Button
                variant='contained' size='large'
                onClick={login}
            >შესვლა</Button>
            </FormControl>
        </Container>
        
    </div>
    </>
  )
}

export default Login