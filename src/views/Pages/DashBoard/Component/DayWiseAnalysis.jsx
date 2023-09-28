import { Box, FormControl, MenuItem, Select, Paper, Typography } from '@mui/material'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { LineChart } from '@mui/x-charts';
import { getIpDayCount, getIpDayCountselector, getOpDayCount, getOpDayCountselector } from '../../../../Redux-Slice/dashboard/sliceDashBoard';
import { eachDayOfInterval, eachMonthOfInterval, eachYearOfInterval, endOfMonth, endOfYear, startOfMonth, startOfYear, subMonths } from 'date-fns';

const DayWiseAnalysis = () => {

    const dispatch = useDispatch();
    const [yvalue, setYvalue] = useState([0])
    const [yvalue1, setYvalue1] = useState([0])
    const [flag, setFlag] = useState(0)
    const [yearlist, setYearList] = useState([])
    const [year, setYear] = useState(0)
    const [monthnames, setMonthNames] = useState(0)
    const [monthlist, setMonthlist] = useState([])
    const [check, setCheck] = useState(0)
    const [xvalue, setXvalue] = useState([0])
    const [days, setDays] = useState([])
    const [xflag, setXflag] = useState(0)

    var startDate = moment('2014-01-01').format('YYYY-MM-DD')
    var endDate = moment(new Date()).format('YYYY-MM-DD')
    const list = eachYearOfInterval({ start: new Date(startDate), end: new Date(endDate) })
    // var previousYear = moment(subYears(new Date(), 1)).format('YYYY-MM-DD')
    const prevmonth = moment(subMonths(new Date(), 1)).format('YYYY-MM-DD')

    useEffect(() => {

        const newlist = list && list.map((val) => {
            const obj = {
                year: moment(val).format('YYYY'),
                day: moment(val).format('YYYY-MM-DD')
            }
            return obj
        })
        setYearList(newlist)
        setYear(prevmonth)
    }, [])


    useEffect(() => {
        const firstmonth = startOfYear(new Date(year))
        const lastmonth = endOfYear(new Date(year))
        const monthdata = eachMonthOfInterval({ start: new Date(firstmonth), end: new Date(lastmonth) })

        const newmonthlist = monthdata && monthdata.map((val) => {
            const obj = {
                month: moment(val).format('MMM'),
                day: moment(val).format('YYYY-MM-DD')

            }
            return obj
        })
        setMonthlist(newmonthlist)
        if (check == 0) {
            const firstday = startOfMonth(new Date(year))
            const lastDay = endOfMonth(new Date(year))
            const daylist = eachDayOfInterval({ start: new Date(firstday), end: new Date(lastDay) })
            setDays(daylist)
        }
        else {
            const firstday = startOfMonth(new Date(monthnames))
            const lastDay = endOfMonth(new Date(monthnames))
            const daylist = eachDayOfInterval({ start: new Date(firstday), end: new Date(lastDay) })
            setDays(daylist)
        }

    }, [year, monthnames, check])


    useEffect(() => {
        const data = days?.map((val) => moment(val).format('DD'))
        setXvalue(data)
        if (data.length !== 0) {
            setXvalue(data)
            setXflag(1)
        }
    }, [days])
    const postdata = useMemo(() => {
        if (check === 0) {
            return {
                from: moment(startOfMonth(new Date(year))).format('YYYY-MM-DD'),
                to: moment(endOfMonth(new Date(year))).format('YYYY-MM-DD')
            }
        }
        else {
            return {
                from: moment(startOfMonth(new Date(monthnames))).format('YYYY-MM-DD'),
                to: moment(endOfMonth(new Date(monthnames))).format('YYYY-MM-DD')
            }
        }

    }, [monthnames, check, year])
    const ChangeYearList = useCallback((e) => {
        setYear(e.target.value)
        setMonthNames(moment(startOfMonth(new Date(e.target.value))).format('YYYY-MM-DD'))
        setCheck(1)
    }, [])

    const ChangeMonthList = useCallback((e) => {
        setMonthNames(e.target.value)
        setCheck(1)
    }, [])


    useEffect(() => {
        dispatch(getOpDayCount(postdata))
        dispatch(getIpDayCount(postdata))
    }, [postdata, dispatch])

    const opdata = useSelector(getOpDayCountselector)
    const ipdata = useSelector(getIpDayCountselector)

    useEffect(() => {
        if (Object.keys(opdata).length !== 0 && Object.keys(ipdata).length !== 0) {
            if (xflag === 1) {
                const newdata = days?.map((val) => moment(val).format('YYYY-MM-DD'))
                const mergedArray = newdata?.map(item1 => {
                    const newarray = opdata.find(item2 => (item2.day) === item1);
                    const count = newarray ? newarray.count : 0;
                    return { day: item1, count: count };
                });
                const mergedArray1 = newdata?.map(item1 => {
                    const newarray = ipdata.find(item2 => (item2.day) === item1);
                    const count = newarray ? newarray.count : 0;
                    return { day: item1, count: count };
                });
                const y = mergedArray?.map((val) => val.count)
                setYvalue(y)
                const y1 = mergedArray1?.map((val) => val.count)
                setYvalue1(y1)
                setFlag(1)
            }
        }
    }, [opdata, ipdata, days])
    return (
        <Box>
            <Box
                sx={{
                    pr: 2,
                    display: "flex",
                    flexDirection: 'row'
                }}>
                {flag === 1 ?
                    <LineChart
                        sx={{ pt: .5 }}
                        width={750}
                        height={300}
                        series={[
                            { data: yvalue, label: 'OP' },
                            { data: yvalue1, label: 'IP' }
                        ]}
                        xAxis={[{ scaleType: 'point', data: xvalue }]}
                    />
                    : null}

                <Box
                    sx={{
                        pt: 2,
                        display: "flex",
                        flexDirection: 'column'

                    }}>
                    <FormControl fullWidth size="small">
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            size="small"
                            variant="outlined"
                            sx={{ height: 25, p: 0, m: 0, width: 100, justifyContent: 'center' }}
                            name="year"
                            value={year}
                            onChange={(e) => ChangeYearList(e)}
                        // defaultValue={0}
                        >
                            <MenuItem value={0}>Year </MenuItem>
                            {
                                yearlist && yearlist.map((val, index) => {
                                    return <MenuItem key={index} value={val.day}> {val.year} </MenuItem>
                                })
                            }
                        </Select>
                    </FormControl>
                    <Box sx={{ pt: 0.5 }}>
                        <FormControl fullWidth size="small">
                            <Select
                                size="small"
                                variant="outlined"
                                sx={{ height: 25, p: 0, m: 0, width: 100, justifyContent: 'center' }}
                                name="monthnames"
                                value={monthnames}
                                onChange={(e) => ChangeMonthList(e)}
                            // defaultValue={0}
                            >
                                <MenuItem value={0} >
                                    Month
                                </MenuItem>
                                {
                                    monthlist && monthlist.map((val, index) => {
                                        return <MenuItem key={index} value={val.day}> {val.month} </MenuItem>
                                    })
                                }
                            </Select>
                        </FormControl>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default memo(DayWiseAnalysis)