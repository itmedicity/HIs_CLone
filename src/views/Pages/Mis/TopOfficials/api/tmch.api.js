import {axiosinstance} from "../../../../../controllers/AxiosConfig";

// TMCH

export const GET_CreditInsuranceBillCollection = async ({from, to, ipList}) => {
  const res = await axiosinstance.post("/getTmch/getCreditInsuranceBillCollection", {from, to, ipList});
  return res.data;
};

export const GET_CreditInsuranceBills = async ({from, to, ipList}) => {
  const res = await axiosinstance.post("/getTmch/getCreditInsuranceBills", {from, to, ipList});
  return res.data;
};

export const GET_TMCH_UnsettledAmountBills = async ({from, to, ipList}) => {
  const res = await axiosinstance.post("/getTmch/getUnsettledAmountBills", {from, to, ipList});
  return res.data;
};

export const GET_TMCH_AdvanceCollection = async ({from, to, ipList}) => {
  const res = await axiosinstance.post("/getTmch/getAdvanceCollection", {from, to, ipList});
  return res.data;
};

export const GET_TMCH_ProcedureDetails = async ({from, to, ipList}) => {
  const res = await axiosinstance.post("/getTmch/getProcedureDetails", {from, to, ipList});
  return res.data;
};

// TSSH & GROUPED

export const GET_tssh_CreditInsuranceBillCollection = async ({from, to, ipList}) => {
  const res = await axiosinstance.post("/getTssh/getTsshCreditInsuranceBillCollection", {from, to, ipList});
  return res.data;
};

export const GET_tssh_CreditInsuranceBills = async ({from, to, ipList}) => {
  const res = await axiosinstance.post("/getTssh/getTsshCreditInsuranceBills", {from, to, ipList});
  return res.data;
};

export const GET_tssh_AdvanceCollection = async ({from, to, ipList}) => {
  const res = await axiosinstance.post("/getTssh/getTssh_AdvanceCollection", {from, to, ipList});
  return res.data;
};

export const GET_tssh_UnsettledAmountBills = async ({from, to, ipList}) => {
  const res = await axiosinstance.post("/getTssh/getTssh_UnsettledAmount", {from, to, ipList});
  return res.data;
};

export const GET_tssh_ProcedureDetails = async ({from, to, ipList}) => {
  const res = await axiosinstance.post("/getTssh/getTssh_ProcedureDetails", {from, to, ipList});
  return res.data;
};

// QMT

export const GET_qmt_CreditInsuranceBillCollection = async ({from, to}) => {
  const res = await axiosinstance.post("/getQmt/getQmtCreditInsuranceBillCollection", {from, to});
  return res.data;
};

export const GET_qmt_CreditInsuranceBills = async ({from, to}) => {
  const res = await axiosinstance.post("/getQmt/getQmtCreditInsuranceBills", {from, to});
  return res.data;
};

export const GET_qmt_UnsettledAmount = async ({from, to}) => {
  const res = await axiosinstance.post("/getQmt/getQmtUnsettledAmount", {from, to});
  return res.data;
};

export const GET_qmt_AdvanceCollection = async ({from, to}) => {
  const res = await axiosinstance.post("/getQmt/getQmtAdvanceCollection", {from, to});
  return res.data;
};

export const GET_qmt_ProcedureDetails = async ({from, to, subGroupName}) => {
  console.log(subGroupName + " section called");

  const endpoints = {
    BED: "/incomeDetl/bedIncome",
    ROOM: "/incomeDetl/roomRentIncome",
    NS: "/incomeDetl/nsIncome",
    OTHERS: "/incomeDetl/otherIncome",
    CONSULTING: "/incomeDetl/consultingIncome",
    THEATRE: "/incomeDetl/theaterIncome",
    OPERATION: "/incomeDetl/surgeonIncome",
    ANESTHESIA: "/incomeDetl/anesthetiaIncome",
    CARDIOLOGY: "/incomeDetl/cardiologyIncome",
    DISPOSIBLE: "/incomeDetl/disPosibleItemIncome",
    ICU: "/incomeDetl/icuIncome",
    "ICU PROC": "/incomeDetl/icuprocedureIncome",
    RADIOLOGY: "/incomeDetl/radiologyIncome",
    LAB: "/incomeDetl/laboratoryIncome",
    MRI: "/incomeDetl/mriIncome",
    DIET: "/incomeDetl/dietIncome",
  };

  const endpoint = endpoints[subGroupName];
  if (!endpoint) {
    return;
  }

  const res = await axiosinstance.post(`${endpoint}`, {from, to});
  return res.data;
};
