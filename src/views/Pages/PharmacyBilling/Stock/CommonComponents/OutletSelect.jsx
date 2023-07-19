import React, { useEffect, useState } from 'react'
import { axiosinstance } from '../../../../../controllers/AxiosConfig'
import { FormControl, MenuItem, Select } from '@mui/material'

const OutletSelect = ({ value, setValue }) => {
    const [pharmacy, setPharmacy] = useState([])

    useEffect(() => {
        const getdata = async () => {
            const result = await axiosinstance.get('/storerequest/select')
            const { success, message, data } = result.data
            if (success === 2) {
                setPharmacy(data);
            }
            else {
                setPharmacy([])
            }
        }
        getdata()
    }, [])
    return (
        <FormControl fullWidth>

            <Select
                variant="outlined"

                style={{
                    height: 40,
                    paddingBottom: 1,
                    width: 330,
                    BorderAllRounded: 1,
                    fontSize: '15px',
                    fontFamily: 'Arial',
                    borderRadius: '3px'
                }}
                name="value"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            >
                <MenuItem value={0}>--Select-- </MenuItem>
                {
                    pharmacy && pharmacy.map((val, ind) => {
                        return <MenuItem key={ind} value={val.ou_code}>{val.ouc_desc}</MenuItem>
                    })
                }
            </Select>
        </FormControl >
    )
}

export default OutletSelect