import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import instance from '../api';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

function UpdateUser(props) {
  const [currentUser, setCurrentUSer] = useState(props.updatePopUp.user)
  const [avatar, setAvatar] = useState("")
  const updateCurrentUser = () => {
    instance.patch(`/update_user/${currentUser.id}`, { ...currentUser,avatar, token: localStorage.getItem('token') }, {
      headers: {
        'Content-Type': "multipart/form-data"
      }
    })
      .then((res) => {
        console.log(res.data)
      })
  }
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
  useEffect(() => {
    // getCurrentUser()
    setCurrentUSer(props.updatePopUp.user)
  }, [props.updatePopUp])
  return (
    <>
      <Dialog
        open={props.updatePopUp.open}
        onClose={() => props.setUpdatePopUp({ open: false, user: props.updatePopUp.user })}
        PaperProps={{
          component: 'form',
        }}
      >
        <DialogTitle>Update</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Update User
          </DialogContentText>
          <TextField
            margin="dense"
            id="name"
            placeholder={currentUser.username}
            type="text"
            onChange={(e) => setCurrentUSer({ ...currentUser, username: e.target.value })}
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin='dense'
            id='password'
            name='password'
            label='new password'
            type='password'
            onChange={(e) => setCurrentUSer({ ...currentUser, password: e.target.value })}
            fullWidth
            variant='standard'
          ></TextField>
          <TextField
            autoFocus
            margin='dense'
            id='password_confirmation'
            name='password_confirmation'
            label='Repeat password'
            onChange={(e) => setCurrentUSer({ ...currentUser, password_confirmation: e.target.value })}
            fullWidth
            type='password'
            variant='standard'
          ></TextField>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.setUpdatePopUp({ open: false, user: props.updatePopUp.user })}>Cancel</Button>
          <Button
            onClick={updateCurrentUser}
          >Update</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default UpdateUser