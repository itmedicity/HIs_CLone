import React, { useEffect, useState } from 'react'
import { axiosinstance } from '../../../../../controllers/AxiosConfig';

const UserGroupComp = ({ value, setValue }) => {
    const [groupList, setGroupList] = useState([])

    useEffect(() => {
        const getdata = async () => {
            const result = await axiosinstance.get('/usergroup/active')
            const { success, message, data } = result.data
            if (success === 2) {
                setGroupList(data);
            }
            else {
                setGroupList(0)
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
                width: 200,
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
                groupList && groupList.map((val, ind) => {
                    return <option key={ind} value={val.user_group_id}>{val.user_group_name}</option>
                })
            }
        </select>
    )
}

export default UserGroupComp
