import React, { useEffect, useState } from 'react'
import instance from '../api'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import TableBody from '@mui/material/TableBody'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

function Mycalculations() {
    const [loading, setLoading] = useState(true)
    const [calculations, setCalculations] = useState()
    const [currentCalculation, setCurrentCalculation] = useState()

    const getCalculations = async () => {
        instance.get("/calculations")
            .then((res) => {
                setCalculations(res.data)
                setLoading(false)
            })
    }

    const getCurrentCalculationProduct = async (id) => {
        await instance.post('/current_calculation', { calculation_id: id })
            .then((res) => {
                setCurrentCalculation(res.data)
            })
    }

    const removeCalculation = async (id) => {
        await instance.post('/delete_calculation', { calculation_id: id })
            .then((res) => {
                console.log(res.data)
            })
    }

    const removeCalcProduct = async (id,calc_id) => {
        await instance.post('/delete_calc_product',{product_id: id,calculation_id: calc_id})
            .then((res)=> {
                console.log(res)
                window.location.reload()
            })
            
    }
    useEffect(() => {
        getCalculations()
    }, [])
    useEffect(() => {
        console.log(currentCalculation)
    }, [currentCalculation])
    if (loading) {

        return (
            <>
                <h1>Loading...</h1>
            </>
        )
    }
    else {
        return (
            <>
                <Grid container p={3}>
                    <Grid item xs={8}>
                        <TableContainer component={Paper} className='scrollable'>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Id</TableCell>
                                        <TableCell>Title</TableCell>
                                        <TableCell>price</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody className='scrollable'>
                                    {calculations.map((row) => (
                                        <TableRow
                                            onClick={() => getCurrentCalculationProduct(row.id)}
                                            className='prod-row'
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell>{row.id}</TableCell>
                                            <TableCell>{row.title}</TableCell>
                                            <TableCell>{row.price}</TableCell>
                                            <TableCell>
                                                <Button variant='contained' color='error'
                                                    onClick={() => removeCalculation(row.id)}
                                                >
                                                    Remove
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item xs={4}>
                        <Box>
                            <Button variant='contained' color='error' >Price: {currentCalculation && currentCalculation.calc_info.price}</Button>
                        </Box>
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Id</TableCell>
                                        <TableCell>Title</TableCell>
                                        <TableCell>price</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody className='scrollable'>
                                    {currentCalculation && currentCalculation.data.map((row) => (
                                        <TableRow
                                            onClick={() => getCurrentCalculationProduct(row.id)}
                                            className='prod-row'
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell>{row.id}</TableCell>
                                            <TableCell>{row.title}</TableCell>
                                            <TableCell>{row.price}</TableCell>
                                            <Button variant='contained' mt={1}
                                                onClick={()=>removeCalcProduct(row.id,currentCalculation.calc_info.id)}
                                            >Remove</Button>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </>
        )
    }
}

export default Mycalculations