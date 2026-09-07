import {axiosinstance} from "../../../../../../controllers/AxiosConfig";

export const GET_QMT_OraUsers = async () => {
  const res = await axiosinstance.get("/oraUser");
  return res.data;
};
