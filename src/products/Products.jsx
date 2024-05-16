import React, { useEffect, useState } from 'react'
import instance from '../api'
import CircularProgress from '@mui/material/CircularProgress';
import Card from './Productcard';
import Productcard from './Productcard';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SnackbarContent from '@mui/material/SnackbarContent';
import Editproduct from './Editproduct';
import Filters from '../filters/Filters';
import { useUserProducts } from '../hooks/useUserProducts';


function Products() {
    const {products,error,setProducts,setError,displayProducts} = useUserProducts()
    const [data, setData] = useState({})
    const [open, setOpen] = useState(false)
    
    const [code, setCode] = useState()
    const [title,setTitle] = useState()

    useEffect(() => {
        console.log(code,title)
        if (code == "" || title == "") {
            displayProducts()
        }
        setProducts(products.filter((p) => String(p.code).includes(code)))

    }, [code,title])
    const switchPopUp = (data) => {
        setData(data)
        setOpen(true)
    }
    if (products != []) {
        return (
            <>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell>price</TableCell>
                                <TableCell>code</TableCell>
                                <TableCell>amount</TableCell>
                                <TableCell>measure</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>created at</TableCell>
                                <TableCell>updated at</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className='scrollable'>
                            {products.map((row) => (
                                <TableRow
                                    onClick={() => switchPopUp(row)}
                                    className='prod-row'
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.title}</TableCell>
                                    <TableCell>{row.price}</TableCell>
                                    <TableCell>{row.code}</TableCell>
                                    <TableCell>{row.amount}</TableCell>
                                    <TableCell>{row.measure}</TableCell>
                                    <TableCell>{row.category_id}</TableCell>
                                    <TableCell>{row.created_at}</TableCell>
                                    <TableCell>{row.updated_at}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Editproduct data={data} open={open} setopen={setOpen} />
            </>
        )
    }
    else {
        return (
            <>
                <div className='centerd'>
                    <SnackbarContent message={error} />
                    <CircularProgress />
                </div>
            </>
        )
    }
}

export default Products