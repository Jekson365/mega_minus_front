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
import Stack from '@mui/material/Stack'
import useCurrentUser from '../hooks/useCurrentUser';

function Edituser() {
    const { loading, user,setUser } = useCurrentUser()
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
    const [open, setOpen] = useState(false);
    const [avatar, setAvatar] = useState("")
    const [message, setMessage] = useState("")


    const update = async () => {
        try {

            instance.patch(`/update_user/${user.id}`,
                { ...user, avatar: avatar },
                {
                    headers: {
                        'Content-Type': "multipart/form-data"
                    }
                }
            )
                .then((res) => {
                    console.log(res)
                    window.location.href = '/user'
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
                        <Stack
                            gap={'5px'}
                        >
                            <Typography variant='h5'>
                                რედაქტირება
                            </Typography>
                            <TextField
                                fullWidth
                                id='username'
                                type='text'
                                placeholder={user.username}
                                label={"სახელი"}
                                margin='dense'
                                name='username'
                                onChange={(e) => setUser({ ...user, username: e.target.value })}
                            />
                            <TextField
                                margin='dense'
                                fullWidth
                                id='password'
                                name='password'
                                type='password'
                                placeholder='პაროლი'
                                label='პაროლი'
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                            />
                            <TextField
                                margin='dense'
                                fullWidth
                                id='password_confirmation'
                                name='password_confirmation'
                                type='password'
                                placeholder='გაიმეორეთ პაროლი'
                                label='გაიმეორეთ პაროლი'
                                onChange={(e) => setUser({ ...user, password_confirmation: e.target.value })}
                            />
                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                            >
                                ატვირთვა
                                <VisuallyHiddenInput type="file"
                                    onChange={(e) => setAvatar(e.target.files[0])}
                                    name='avatar' />
                            </Button>

                            <Button
                                variant='contained' size='large'
                                onClick={update}
                            >განახლება</Button>
                        </Stack>
                    </FormControl>
                </Container>

            </div>
        </div>
    )
}

export default Edituser