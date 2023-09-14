import { Box } from '@mui/material'
import React, { memo, useEffect, useMemo, useState } from 'react'
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { LineChart } from '@mui/x-charts';
import { getIpCurrentYearCount, getIpCurrentYearselector, getOpCurrentYearCount, getOpCurrentYearselector } from '../../../../Redux-Slice/dashboard/sliceDashBoard';
import { endOfYear, startOfYear } from 'date-fns';

const CurrentYearAnalysis = () => {
    const dispatch = useDispatch();
    // const [xvalue, setXvalue] = useState([])
    const [yvalue, setYvalue] = useState([])
    const [yvalue1, setYvalue1] = useState([])
    const [flag, setFlag] = useState(0)
    const [xvalue] = useState(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'])

    const postdata = useMemo(() => {
        return {
            from: moment(startOfYear(new Date())).format('YYYY-MM-DD'),
            to: moment(endOfYear(new Date())).format('YYYY-MM-DD')
        }
    }, [])

    useEffect(() => {
        dispatch(getOpCurrentYearCount(postdata))
        dispatch(getIpCurrentYearCount(postdata))
    }, [postdata, dispatch])

    const opdata = useSelector(getOpCurrentYearselector)
    const ipdata = useSelector(getIpCurrentYearselector)

    useEffect(() => {
        if (opdata.length !== 0 && ipdata.length !== 0) {

            const array = xvalue?.map(item1 => {
                const newarray = opdata.find(item2 => moment(item2.month).format('MMM') === item1);
                const count = newarray ? newarray.count : 0;
                return { month: item1, count: count };
            });

            const array1 = xvalue?.map(item1 => {
                const newarray1 = ipdata.find(item2 => moment(item2.month).format('MMM') === item1);
                const count = newarray1 ? newarray1.count : 0;
                return { month: item1, count: count };
            });
            const y = array?.map((val) => val.count)
            setYvalue(y)
            const y1 = array1?.map((val) => val.count)
            setYvalue1(y1)
            setFlag(1)

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
export default memo(CurrentYearAnalysis)