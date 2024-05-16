import React, { useEffect, useState } from 'react'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import instance from '../api'

function Filters(props) {
  return (
    <>
      <Grid container columns={{ xs: 12 }} mt={3}>
        <Stack direction={'row'} gap={'20px'}>
          <Grid sx={{ sx: 4 }} item>
            <TextField
              onChange={(e)=>props.setCode(e.target.value)}
              placeholder='code'
            ></TextField>
          </Grid>
          <Grid sx={{ sx: 4 }} item>
            <TextField
              onChange={(e)=>props.setTitle(e.target.value)}
              placeholder='title'
            ></TextField>
          </Grid>
        </Stack>
      </Grid>
    </>
  )
}

export default Filters