import { Box } from '@mui/material'
import React, { memo, useEffect, useMemo, useState } from 'react'
import {
    getIpYearCount,
    getIpYearCountselector,
    getOpYearCount,
    getOpYearCountselector
} from '../../../../Redux-Slice/dashboard/sliceDashBoard';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { LineChart } from '@mui/x-charts';

const YearWiseAnalysis = () => {

    const dispatch = useDispatch();
    const [xvalue, setXvalue] = useState([])
    const [yvalue, setYvalue] = useState([])
    const [yvalue1, setYvalue1] = useState([])
    const [flag, setFlag] = useState(0)
    var startDate = moment('2014-01-01').format('YYYY-MM-DD')
    var endDate = moment(new Date()).format('YYYY-MM-DD')

    const postdata = useMemo(() => {
        return {
            from: startDate,
            to: endDate
        }
    }, [startDate, endDate])

    useEffect(() => {
        dispatch(getOpYearCount(postdata))
        dispatch(getIpYearCount(postdata))
    }, [postdata, dispatch])

    const opview = useSelector(getOpYearCountselector)
    const ipview = useSelector(getIpYearCountselector)

    useEffect(() => {
        if (opview.length !== 0 && ipview.length !== 0) {
            const x = opview?.map((val) => val.year.toString())
            setXvalue(x)
            const y = opview?.map((val) => val.count)
            setYvalue(y)
            const yy = ipview?.map((val) => val.count)
            setYvalue1(yy)
            setFlag(1)
        }

    }, [opview, ipview])

    return (
        <Box>
            {flag === 1 ?
                <LineChart
                    sx={{ pt: .5 }}
                    width={1600}
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

export default memo(YearWiseAnalysis)