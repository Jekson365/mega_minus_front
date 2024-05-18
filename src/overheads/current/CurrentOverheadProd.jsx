import React, { useEffect } from 'react'
import Paper from '@mui/material/Paper'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import Typography from '@mui/material/Typography'

function CurrentOverheadProd(props) {
    useEffect(() => {
        console.log(props.currentOverhead)
    }, [props.currentOverhead])

    if (props.currentOverhead) {

        return (
            <>
                <TableContainer component={Paper}>
                    <Table style={{ width: "100%" }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell>title</TableCell>
                                <TableCell>price</TableCell>
                                <TableCell>amount</TableCell>
                                <TableCell>code</TableCell>
                                <TableCell>measure</TableCell>
                                <TableCell>category</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className='scrollable'>
                            {props.currentOverhead.length == 0 ? <Typography m={2} color={'black'}
                                variant='h5'
                            >ჩანაწერები არ არის</Typography> : (
                                (
                                    <>

                                        {props.currentOverhead.map((e) => {
                                            return (
                                                <>
                                                    <TableRow
                                                        className='prod-row'
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell>{e.id}</TableCell>
                                                        <TableCell>{e.title}</TableCell>
                                                        <TableCell>{e.price}</TableCell>
                                                        <TableCell>{e.amount}</TableCell>
                                                        <TableCell>{e.code}</TableCell>
                                                        <TableCell>{e.measure}</TableCell>
                                                        <TableCell>{e.category_id}</TableCell>
                                                    </TableRow>
                                                </>
                                            )
                                        })}
                                    </>
                                )
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        )
    }
}

export default CurrentOverheadProd