import React, { useEffect, useState, useMemo } from 'react'
import { axiosinstance } from '../../../../../controllers/AxiosConfig';

const MenuGroupComp = ({ value, setValue, module }) => {
    const [menuGroupList, setMenuGroupList] = useState([])
    const postdata = useMemo(() => {
        return {
            module_id: module,
        }
    }, [module])

    useEffect(() => {
        const getdata = async () => {
            const result = await axiosinstance.post('/menugroups/selectmenu', postdata)
            const { success, data } = result.data
            if (success === 2) {
                setMenuGroupList(data);
            }
            else {
                setMenuGroupList([])
            }
        }
        getdata()
    }, [postdata])

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
                menuGroupList && menuGroupList.map((val, ind) => {
                    return <option key={ind} value={val.menugroup_id}>{val.menugroup_name}</option>
                })
            }
        </select>
    )
}

export default MenuGroupComp
