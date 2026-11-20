import {axiosinstance} from "../../../../../../controllers/AxiosConfig";

export const GET_GROUPED_OraUsers = async () => {
  const res = await axiosinstance.get("/oraUser");
  return res.data;
};
