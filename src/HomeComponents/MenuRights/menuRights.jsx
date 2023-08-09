
import { axiosinstance } from "../../controllers/AxiosConfig";

//Get login employee No
export const usergroupid = () => {
    const userinfo = localStorage.getItem('usrCred');
    const usergroup = userinfo ? JSON.parse(localStorage.getItem('usrCred')).usergroup : 0;
    return usergroup;
};

export const getMenuSlno = async (user) => {
    const result = await axiosinstance.get(`/employee/getmenu/${user}`)
    const { success, data } = result.data
    if (success === 1) {
        return data;
    }

}

