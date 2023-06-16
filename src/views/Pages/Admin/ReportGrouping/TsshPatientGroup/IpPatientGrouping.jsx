// @ts-nocheck
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import React, { memo, useState } from 'react'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

const IpPatientGrouping = () => {

    const [value, setValue] = useState(new Date());
    return (
        <Paper
            variant="outlined"
            sx={{
                display: 'flex', flex: 1, flexDirection: 'column',
                mx: 10, my: 5,
                borderColor: '#525252'
            }}
        >
            <Box sx={{
                display: 'flex',
                backgroundColor: '#525252',
                height: 35,
                px: 2,
                fontSize: '12px',
                fontFamily: 'Arial',
                fontWeight: 'bold',
                borderTopRightRadius: '3px',
                borderTopLeftRadius: '3px',
                color: 'whitesmoke',
                // justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center'
            }} >
                <Box >
                    Patient Grouping
                </Box>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flex: 1,
                    flexDirection: 'column',
                    borderBottomLeftRadius: '3px',
                    borderBottomRightRadius: '3px'
                }}
            >
                <Paper
                    square
                    variant='outlined'
                    sx={{ display: 'flex', mx: 0, p: 0.5, justifyContent: 'center' }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            fontFamily: 'Arial',
                            fontSize: '13px',
                            fontWeight: 'bold',
                            color: '#525252',
                            pr: 2
                        }}
                    >
                        Admission Date :
                    </Box>
                    <LocalizationProvider dateAdapter={AdapterDateFns} >
                        <DatePicker
                            // label="Controlled picker"
                            value={value}
                            onChange={(newValue) => setValue(newValue)}
                            disableFuture
                            disableHighlightToday={true}
                            slotProps={{ textField: { size: 'small' } }}
                        />
                    </LocalizationProvider>
                    <Button
                        variant='outlined'
                        sx={{ mx: 2 }}
                    >Process</Button>
                </Paper>
                <Paper
                    square
                    variant='outlined'
                    sx={{
                        display: 'flex', flex: 1, mx: 0, borderBottomLeftRadius: '3px',
                        borderBottomRightRadius: '3px'
                    }}
                >
                    <TableContainer component={Paper} >
                        <Table size='small' stickyHeader >
                            <TableHead >
                                <TableRow>
                                    <TableCell variant='head' padding='checkbox' >slno</TableCell>
                                    <TableCell variant='head' padding='checkbox' >Inpatient #</TableCell>
                                    <TableCell variant='head' padding='checkbox' >Outpatient #</TableCell>
                                    <TableCell variant='head' padding='checkbox' >Patient Name</TableCell>
                                    <TableCell variant='head' padding='checkbox' align='center' >action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell padding='checkbox' >d</TableCell>
                                    <TableCell padding='checkbox' >d</TableCell>
                                    <TableCell padding='checkbox' >d</TableCell>
                                    <TableCell padding='checkbox' >d</TableCell>
                                    <TableCell padding='checkbox' align='center' >
                                        <Button variant='outlined' size='small' sx={{ textTransform: 'capitalize', width: '50%' }} >Transfer</Button>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Box>
        </Paper>
    )
}

export default memo(IpPatientGrouping) 