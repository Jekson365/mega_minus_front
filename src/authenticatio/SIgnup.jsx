import React from 'react'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import instance from '../api';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


function Signup() {

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [password_confirmation, setRepeat] = useState('')
    const [open, setOpen] = React.useState(false);
    const [avatar, setAvatar] = useState("")
    const [message, setMessage] = useState("")


    const register = async () => {
        try {

            instance.post('/users/register',
                { username, password, password_confirmation, avatar },
                {
                    headers: {
                        'Content-Type': "multipart/form-data"
                    }
                }
            )
                .then((res) => {
                    window.location.href = "/login"
                })
        }
        catch (err) {
            throw err
        }
    }
    return (
        <div>
            <div className={'center-container'}>
                <Container className='foo'>
                    <FormControl enctype='multipart/form-data'>
                        <Typography variant='h5'>
                            Sign up
                        </Typography>
                        <TextField
                            fullWidth
                            id='username'
                            type='text'
                            placeholder='username'
                            label='username'
                            margin='dense'
                            name='username'
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            margin='dense'
                            fullWidth
                            id='password'
                            name='password'
                            type='password'
                            placeholder='password'
                            label='your password'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <TextField
                            margin='dense'
                            fullWidth
                            id='password_confirmation'
                            name='password_confirmation'
                            type='password'
                            placeholder='confirm password'
                            label='repeat password'
                            onChange={(e) => setRepeat(e.target.value)}
                        />
                        <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon />}
                        >
                            Upload file
                            <VisuallyHiddenInput type="file"
                                onChange={(e) => setAvatar(e.target.files[0])}
                                name='avatar' />
                        </Button>

                        <Button
                            variant='contained' size='large'

                            onClick={register}
                        >Register</Button>
                    </FormControl>
                </Container>

            </div>
        </div>
    )
}

export default Signup