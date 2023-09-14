import { Box } from '@mui/material'
import React, { memo, useEffect, useMemo, useState } from 'react'
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { LineChart } from '@mui/x-charts';
import { getIpCurrentMonth, getIpCurrentMonthselector, getOpCurrentMonth, getOpCurrentMonthselector } from '../../../../Redux-Slice/dashboard/sliceDashBoard';
import { eachDayOfInterval, endOfMonth, startOfMonth } from 'date-fns';

const CurrentMonthAnalysis = () => {
    const dispatch = useDispatch();
    const [xvalue, setXvalue] = useState([])
    const [yvalue, setYvalue] = useState([])
    const [yvalue1, setYvalue1] = useState([])
    const [flag, setFlag] = useState(0)
    const [xflag, setXflag] = useState(0)
    const postdata = useMemo(() => {
        return {
            from: moment(startOfMonth(new Date())).format('YYYY-MM-DD'),
            to: moment(endOfMonth(new Date())).format('YYYY-MM-DD')
        }
    }, [])

    useEffect(() => {
        dispatch(getOpCurrentMonth(postdata))
        dispatch(getIpCurrentMonth(postdata))
    }, [postdata, dispatch])

    const opdata = useSelector(getOpCurrentMonthselector)
    const ipdata = useSelector(getIpCurrentMonthselector)

    useEffect(() => {
        const firstday = startOfMonth(new Date())
        const lastDay = endOfMonth(new Date())
        const daylist = eachDayOfInterval({ start: new Date(firstday), end: new Date(lastDay) })
        const data = daylist?.map((val) => moment(val).format('DD'))
        if (data.length !== 0) {
            setXvalue(data)
            setXflag(1)
        }
    }, [])

    useEffect(() => {

        if (Object.keys(opdata).length !== 0 && Object.keys(ipdata).length !== 0) {
            if (xflag === 1) {
                const array = xvalue?.map(item1 => {
                    const newarray = opdata?.find(item2 => moment(item2.day).format('DD') === item1);
                    const count = newarray ? newarray.count : 0;
                    return { day: item1, count: count };
                });

                const array1 = xvalue?.map(item1 => {
                    const newarray1 = ipdata?.find(item2 => moment(item2.day).format('DD') === item1);
                    const count = newarray1 ? newarray1.count : 0;
                    return { day: item1, count: count };
                });
                const y = array?.map((val) => val.count)
                setYvalue(y)
                const y1 = array1?.map((val) => val.count)
                setYvalue1(y1)
                setFlag(1)
            }

            // if (yvalue !== 0 && yvalue1 !== 0) {
            //     setFlag(1)
            // }


        }
    }, [opdata, ipdata])
    return (
        <Box>
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

        </Box>
    )
}

export default memo(CurrentMonthAnalysis)