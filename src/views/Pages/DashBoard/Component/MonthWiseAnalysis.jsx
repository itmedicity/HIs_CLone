import { Box, FormControl, MenuItem, Select } from '@mui/material'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { LineChart } from '@mui/x-charts';
import { getIpMonthCount, getIpMonthCountselector, getOpMonthCount, getOpMonthCountselector } from '../../../../Redux-Slice/dashboard/sliceDashBoard';
import { eachYearOfInterval, endOfYear, startOfYear, subYears } from 'date-fns';

const MonthWiseAnalysis = () => {

    const dispatch = useDispatch();
    const [yvalue, setYvalue] = useState([])
    const [yvalue1, setYvalue1] = useState([])
    const [flag, setFlag] = useState(0)
    const [yearlist, setYearList] = useState([])
    const [year, setYear] = useState(0)
    const [xvalue] = useState(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'])


    var startDate = moment('2014-01-01').format('YYYY-MM-DD')
    var endDate = moment(new Date()).format('YYYY-MM-DD')
    var previousYear = moment(subYears(new Date(), 1)).format('YYYY-MM-DD')
    const list = eachYearOfInterval({ start: new Date(startDate), end: new Date(endDate) })
    useEffect(() => {
        const newlist = list && list.map((val) => {
            const obj = {
                year: moment(val).format('YYYY'),
                day: moment(val).format('YYYY-MM-DD')
            }
            return obj
        })
        setYearList(newlist)
        setYear(previousYear)
    }, [])


    const postdata = useMemo(() => {
        return {
            from: moment(startOfYear(new Date(year))).format('YYYY-MM-DD'),
            to: moment(endOfYear(new Date(year))).format('YYYY-MM-DD')
        }
    }, [year])

    useEffect(() => {
        dispatch(getOpMonthCount(postdata))
        dispatch(getIpMonthCount(postdata))

    }, [postdata, dispatch])

    const opmonth = useSelector(getOpMonthCountselector)
    const ipmonth = useSelector(getIpMonthCountselector)

    useEffect(() => {
        if (opmonth.length !== 0 && ipmonth.length !== 0) {

            const array = xvalue?.map(item1 => {
                const newarray = opmonth?.find(item2 => moment(item2.month).format('MMM') === item1);
                const count = newarray ? newarray.count : 0;
                return { month: item1, count: count };
            });

            const array1 = xvalue?.map(item1 => {
                const newarray1 = ipmonth?.find(item2 => moment(item2.month).format('MMM') === item1);
                const count = newarray1 ? newarray1.count : 0;
                return { month: item1, count: count };
            });
            const y = array?.map((val) => val.count)
            setYvalue(y)
            const y1 = array1?.map((val) => val.count)
            setYvalue1(y1)
            setFlag(1)

        }
    }, [opmonth, ipmonth])
    const ChangeYearCount = useCallback((e) => {
        setYear(e.target.value)

    }, [])
    return (
        <Box>
            <Box
                sx={{
                    pl: 2,
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
                        pr: 2,
                        pt: 2,
                        display: "flex",
                        flexDirection: 'row'

                    }}>
                    <FormControl fullWidth size="small">
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            size="small"
                            variant="outlined"
                            sx={{ height: 25, p: 0, m: 0, width: 90, justifyContent: 'center' }}
                            name="year"
                            value={year}
                            onChange={(e) => ChangeYearCount(e)}
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
                </Box>
            </Box>
        </Box>
    )
}

export default memo(MonthWiseAnalysis)