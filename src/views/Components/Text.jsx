// @ts-nocheck
import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'

const Text = () => {

    const [data, setData] = useState(null);

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const name = urlParams.get('name');
        const age = urlParams.get('age');
        setData({ name, age });
    }, []);

    return (
        <Box sx={{
            display: 'flex',
            flex: 1
        }} >
            {/* <div>
                <p>Name: {data ? data.name : ''}</p>
                <p>Age: {data ? data.age : ''}</p>
            </div> */}
            cccccc
        </Box>
    )
}

export default Text