import React, { useState } from 'react'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'



function Error(props) {
    return (
        <>
            <Box
                style={{
                    "position": "absolute",
                    "right": "80px",
                    "top": "80px",
                    "width":"300px"
                }}
            >
                {props.isError != [] ? (
                    <Stack direction={'column'} gap={'10px'}>
                        {props.isError.map((e) => {
                            return (
                                <>
                                    <Box>
                                        <Alert severity='error'>{e}</Alert>
                                    </Box>
                                </>
                            )
                        })}
                    </Stack>
                ) : ""}
            </Box>
        </>
    )
}

export default Error