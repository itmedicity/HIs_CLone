import React, {memo, useEffect, useMemo, useState} from "react";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog from "@mui/joy/ModalDialog";
import Typography from "@mui/joy/Typography";
import {Box, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow} from "@mui/material";
import MenuButton from "../../../Components/MenuButton";
import ReportHeader from "../../../../../Components/ReportHeader";
import {useSearchParams} from "react-router-dom";
import {GET_TMCH_AdvanceCollection} from "../../api/tmch.api";
import {useQuery} from "@tanstack/react-query";

const AdvanceCollectionTmch = () => {
  const [searchParmas] = useSearchParams();
  const from = searchParmas.get("from");
  const to = searchParmas.get("to");
  const [ipList, setIpList] = useState([]);

  useEffect(() => {
    const data = sessionStorage.getItem("GetTmchAdvanceCollectionIpList");
    if (data) {
      const parsed = JSON.parse(data);
      setIpList(parsed);
      // console.log(parsed);
    }
  }, []);

  const {data, isLoading, isError, error} = useQuery({
    queryKey: ["Get_TMCH_AdvanceCollection", from, to, ipList],
    queryFn: async () => GET_TMCH_AdvanceCollection({from, to, ipList}),
    enabled: !!from && !!to && !!ipList,
  });

  const rows = data?.data || [];

  const totals = useMemo(() => {
    return rows.reduce(
      (acc, row) => {
        acc.AMT += row.AMT || 0;
        return acc;
      },
      {
        AMT: 0,
      },
    );
  }, [rows]);

  if (isLoading) return <div style={{display: "flex", flex: 1, height: "100vh", background: "white"}}>.</div>;
  if (isError) return <h1>{error?.message}</h1>;

  const newArray = rows?.map((e, idx) => (
    <TableRow key={idx}>
      <TableCell padding="none" align="right" sx={{border: 1, fontSize: "12px", borderColor: "#4f4949", lineHeight: "16px"}}>
        {idx + 1}
      </TableCell>
      <TableCell padding="none" align="left" sx={{border: 1, fontSize: "12px", borderColor: "#4f4949", lineHeight: "16px"}}>
        {e.PTC_PTNAME?.toLowerCase()}
      </TableCell>
      <TableCell padding="none" align="left" sx={{border: 1, fontSize: "12px", borderColor: "#4f4949", lineHeight: "16px"}}>
        {e.PT_NO}
      </TableCell>
      <TableCell padding="none" align="left" sx={{border: 1, fontSize: "12px", borderColor: "#4f4949", lineHeight: "16px"}}>
        {e.AR_NO}
      </TableCell>
      <TableCell padding="none" align="right" sx={{border: 1, fontSize: "12px", borderColor: "#4f4949", lineHeight: "16px"}}>
        {e.AMT?.toLocaleString("en-US", {minimumFractionDigits: 2})}
      </TableCell>
      <TableCell padding="none" align="left" sx={{border: 1, fontSize: "12px", borderColor: "#4f4949", lineHeight: "16px"}}>
        {e.USC_NAME?.toLowerCase()}
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
        <ReportHeader data={{from, to}} name="Advance Collection" hosName={"TRAVANCORE MEDICAL COLLEGE & HOSPITAL"} disable={true} />
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
                    Receipt No
                  </TableCell>
                  <TableCell padding="none" size="small" align="right" sx={{fontWeight: "bolder", fontSize: "12px", borderRight: 1, borderColor: "#bbd8ff"}}>
                    Amount
                  </TableCell>
                  <TableCell padding="none" size="small" align="left" sx={{fontWeight: "bolder", fontSize: "12px", borderRight: 1, borderColor: "#bbd8ff"}}>
                    User
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{newArray}</TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell align="right" sx={{width: "2%", border: 1, borderColor: "#2d2626"}} />
                  <TableCell
                    align="left"
                    sx={{fontSize: "12px", fontWeight: 700, border: 1, borderColor: "#2d2626", color: "black", fontFamily: "Tahoma,Verdana, Geneva, sans-serif", lineHeight: "16px"}}
                  >
                    Total Amount
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
                    {totals.AMT.toLocaleString("en-US", {minimumFractionDigits: 2})}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{fontSize: "12px", fontWeight: 700, border: 1, borderColor: "#2d2626", color: "black", fontFamily: "Tahoma,Verdana, Geneva, sans-serif", lineHeight: "16px"}}
                  >
                    {/* {totals.TAXAMT.toLocaleString("en-US", {minimumFractionDigits: 2})} */}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Box>
      </Paper>
    </div>
  );
};

export default AdvanceCollectionTmch;
