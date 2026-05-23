import {axiosinstance} from "../../../../../controllers/AxiosConfig";

export const GET_CreditInsuranceBillCollection = async ({from, to, ipList}) => {
  const res = await axiosinstance.post("/getTmch/getCreditInsuranceBillCollection", {from, to, ipList});
  return res.data;
};

export const GET_CreditInsuranceBills = async ({from, to, ipList}) => {
  const res = await axiosinstance.post("/getTmch/getCreditInsuranceBills", {from, to, ipList});
  return res.data;
};

export const GET_tssh_CreditInsuranceBillCollection = async ({from, to}) => {
  const res = await axiosinstance.post("/getTssh/getTsshCreditInsuranceBillCollection", {from, to});
  return res.data;
};

export const GET_tssh_CreditInsuranceBills = async ({from, to}) => {
  const res = await axiosinstance.post("/getTssh/getTsshCreditInsuranceBills", {from, to});
  return res.data;
};

export const GET_qmt_CreditInsuranceBillCollection = async ({from, to}) => {
  const res = await axiosinstance.post("/getQmt/getQmtCreditInsuranceBillCollection", {from, to});
  return res.data;
};

export const GET_qmt_CreditInsuranceBills = async ({from, to}) => {
  const res = await axiosinstance.post("/getQmt/getQmtCreditInsuranceBills", {from, to});
  return res.data;
};
