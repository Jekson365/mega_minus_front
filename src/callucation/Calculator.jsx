import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import instance from '../api';

function Calculator(props) {
    const [price,setPrice] = useState()
    const [title,setTitle] = useState()

    const postCalculation = async () => {
        instance.post("/create_calculation",{
            price,
            title,
            products: props.calcProducts
        })
        .then((res)=> {
            console.log(res.data)
        })
    }
    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>code</TableCell>
                            <TableCell>amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className='scrollable'>
                        {props.calcProducts.map((row) => (
                            <TableRow
                                className='prod-row'
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>{row.title}</TableCell>
                                <TableCell>{row.code}</TableCell>
                                <TableCell>{row.amount}</TableCell>
                            </TableRow>
                        ))}
                        <TableRow
                        >
                            <Stack direction='row' gap='20px' m={1}>
                                <Button variant='contained'
                                    onClick={postCalculation}
                                >Save</Button>
                                <TextField
                                    placeholder='price'
                                    onChange={(e)=>setPrice(e.target.value)}
                                ></TextField>
                                <TextField
                                    placeholder='title'
                                    onChange={(e)=>setTitle(e.target.value)}
                                ></TextField>
                            </Stack>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default Calculator