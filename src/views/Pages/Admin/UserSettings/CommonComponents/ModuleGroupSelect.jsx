import React, { useEffect, useState } from 'react'
import { axiosinstance } from '../../../../../controllers/AxiosConfig';

const ModuleGroupComp = ({ value, setValue }) => {

    const [moduleList, setModuleList] = useState([])

    useEffect(() => {
        const getdata = async () => {
            const result = await axiosinstance.get('/menugroups/selectmodule')
            const { success, data } = result.data
            if (success === 2) {
                setModuleList(data);
            } else {
                setModuleList([])
            }
        }
        getdata()
    }, [])

    return (
        <select
            variant="outlined"

            style={{
                height: 25,
                paddingBottom: 1,
                width: 210,
                BorderAllRounded: 1,
                fontSize: '12px',
                fontFamily: 'Arial',
                borderRadius: '3px'
            }}
            name="value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
        >
            < option value={0}>--Select--</option>
            {
                moduleList && moduleList.map((val, ind) => {
                    return <option key={ind} value={val.module_id}>{val.module_name}</option>
                })
            }
        </select>
    )
}

export default ModuleGroupComp
