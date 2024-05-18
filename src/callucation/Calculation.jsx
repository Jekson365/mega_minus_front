import React, { useEffect, useState } from 'react'
import { useUserProducts } from '../hooks/useUserProducts'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Calculator from './Calculator';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'

function Calculation() {
    const { products, error, setProducts, setError, displayProducts } = useUserProducts()
    const [calcProducts, setCalcProducts] = useState([])
    const [currentCalcProduct, setCurrentCalcProduct] = useState({})
    const [open, setOpen] = useState(false)
    const [amount, setAmount] = useState(0)

    const setCalculatorProducts = (row) => {
        setOpen(true)
        setCurrentCalcProduct(row)
    }
    const handleCalculateSubmit = () => {
        setOpen(false)
        const updatedProduct = { ...currentCalcProduct, amount: amount };
        setCalcProducts([...calcProducts, updatedProduct]);
    }

    return (
        <>

            <Dialog
                open={open}
            >
                <Box p={3}>
                    <Stack direction='column' gap={'20px'}>
                        <TextField
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder='amount'
                            type='number'
                        ></TextField>
                        <Stack direction={'row'} gap={'20px'}>
                            <Button variant='contained'
                                fullWidth
                                onClick={handleCalculateSubmit}
                            >Submit</Button>
                            <Button
                                variant='outlined'
                                color='error'
                                fullWidth
                                onClick={() => setOpen(false)}
                            >Cancel</Button>
                        </Stack>
                    </Stack>
                </Box>
            </Dialog>
            <Box>
                <Grid container>
                    <Grid xs={6} item p={3}>
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Title</TableCell>
                                        <TableCell>price</TableCell>
                                        <TableCell>code</TableCell>
                                        <TableCell>amount</TableCell>
                                        <TableCell>measure</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody className='scrollable'>
                                    {products.map((row) => (
                                        <TableRow
                                            onClick={() => setCalculatorProducts(row)}
                                            className='prod-row'
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell>{row.title}</TableCell>
                                            <TableCell>{row.price}</TableCell>
                                            <TableCell>{row.code}</TableCell>
                                            <TableCell>{row.amount}</TableCell>
                                            <TableCell>{row.measure}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid xs={6} item p={3}>
                        <Calculator
                            calcProducts={calcProducts}
                            amount={amount}
                            currentCalcProduct={currentCalcProduct} />
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default Calculation