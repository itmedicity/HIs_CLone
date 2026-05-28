import React, {memo, useEffect, useMemo, useState} from "react";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog from "@mui/joy/ModalDialog";
import Typography from "@mui/joy/Typography";
import {Box, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow} from "@mui/material";
import MenuButton from "../../../Components/MenuButton";
import ReportHeader from "../../../../../Components/ReportHeader";
import {useSearchParams} from "react-router-dom";
import {GET_tssh_CreditInsuranceBills} from "../../api/tmch.api";
import {useQuery} from "@tanstack/react-query";

const CreditInsuranceBill = () => {
  const [searchParmas] = useSearchParams();
  const from = searchParmas.get("from");
  const to = searchParmas.get("to");
  const [ipList, setIpList] = useState([]);

  useEffect(() => {
    const data = sessionStorage.getItem("CreditInsuranceBillTssh");
    if (data) {
      const parsed = JSON.parse(data);
      setIpList(parsed);
      // console.log(parsed);
    }
  }, []);

  const {data, isLoading, isError, error} = useQuery({
    queryKey: ["TsshCreditInsurBillsModal", from, to, ipList],
    queryFn: async () => GET_tssh_CreditInsuranceBills({from, to, ipList}),
    enabled: !!from && !!to && !!ipList,
  });

  const rows = data?.data || [];

  const totals = useMemo(() => {
    return rows.reduce(
      (acc, row) => {
        acc.TAXAMT += row.TAXAMT || 0;
        acc.AMT += row.AMT || 0;
        return acc;
      },
      {
        TAXAMT: 0,
        AMT: 0,
      },
    );
  }, [rows]);

  console.log(rows);

  if (isLoading) return <div style={{display: "flex", flex: 1, height: "100vh", background: "white"}}>.</div>;
  if (isError) return <h1>{error?.message}</h1>;

  const newArray = rows?.map((e, idx) => (
    <TableRow key={idx}>
      <TableCell padding="none" align="right" sx={{border: 1, fontSize: "12px", borderColor: "#4f4949", lineHeight: "16px"}}>
        {idx + 1}
      </TableCell>
      <TableCell padding="none" align="left" sx={{border: 1, fontSize: "12px", borderColor: "#4f4949", lineHeight: "16px"}}>
        {e.PTNAME}
      </TableCell>
      <TableCell padding="none" align="left" sx={{border: 1, fontSize: "12px", borderColor: "#4f4949", lineHeight: "16px"}}>
        {e.PTNO}
      </TableCell>
      <TableCell padding="none" align="left" sx={{border: 1, fontSize: "12px", borderColor: "#4f4949", lineHeight: "16px"}}>
        {e.BILLNO}
      </TableCell>
      <TableCell padding="none" align="right" sx={{border: 1, fontSize: "12px", borderColor: "#4f4949", lineHeight: "16px"}}>
        {e.TAXAMT?.toLocaleString("en-US", {minimumFractionDigits: 2})}
      </TableCell>
      <TableCell padding="none" align="right" sx={{border: 1, fontSize: "12px", borderColor: "#4f4949", lineHeight: "16px"}}>
        {e.AMT?.toLocaleString("en-US", {minimumFractionDigits: 2})}
      </TableCell>
      <TableCell padding="none" align="left" sx={{border: 1, fontSize: "12px", borderColor: "#4f4949", lineHeight: "16px"}}>
        {e.CUSTOMER}
      </TableCell>
      <TableCell padding="none" align="left" sx={{border: 1, fontSize: "12px", borderColor: "#4f4949", lineHeight: "16px"}}>
        {e.USERNAME}
      </TableCell>
    </TableRow>
  ));

  return (
    <div style={{display: "flex", flexDirection: "column", height: "100%", backgroundColor: "lightgray"}}>
      <div style={{display: "flex", justifyContent: "flex-end", padding: "10px", paddingRight: "30px", paddingBottom: "30px"}}>
        <MenuButton layOutClose={""} navigateTo={""} />
      </div>
      <Paper
        variant="outlined"
        sx={{
          marginLeft: 5,
          marginRight: 5,
          border: 1,
          borderRadius: 0,
          borderColor: "black",
          boxShadow: 5,
        }}
      >
        <ReportHeader data={{from, to}} name="Credit/Insu. Bill" hosName={"TRAVANCORE MEDICAL COLLEGE & HOSPITAL"} disable={true} />
        <Box
          sx={{
            overflow: "auto",
            paddingBottom: "15px",
            borderBottom: 1,
            marginBottom: 8,
          }}
        >
          <TableContainer component={Box}>
            <Table padding="none" sx={{}} size="small" aria-label="a dense table">
              <TableHead
                sx={{
                  backgroundColor: "#94C5F7",
                }}
              >
                <TableRow
                  sx={{
                    p: 0,
                    m: 0,
                    borderBottomColor: "black",
                    height: "40px",
                  }}
                >
                  <TableCell padding="none" size="small" align="right" sx={{fontWeight: "bolder", fontSize: "12px", borderRight: 1, borderColor: "#bbd8ff"}}>
                    #
                  </TableCell>
                  <TableCell padding="none" size="small" align="left" sx={{fontWeight: "bolder", fontSize: "12px", borderRight: 1, borderColor: "#bbd8ff"}}>
                    Patient Name
                  </TableCell>
                  <TableCell padding="none" size="small" align="left" sx={{fontWeight: "bolder", fontSize: "12px", borderRight: 1, borderColor: "#bbd8ff"}}>
                    Pt No
                  </TableCell>
                  <TableCell padding="none" size="small" align="left" sx={{fontWeight: "bolder", fontSize: "12px", borderRight: 1, borderColor: "#bbd8ff"}}>
                    Bill No
                  </TableCell>
                  <TableCell padding="none" size="small" align="right" sx={{fontWeight: "bolder", fontSize: "12px", borderRight: 1, borderColor: "#bbd8ff"}}>
                    Tax
                  </TableCell>
                  <TableCell padding="none" size="small" align="right" sx={{fontWeight: "bolder", fontSize: "12px", borderRight: 1, borderColor: "#bbd8ff"}}>
                    Amount
                  </TableCell>
                  <TableCell padding="none" size="small" align="left" sx={{fontWeight: "bolder", fontSize: "12px", borderRight: 1, borderColor: "#bbd8ff"}}>
                    Customer
                  </TableCell>
                  <TableCell padding="none" size="small" align="left" sx={{fontWeight: "bolder", fontSize: "12px", borderRight: 1, borderColor: "#bbd8ff"}}>
                    User
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow sx={{height: "30px"}}>
                  <TableCell align="right" sx={{background: "#C6DFF8", fontWeight: "bolder", fontSize: "12px", pr: 2}}></TableCell>
                  <TableCell align="left" sx={{background: "#C6DFF8", fontWeight: "bolder", fontSize: "12px", pr: 2}}>
                    Billing
                  </TableCell>
                  <TableCell align="right" sx={{background: "#C6DFF8", fontWeight: "bolder", fontSize: "12px", pr: 2}}></TableCell>
                  <TableCell align="right" sx={{background: "#C6DFF8", fontWeight: "bolder", fontSize: "12px", pr: 2}}></TableCell>
                  <TableCell align="right" sx={{background: "#C6DFF8", fontWeight: "bolder", fontSize: "12px", pr: 2}}></TableCell>
                  <TableCell align="right" sx={{background: "#C6DFF8", fontWeight: "bolder", fontSize: "12px", pr: 2}}></TableCell>
                  <TableCell align="right" sx={{background: "#C6DFF8", fontWeight: "bolder", fontSize: "12px", pr: 2}}></TableCell>
                  <TableCell align="right" sx={{background: "#C6DFF8", fontWeight: "bolder", fontSize: "12px", pr: 2}}></TableCell>
                </TableRow>
                {newArray}
              </TableBody>
              <TableFooter>
                <TableRow style={{height: "35px", backgroundColor: "#94C5F7"}}>
                  <TableCell align="right" sx={{width: "2%", borderRight: 1, borderColor: "#bbd8ff"}} />
                  <TableCell align="left" sx={{fontSize: "12px", fontWeight: "bold", color: "black", borderRight: 1, borderColor: "#bbd8ff", fontFamily: "Tahoma,Verdana, Geneva, sans-serif"}}>
                    Billing Total
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{fontSize: "12px", borderRight: 1, borderColor: "#bbd8ff", fontWeight: 700, color: "black", fontFamily: "Tahoma,Verdana, Geneva, sans-serif"}}
                  ></TableCell>
                  <TableCell
                    align="right"
                    sx={{fontSize: "12px", fontWeight: 700, color: "black", borderRight: 1, borderColor: "#bbd8ff", fontFamily: "Tahoma,Verdana, Geneva, sans-serif"}}
                  ></TableCell>
                  <TableCell align="right" sx={{fontSize: "12px", fontWeight: 700, color: "black", borderRight: 1, borderColor: "#bbd8ff", fontFamily: "Tahoma,Verdana, Geneva, sans-serif"}}>
                    {totals.TAXAMT.toLocaleString("en-US", {minimumFractionDigits: 2})}
                  </TableCell>
                  <TableCell align="right" sx={{fontSize: "12px", fontWeight: 700, color: "black", borderRight: 1, borderColor: "#bbd8ff", fontFamily: "Tahoma,Verdana, Geneva, sans-serif"}}>
                    {totals.AMT.toLocaleString("en-US", {minimumFractionDigits: 2})}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{fontSize: "12px", fontWeight: 700, color: "black", borderRight: 1, borderColor: "#bbd8ff", fontFamily: "Tahoma,Verdana, Geneva, sans-serif"}}
                  ></TableCell>
                  <TableCell sx={{borderRight: 1, borderColor: "#bbd8ff"}} />
                </TableRow>
                <TableRow>
                  <TableCell align="right" sx={{width: "2%", border: 1, borderColor: "#2d2626"}} />
                  <TableCell
                    align="left"
                    sx={{fontSize: "12px", fontWeight: 700, border: 1, borderColor: "#2d2626", color: "black", fontFamily: "Tahoma,Verdana, Geneva, sans-serif", lineHeight: "16px"}}
                  >
                    Grand Total
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{fontSize: "12px", fontWeight: 500, border: 1, borderColor: "#2d2626", color: "black", fontFamily: "Tahoma,Verdana, Geneva, sans-serif", lineHeight: "16px"}}
                  ></TableCell>
                  <TableCell
                    align="right"
                    sx={{fontSize: "12px", fontWeight: 500, border: 1, borderColor: "#2d2626", color: "black", fontFamily: "Tahoma,Verdana, Geneva, sans-serif", lineHeight: "16px"}}
                  ></TableCell>
                  <TableCell
                    align="right"
                    sx={{fontSize: "12px", fontWeight: 700, border: 1, borderColor: "#2d2626", color: "black", fontFamily: "Tahoma,Verdana, Geneva, sans-serif", lineHeight: "16px"}}
                  >
                    {totals.TAXAMT.toLocaleString("en-US", {minimumFractionDigits: 2})}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{fontSize: "12px", fontWeight: 700, border: 1, borderColor: "#2d2626", color: "black", fontFamily: "Tahoma,Verdana, Geneva, sans-serif", lineHeight: "16px"}}
                  >
                    {totals.AMT.toLocaleString("en-US", {minimumFractionDigits: 2})}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{fontSize: "12px", fontWeight: 500, border: 1, borderColor: "#2d2626", color: "black", fontFamily: "Tahoma,Verdana, Geneva, sans-serif", lineHeight: "16px"}}
                  ></TableCell>
                  <TableCell sx={{border: 1, borderColor: "#2d2626"}} />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Box>
      </Paper>
    </div>
  );
};

export default CreditInsuranceBill;
