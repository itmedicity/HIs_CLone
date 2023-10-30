// @ts-nocheck
import React, { Fragment, memo } from 'react'
import { Box, Paper, Typography } from '@mui/material'
import { ToastContainer } from 'react-toastify'
import YearWiseAnalysis from './Component/YearWiseAnalysis'
import CurrentYearAnalysis from './Component/CurrentYearAnalysis'
import MonthWiseAnalysis from './Component/MonthWiseAnalysis'
import CurrentMonthAnalysis from './Component/CurrentMonthAnalysis'
import DayWiseAnalysis from './Component/DayWiseAnalysis'

const DashboardOP_IP = () => {
    return (
        <Fragment>
            <ToastContainer />
            {/* <Box sx={{ display: "flex", flexDirection: 'column', width: "100%" }}>
                <Box sx={{ display: "flex", width: "100%", pt: 1 }}>

                    <Box sx={{
                        px: 2,

                        width: "99%",
                        // overflow: 'hidden',
                        cursor: 'pointer',

                    }}>
                        <Paper
                            sx={{
                                pr: 5,
                                display: "flex",
                                flexDirection: 'column',
                                borderRadius: '6px',
                                flex: 1,
                                boxShadow: 1,
                                height: 330,
                                alignItems: 'center',
                                flexShrink: 1,
                                flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, },
                            }}>
                            <Typography>
                                OP-IP Year Wise Analysis
                            </Typography>
                            <Box sx={{ pl: 2 }}>
                                <YearWiseAnalysis />
                            </Box>

                        </Paper>
                    </Box>
                </Box>
                <Box sx={{
                    display: "flex", width: "100%", pt: 2,
                }}>
                    <Box sx={{ pl: 2, m: 0, display: "flex", flex: 1, width: 750 }}>
                        <Paper
                            sx={{
                                display: "flex",
                                borderRadius: '6px',
                                flexDirection: 'column',
                                alignItems: 'center',
                                flex: 1,
                                boxShadow: 1,
                                height: 330,
                                flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, },
                            }}>
                            <Typography>
                                OP-IP Current Year Analysis
                            </Typography>
                            <CurrentYearAnalysis />
                        </Paper>
                    </Box>

                    <Box sx={{ px: 2, m: 0, display: "flex", flex: 1.2, width: 750 }}>
                        <Paper
                            sx={{
                                display: "flex",
                                borderRadius: '6px',
                                flex: 1,
                                boxShadow: 1,
                                height: 330,
                                flexDirection: 'column',
                                alignItems: 'center',
                                flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, },
                            }}>
                            <Typography>
                                OP-IP Year-Month Analysis
                            </Typography>
                            <MonthWiseAnalysis />
                        </Paper>
                    </Box>

                </Box>

                <Box sx={{
                    display: "flex", width: "100%", pt: 2,
                }}>
                    <Box sx={{ pl: 2, m: 0, display: "flex", flex: 1, width: 750 }}>
                        <Paper
                            sx={{
                                display: "flex",
                                borderRadius: '6px',
                                flexDirection: 'column',
                                alignItems: 'center',
                                flex: 1,
                                boxShadow: 1,
                                height: 330,
                                flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, },
                            }}>
                            <Typography>
                                OP-IP Current Month Analysis
                            </Typography>
                            <CurrentMonthAnalysis />
                        </Paper>
                    </Box>

                    <Box sx={{ px: 2, m: 0, display: "flex", flex: 1.2, width: 750 }}>
                        <Paper
                            sx={{
                                display: "flex",
                                borderRadius: '6px',
                                flexDirection: 'column',
                                alignItems: 'center',
                                flex: 1,
                                boxShadow: 1,
                                height: 330,
                                flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, },
                            }}>
                            <Typography>
                                OP-IP Year-Month-Day Analysis
                            </Typography>

                            <DayWiseAnalysis />

                        </Paper>
                    </Box>
                </Box>

            </Box > */}
        </Fragment >
    )
}

export default memo(DashboardOP_IP)