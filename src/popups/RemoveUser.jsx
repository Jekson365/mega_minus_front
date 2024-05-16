import React, { useEffect } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


function RemoveUser(props) {
  return (
    <>

        <Dialog
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">
            {"Deleting User"}
                </DialogTitle>
                    <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Are you sure you want to delete user ? 
                            </DialogContentText>
                        </DialogContent>
                    <DialogActions>
                <Button onClick={()=>props.handleClose('no')} color='error'>No</Button>
                <Button onClick={()=>props.handleClose('yes')} autoFocus color='success'>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    </>
  )
}

export default RemoveUser