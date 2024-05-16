import React, { useEffect, useState } from 'react'
import instance from '../api'
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import RemoveUser from '../popups/RemoveUser';
import UpdateUser from '../popups/UpdateUser';
import Snackbar from '@mui/material/Snackbar'
import SnackbarContent from '@mui/material/SnackbarContent'

function Users() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false);
    const [userId, setUserId] = useState(null)
    const [updatePopUp, setUpdatePopUp] = useState({ open: false, user: {} })
    const [adminToast, setAdminToast] = useState(false)

    const handleClickOpen = (id) => {
        setUserId(id)
        setOpen(true);
    };

    const handleClose = (ans) => {
        if (ans == 'yes') {
            deleteUSer()
        }
        setOpen(false);
    };


    const deleteUSer = async () => {
        await instance.delete(`/user/${userId}`, { headers: { Authorization: localStorage.getItem("token") } })
            .then((res) => {
                window.location.reload()
            })
    }


    const fetchUsers = async () => {
        instance.get("/all_users", { headers: { Authorization: localStorage.getItem("token") } })
            .then((res) => {
                if (res.data.status == 403) {
                    setUsers([])
                    setLoading(false)
                    setAdminToast(true)
                }
                else {
                    setUsers(res.data)
                    setLoading(false)
                }
            })
            .catch((err) => {
                setLoading(false)
            })
    }

    useEffect(() => {
        fetchUsers()
    }, [])
    return (
        <>
            {loading ? <h1>Loading...</h1> :
                <>
                    <Snackbar
                        open={adminToast}
                        message="for admin only"
                    ></Snackbar>

                    <RemoveUser
                        open={open}
                        handleClose={handleClose}
                    />
                    <UpdateUser
                        updatePopUp={updatePopUp}
                        setUpdatePopUp={setUpdatePopUp}
                    />
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Username</TableCell>
                                    <TableCell
                                    >Delete</TableCell>
                                    <TableCell>Update</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users && users.map((e) => {
                                    return (
                                        <>
                                            <TableRow className={`${e.role_id == 2 ? 'super_color': ""}`}>
                                                <TableCell>{e.username}</TableCell>
                                                <TableCell>
                                                    <Button
                                                        variant='outlined'
                                                        color='error'
                                                        onClick={() => handleClickOpen(e.id)}
                                                    >Delete</Button>
                                                </TableCell>
                                                <TableCell
                                                >
                                                    <Button
                                                        onClick={() => setUpdatePopUp({ open: true, user: e })}
                                                        color='primary'
                                                        variant='contained'
                                                    >Update</Button>
                                                </TableCell>
                                            </TableRow>
                                        </>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            }
        </>
    )
}

export default Users