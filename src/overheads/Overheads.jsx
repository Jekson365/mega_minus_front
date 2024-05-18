import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import OverHeadMenu from '../components/nav_components/OverHeadMenu'
import TableContainer from '@mui/material/TableContainer'
import userOverHead from '../hooks/overheads/userOverHead'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import instance from '../api'
import CurrentOverheadProd from './current/CurrentOverheadProd'
import Typography from '@mui/material/Typography'

function Overheads() {
    const { overhead, setOverHead } = userOverHead()
    const [currentOverhead, setCurrentOverhead] = useState([])

    const handleOverhead = async (row) => {
        await instance.post("/overhead_products", {
            overhead_id: row.id
        },
            {
                headers: { Authorization: localStorage.getItem("token") }
            }
        )
            .then((res) => {
                setCurrentOverhead(res.data)
            })
    }
    useEffect(() => {
        console.log(overhead)
    }, [])
    return (
        <>
            <Grid container>
                <Grid item xs={8} direction={'row'} p={3}>
                    <Grid container xs={12} style={{ height: "45vh", overflowX: "hidden", overflowY: "scroll" }}>
                        <TableContainer component={Paper}>
                            <Table style={{ width: "100%" }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Id</TableCell>
                                        <TableCell>code</TableCell>
                                        <TableCell>importer</TableCell>
                                        <TableCell>status</TableCell>
                                        <TableCell>destination</TableCell>
                                        <TableCell>begin date</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody className='scrollable'>
                                    {overhead && overhead.map((row) => (
                                        <TableRow
                                            onClick={() => handleOverhead(row)}
                                            className={`prod-row ${row.overhead_status_id == 1 ? 'overhead-active' : row.overhead_status_id == 2 ? 'overhead-deactive' : "overhead-ongoing"}`}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell className='cell-text'>
                                                <Typography>{row.id}</Typography></TableCell>
                                            <TableCell className='cell-text'>
                                                <Typography>{row.code}</Typography></TableCell>
                                            <TableCell className='cell-text'>
                                                <Typography>{row.importer}</Typography></TableCell>
                                            <TableCell className='cell-text'>
                                                <Typography>{row.status}</Typography></TableCell>
                                            <TableCell className='cell-text'>
                                                <Typography>{row.end_location}</Typography></TableCell>
                                            <TableCell className='cell-text'>
                                                <Typography>{row.begin_date}</Typography></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid container item xs={12} style={{ height: "45vh" }} className='bt'>
                        <CurrentOverheadProd currentOverhead={currentOverhead} />
                    </Grid>
                </Grid>
                <Grid item xs={4}>
                    <h1>hello world</h1>
                </Grid>
            </Grid>
        </>
    )
}

export default Overheads