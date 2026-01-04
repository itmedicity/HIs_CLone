// @ts-nocheck
import React, {memo, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ReportHeader from "../../../Components/ReportHeader";
import LightBlueRow from "./LightBlueRow";
import WhiteRow from "./WhiteRow";
import WhiteRowTotal from "./WhiteRowTotal";
import "./Style.css";
import ReportBottomMenu from "../Components/ReportBottomMenu";
import MenuButton from "../Components/MenuButton";
import moment from "moment";

const initialState = {
  bed: 0.0,
  ns: 0.0,
  room: 0.0,
  others: 0.0,
  consulting: 0.0,
  anesthesia: 0.0,
  operation: 0.0,
  theater: 0.0,
  theaterInstr: 0.0,
  cardiology: 0.0,
  disposible: 0.0,
  icu: 0.0,
  icuProc: 0.0,
  radiology: 0.0,
  laboratory: 0.0,
  bloodBank: 0.0,
  mri: 0.0,
  diet: 0.0,
  pharmacy: 0.0,
  pharDiscount: 0.0,
  pharTax: 0.0,
  PharGross: 0.0,
  ipConsolidatedDiscount: 0.0,
  pettyCash: 0.0,
  TaxAmount: 0.0,
  collectionAgainSale: 0.0,
  AdvanceSettled: 0.0,
  creditIsuranceBill: 0.0,
  unsettledAmount: 0.0,
  roundOff: 0.0,
  grandcollection: 0.0,
  grandNetAmnt: 0.0,
  grantTax: 0.0,
  grantDiscount: 0.0,
  grandGrossAmnt: 0.0,
  creditInsurnaceBillDiscount: 0.0,
  creditInsuranceWriteOff: 0.0,
  complimentary: 0.0,
  ipPreviousDayDiscount: 0.0,
  advanceRefund: 0.0,
  advanceCollection: 0.0,
  creditInsuranceBillCollection: 0.0,
  ipPreviousDayCollection: 0.0,
  TotalCounterCollection: 0.0,
  General: 0.0,
  OtherType: 0.0,
  discountTotal: 0.0,
};

const IncomeReports = () => {
  const {state} = useLocation();
  const [reportData, setReportData] = useState(initialState);

  const headerDate = {
    from: moment(state?.from, "YYYY-MM-DD").format("DD/MM/YYYY HH:mm:ss"),
    to: moment(state?.to, "YYYY-MM-DD").format("DD/MM/YYYY HH:mm:ss"),
  };

  useEffect(() => {
    try {
      const incomeData = state?.data[0];
      if (!incomeData) return;
      setReportData({
        bed: incomeData?.bed,
        ns: incomeData?.ns,
        room: incomeData?.room,
        others: incomeData?.others,
        consulting: incomeData?.consulting,
        anesthesia: incomeData?.anesthesia,
        operation: incomeData?.operation,
        theater: incomeData?.theater,
        theaterInstr: incomeData?.theaterInstment,
        cardiology: incomeData?.cardiology,
        disposible: incomeData?.disposible,
        icu: incomeData?.icu,
        icuProc: incomeData?.icuProc,
        radiology: incomeData?.radiology,
        laboratory: incomeData?.lab,
        bloodBank: incomeData?.bloodbank,
        mri: incomeData?.mri,
        diet: incomeData?.diet,
        pharmacy: incomeData?.pha_sale,
        pharDiscount: incomeData?.pha_discount,
        pharTax: incomeData?.pha_tax,
        PharGross: incomeData?.pha_gross,
        ipConsolidatedDiscount: incomeData?.ip_consolidate_discount,
        pettyCash: incomeData?.pettycash,
        TaxAmount: incomeData?.tax,
        collectionAgainSale: incomeData?.collectionagainsale,
        AdvanceSettled: incomeData?.advanceSettled,
        creditIsuranceBill: incomeData?.creditinsurancebill,
        unsettledAmount: incomeData?.unsettledAmount,
        roundOff: incomeData?.roundOff,
        grandcollection: incomeData?.gra_collection,
        grandNetAmnt: incomeData?.gra_net,
        grantTax: incomeData?.gra_tax,
        grantDiscount: incomeData?.gra_discount,
        grandGrossAmnt: incomeData?.gra_gross,
        creditInsurnaceBillDiscount: incomeData?.insuranceBillDisct,
        creditInsuranceWriteOff: incomeData?.insuranceWriteOff,
        complimentary: incomeData?.Complimentary,
        ipPreviousDayDiscount: incomeData?.previousDayDiscount,
        advanceRefund: incomeData?.advanceRefund,
        advanceCollection: incomeData?.advanceCollction,
        creditInsuranceBillCollection: incomeData?.insuranceBillCollection,
        ipPreviousDayCollection: incomeData?.previousDayCollection,
        TotalCounterCollection: incomeData?.counterCollection,
        General: incomeData?.general,
        OtherType: incomeData?.otherType,
        discountTotal: incomeData?.discountTotal,
      });
    } catch (error) {
      console.error("Error retrieving data from state:", error);
      return;
    }
  }, [state]);

  const {
    bed,
    ns,
    room,
    others,
    consulting,
    anesthesia,
    operation,
    theater,
    theaterInstr,
    cardiology,
    disposible,
    icu,
    icuProc,
    radiology,
    laboratory,
    bloodBank,
    mri,
    diet,
    pharmacy,
    pharDiscount,
    pharTax,
    PharGross,
    ipConsolidatedDiscount,
    pettyCash,
    TaxAmount,
    collectionAgainSale,
    AdvanceSettled,
    creditIsuranceBill,
    unsettledAmount,
    roundOff,
    grandcollection,
    grandNetAmnt,
    grantTax,
    grantDiscount,
    grandGrossAmnt,
    creditInsurnaceBillDiscount,
    creditInsuranceWriteOff,
    complimentary,
    ipPreviousDayDiscount,
    advanceRefund,
    advanceCollection,
    creditInsuranceBillCollection,
    ipPreviousDayCollection,
    TotalCounterCollection,
    General,
    OtherType,
    discountTotal,
  } = reportData;

  const misData = {
    Bed: [
      {groupName: "Bed", net: bed, tax: 0.0, discount: 0.0, gross: bed},
      {groupName: "Room", net: room, tax: 0.0, discount: 0.0, gross: room},
      {groupName: "Ns", net: ns, tax: 0.0, discount: 0.0, gross: ns},
    ],
    Others: [{groupName: "Others", net: others, tax: 0.0, discount: 0.0, gross: others}],
    Consulting: [{groupName: "Consulting", net: consulting, tax: 0.0, discount: 0.0, gross: consulting}],
    Surgery: [
      {groupName: "Anesthesia", net: anesthesia, tax: 0.0, discount: 0.0, gross: anesthesia},
      {groupName: "Operation", net: operation, tax: 0.0, discount: 0.0, gross: operation},
      {groupName: "Theater  Charge", net: theater, tax: 0.0, discount: 0.0, gross: theater},
      {groupName: "Theatre Instrument", net: theaterInstr, tax: 0.0, discount: 0.0, gross: theaterInstr},
    ],
    Cardiology: [{groupName: "Cardiology", net: cardiology, tax: 0.0, discount: 0.0, gross: cardiology}],
    Disposible: [{groupName: "Disposible", net: disposible, tax: 0.0, discount: 0.0, gross: disposible}],
    Icu: [
      {groupName: "Icu", net: icu, tax: 0.0, discount: 0.0, gross: icu},
      {groupName: "Icu Proc", net: icuProc, tax: 0.0, discount: 0.0, gross: icuProc},
    ],
    Radiology: [{groupName: "Radiology", net: radiology, tax: 0.0, discount: 0.0, gross: radiology}],
    Lab: [
      {groupName: "Laboratory", net: laboratory, tax: 0.0, discount: 0.0, gross: laboratory},
      {groupName: "BloodBank", net: bloodBank, tax: 0.0, discount: 0.0, gross: bloodBank},
    ],
    Mri: [{groupName: "Mri", net: mri, tax: 0.0, discount: 0.0, gross: mri}],
    Diet: [{groupName: "Diet", net: diet, tax: 0.0, discount: 0.0, gross: diet}],
    pharmacy: {groupName: "Pharmacy Medicine Sale", net: pharmacy, tax: pharTax, discount: pharDiscount, gross: PharGross},
    ipConsolidatedAmount: {groupName: "Ip Consolidate Discount", net: ipConsolidatedDiscount, discount: ipConsolidatedDiscount},
    PettyCash: {groupName: "Petty Cash Amount", net: pettyCash},
    taxAmount: {groupName: "Tax Amount", net: TaxAmount},
    collectionAgainSale: {groupName: "Collection Against Sales (A)", net: collectionAgainSale},
    advanceSettled: {groupName: "Advance Settled", net: AdvanceSettled},
    creditInsuranceBill: {groupName: "Credit/Insurance Bill", net: creditIsuranceBill},
    unsettledAmnt: {groupName: "UnSettled Amount", net: unsettledAmount},
    roundOff: {groupName: "Round Off", net: roundOff},
    grandTotal: {groupName: "Grand Total", collection: grandcollection, net: grandNetAmnt, Tax: grantTax, discount: grantDiscount, Gross: grandGrossAmnt},
    creditInsurance: {groupName: "Credit/Insurance Bill Discount", net: creditInsurnaceBillDiscount},
    writeoff: {groupName: "Credit/Insurance WriteOff Amount", net: creditInsuranceWriteOff},
    complimentary: {groupName: "Complimentary", net: complimentary},
    ipPreviousdayDiscount: {groupName: "IP Previous Day's Discount", net: ipPreviousDayDiscount},
    advanceRefund: {groupName: "Advance Refund (B)", net: advanceRefund},
    advanceCollection: {groupName: "Advance Collection (C)", net: advanceCollection},
    creditinsurancebillCollection: {groupName: "Credit/Insurance Bill Collection(D)", net: creditInsuranceBillCollection},
    ipPreviousdayCollection: {groupName: "IP Previous Day's Collection(E)", net: ipPreviousDayCollection},
    countercollection: {groupName: "Total Counter Collection( A + C + D + E - B)", net: TotalCounterCollection},
    general: {groupName: "General", net: General},
    otherType: {groupName: "Other Type", net: OtherType},
    discountTotal: {groupName: "Discount Total", net: discountTotal},
  };

  return (
    <Box flex={1} sx={{backgroundColor: "lightgray", p: "1%"}}>
      {/* Detailed report model when open based on selected group using the "onClickFuncLevelOne" function */}
      <MenuButton navigateTo={"hospital_income_imTmch"} />
      <Paper square sx={{borderColor: "black", border: 1}}>
        <ReportHeader name="Hospital Income" data={headerDate} hosName="TRAVANCORE MEDICAL COLLEGE HOSPITAL" disable={false} />
        <Box
          sx={{
            overflow: "auto",
            padding: "15px",
          }}
        >
          {/* <Box>Tssh</Box> */}
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
                  }}
                >
                  <TableCell padding="none" variant="body" size="small" align="right" sx={{width: "2%", fontWeight: "bolder", fontSize: "12px"}}>
                    Sl#
                  </TableCell>
                  <TableCell padding="none" variant="body" size="small" align="left" sx={{width: "25%", fontWeight: "bolder", fontSize: "12px"}}>
                    Income Group
                  </TableCell>
                  <TableCell padding="none" variant="body" size="small" align="right" sx={{width: "20%", fontWeight: "bolder", fontSize: "12px"}}>
                    Collection/Settlement(Rs)
                  </TableCell>
                  <TableCell padding="none" variant="body" size="small" align="right" sx={{width: "20%", fontWeight: "bolder", fontSize: "12px"}}>
                    Net Amount(Rs)
                  </TableCell>
                  <TableCell padding="none" variant="body" size="small" align="right" sx={{width: "20%", fontWeight: "bolder", fontSize: "12px"}}>
                    Tax
                  </TableCell>
                  <TableCell padding="none" variant="body" size="small" align="right" sx={{width: "20%", fontWeight: "bolder", fontSize: "12px", pr: 2}}>
                    Discount(Rs)
                  </TableCell>
                  <TableCell padding="none" variant="body" size="small" align="right" sx={{width: "20%", fontWeight: "bolder", fontSize: "12px", pr: 1}}>
                    Gross Amount(Rs)
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Bed Section */}
                <LightBlueRow name={"Bed"} />
                {misData?.Bed?.map((ele, idx) => (
                  <WhiteRow data={ele} key={idx} />
                ))}
                <WhiteRowTotal data={misData?.Bed} />
                {/* Others */}
                <LightBlueRow name={"Others"} />
                {misData?.Others?.map((ele, idx) => (
                  <WhiteRow data={ele} key={idx} />
                ))}
                <WhiteRowTotal data={misData?.Others} />

                {/* Consulting */}
                <LightBlueRow name={"Consulting"} />
                {misData?.Consulting?.map((ele, idx) => {
                  return <WhiteRow data={ele} key={idx} />;
                })}
                <WhiteRowTotal data={misData?.Consulting} />

                {/* SUrgery */}
                <LightBlueRow name={"Surgery"} />
                {misData?.Surgery?.map((ele, idx) => {
                  return <WhiteRow data={ele} key={idx} />;
                })}
                <WhiteRowTotal data={misData?.Surgery} />

                {/* Cardiology */}
                <LightBlueRow name={"Cardiology"} />
                {misData?.Cardiology?.map((ele, idx) => {
                  return <WhiteRow data={ele} key={idx} />;
                })}
                <WhiteRowTotal data={misData?.Cardiology} />

                {/* Disposible */}
                <LightBlueRow name={"Disposible"} />
                {misData?.Disposible?.map((ele, idx) => {
                  return <WhiteRow data={ele} key={idx} />;
                })}
                <WhiteRowTotal data={misData?.Disposible} />

                {/* icu */}
                <LightBlueRow name={"Icu"} />
                {misData?.Icu?.map((ele, idx) => {
                  return <WhiteRow data={ele} key={idx} />;
                })}
                <WhiteRowTotal data={misData?.Icu} />

                {/* Radiology */}
                <LightBlueRow name={"Radiology"} />
                {misData?.Radiology?.map((ele, idx) => {
                  return <WhiteRow data={ele} key={idx} />;
                })}
                <WhiteRowTotal data={misData?.Radiology} />

                {/* Lab */}
                <LightBlueRow name={"Lab"} />
                {misData?.Lab?.map((ele, idx) => {
                  return <WhiteRow data={ele} key={idx} />;
                })}
                <WhiteRowTotal data={misData?.Lab} />

                {/* Mri */}
                <LightBlueRow name={"Lab"} />
                {misData?.Mri?.map((ele, idx) => {
                  return <WhiteRow data={ele} key={idx} />;
                })}
                <WhiteRowTotal data={misData?.Mri} />

                {/* Diet */}
                <LightBlueRow name={"Lab"} />
                {misData?.Diet?.map((ele, idx) => {
                  return <WhiteRow data={ele} key={idx} />;
                })}
                <WhiteRowTotal data={misData?.Diet} />

                <TableRow>
                  <TableCell align="right" sx={{width: "2%", textAlign: "center", alignItems: "center"}}></TableCell>
                  <TableCell align="left" sx={{width: "25%", fontSize: "12px", textTransform: "capitalize"}}>
                    Sale Of Medicine
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 2}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 1}}></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right" sx={{width: "2%", textAlign: "center", alignItems: "center"}}>
                    <ArrowRightIcon sx={{display: "flex", fontSize: 15}} />
                  </TableCell>
                  <TableCell align="left" sx={{width: "25%", fontSize: "12px", textTransform: "capitalize"}}>
                    Pharmacy Medicine Sale
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", cursor: "pointer", textDecoration: "underline", color: "#0000EE"}}>
                    {misData?.pharmacy?.net?.toLocaleString("en-US", {minimumFractionDigits: 2})}
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}>
                    {misData?.pharmacy?.tax?.toLocaleString("en-US", {minimumFractionDigits: 2})}
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 2}}>
                    {misData?.pharmacy?.discount?.toLocaleString("en-US", {minimumFractionDigits: 2})}
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 1}}>
                    {misData?.pharmacy?.gross?.toLocaleString("en-US", {minimumFractionDigits: 2})}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    backgroundColor: "#BBD8FF",
                    height: "30px",
                  }}
                >
                  <TableCell align="right" sx={{width: "2%", fontWeight: "bolder", fontSize: "12px"}}></TableCell>
                  <TableCell align="left" colSpan={6} sx={{fontWeight: "bolder", fontSize: "12px"}}></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right" sx={{width: "2%", textAlign: "center", fontSize: "12px", fontWeight: "bolder"}}>
                    <ArrowRightIcon
                      sx={{
                        display: "flex",
                        fontSize: 15,
                      }}
                    />
                  </TableCell>
                  <TableCell align="left" sx={{width: "25%", fontSize: "12px"}}>
                    Ip Consolidate Discount
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}>
                    [{misData?.ipConsolidatedAmount?.net?.toLocaleString("en-US", {minimumFractionDigits: 2})}]
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 2}}>
                    {misData?.ipConsolidatedAmount?.net?.toLocaleString("en-US", {minimumFractionDigits: 2})}
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 1}}></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right" sx={{width: "2%", textAlign: "center", fontSize: "12px"}}>
                    <ArrowRightIcon
                      sx={{
                        display: "flex",
                        fontSize: 15,
                      }}
                    />
                  </TableCell>
                  <TableCell align="left" sx={{width: "25%", fontSize: "12px"}}>
                    Petty Cash Amount
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}>
                    0.00
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 2}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 1}}></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right" sx={{width: "2%", textAlign: "center", fontSize: "12px"}}>
                    <ArrowRightIcon
                      sx={{
                        display: "flex",
                        fontSize: 15,
                      }}
                    />
                  </TableCell>
                  <TableCell align="left" sx={{width: "25%", fontSize: "12px"}}>
                    Tax Amount
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}>
                    {misData?.taxAmount?.net?.toLocaleString("en-US", {minimumFractionDigits: 2})}
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 2}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 1}}></TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    backgroundColor: "#BBD8FF",
                    height: "30px",
                  }}
                >
                  <TableCell align="right" sx={{width: "2%", fontWeight: "bolder", fontSize: "12px"}}></TableCell>
                  <TableCell align="left" colSpan={6} sx={{fontWeight: "bolder", fontSize: "12px"}}></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right" sx={{width: "2%", textAlign: "center", fontSize: "12px"}}>
                    <ArrowRightIcon
                      sx={{
                        display: "flex",
                        fontSize: 15,
                      }}
                    />
                  </TableCell>
                  <TableCell align="left" sx={{width: "25%", fontSize: "12px"}}>
                    Collection Against Sales (A)
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}>
                    {misData?.collectionAgainSale?.net?.toLocaleString("en-US", {minimumFractionDigits: 2})}
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 2}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 1}}></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right" sx={{width: "2%", textAlign: "center", fontSize: "12px"}}>
                    <ArrowRightIcon
                      sx={{
                        display: "flex",
                        fontSize: 15,
                      }}
                    />
                  </TableCell>
                  <TableCell align="left" sx={{width: "25%", fontSize: "12px"}}>
                    Advance Settled
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}>
                    {misData?.advanceSettled?.net?.toLocaleString("en-US", {minimumFractionDigits: 2})}
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 2}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 1}}></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right" sx={{width: "2%", textAlign: "center", fontSize: "12px"}}>
                    <ArrowRightIcon
                      sx={{
                        display: "flex",
                        fontSize: 15,
                      }}
                    />
                  </TableCell>
                  <TableCell align="left" sx={{width: "25%", fontSize: "12px"}}>
                    Credit/Insurance Bill
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", cursor: "pointer", textDecoration: "underline", color: "#0000EE"}}>
                    {misData?.creditInsuranceBill?.net?.toLocaleString("en-US", {minimumFractionDigits: 2})}
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}>
                    0
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 2}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 1}}></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right" sx={{width: "2%", textAlign: "center", fontSize: "12px"}}>
                    <ArrowRightIcon
                      sx={{
                        display: "flex",
                        fontSize: 15,
                      }}
                    />
                  </TableCell>
                  <TableCell align="left" sx={{width: "25%", fontSize: "12px"}}>
                    UnSettled Amount
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", cursor: "pointer", textDecoration: "underline", color: "#0000EE"}}>
                    {misData?.unsettledAmnt?.net?.toLocaleString("en-US", {minimumFractionDigits: 2})}
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}>
                    0.00
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 2}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 1}}></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right" sx={{width: "2%", textAlign: "center", fontSize: "12px"}}>
                    <ArrowRightIcon
                      sx={{
                        display: "flex",
                        fontSize: 15,
                      }}
                    />
                  </TableCell>
                  <TableCell align="left" sx={{width: "25%", fontSize: "12px", color: "red", fontWeight: "bold"}}>
                    Round Off
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}>
                    {misData?.roundOff?.net?.toLocaleString("en-US", {minimumFractionDigits: 2})}
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 2}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 1}}></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right" sx={{width: "2%", textAlign: "center", fontSize: "12px"}}></TableCell>
                  <TableCell align="left" sx={{width: "25%", fontSize: "12px", fontWeight: "bold"}}>
                    Grand Total
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", fontWeight: "bold"}}>
                    {misData?.grandTotal?.collection?.toLocaleString("en-US", {minimumFractionDigits: 2})}
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", fontWeight: "bold"}}>
                    {misData?.grandTotal?.net?.toLocaleString("en-US", {minimumFractionDigits: 2})}
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", fontWeight: "bold"}}>
                    {misData?.grandTotal?.tax?.toLocaleString("en-US", {minimumFractionDigits: 2})}
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", fontWeight: "bold", pr: 2}}>
                    {misData?.grandTotal?.discount?.toLocaleString("en-US", {minimumFractionDigits: 2})}
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", fontWeight: "bold", pr: 1}}>
                    {misData?.grandTotal?.Gross?.toLocaleString("en-US", {minimumFractionDigits: 2})}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    backgroundColor: "#BBD8FF",
                    height: "30px",
                  }}
                >
                  <TableCell align="right" sx={{width: "2%", fontWeight: "bolder", fontSize: "12px"}}></TableCell>
                  <TableCell align="left" colSpan={6} sx={{fontWeight: "bolder", fontSize: "12px"}}></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right" sx={{width: "2%", textAlign: "center", fontSize: "12px"}}>
                    <ArrowRightIcon
                      sx={{
                        display: "flex",
                        fontSize: 15,
                      }}
                    />
                  </TableCell>
                  <TableCell align="left" sx={{width: "25%", fontSize: "12px"}}>
                    Credit/Insurance Bill Discount
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}>
                    {misData?.creditInsurance?.net?.toLocaleString("en-US", {minimumFractionDigits: 2})}
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 2}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 1}}></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right" sx={{width: "2%", textAlign: "center", fontSize: "12px"}}>
                    <ArrowRightIcon
                      sx={{
                        display: "flex",
                        fontSize: 15,
                      }}
                    />
                  </TableCell>
                  <TableCell align="left" sx={{width: "25%", fontSize: "12px"}}>
                    Credit/Insurance WriteOff Amount
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}>
                    {misData?.writeoff?.net?.toLocaleString("en-US", {minimumFractionDigits: 2})}
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 2}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 1}}></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right" sx={{width: "2%", textAlign: "center", fontSize: "12px"}}>
                    <ArrowRightIcon
                      sx={{
                        display: "flex",
                        fontSize: 15,
                      }}
                    />
                  </TableCell>
                  <TableCell align="left" sx={{width: "25%", fontSize: "12px", color: "red", fontWeight: "bold"}}>
                    Complimentary
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}>
                    {misData?.complimentary?.net?.toLocaleString("en-US", {minimumFractionDigits: 2})}
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 2}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 1}}></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right" sx={{width: "2%", textAlign: "center", fontSize: "12px"}}>
                    <ArrowRightIcon
                      sx={{
                        display: "flex",
                        fontSize: 15,
                      }}
                    />
                  </TableCell>
                  <TableCell align="left" sx={{width: "25%", fontSize: "12px"}}>
                    IP Previous Day's Discount
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}>
                    {misData?.ipPreviousdayDiscount?.net?.toLocaleString("en-US", {minimumFractionDigits: 2})}
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 2}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 1}}></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right" sx={{width: "2%", textAlign: "center", fontSize: "12px"}}>
                    <ArrowRightIcon
                      sx={{
                        display: "flex",
                        fontSize: 15,
                      }}
                    />
                  </TableCell>
                  <TableCell align="left" sx={{width: "25%", fontSize: "12px"}}>
                    Advance Refund (B)
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}>
                    {misData?.advanceRefund?.net?.toLocaleString("en-US", {minimumFractionDigits: 2})}
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 2}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 1}}></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right" sx={{width: "2%", textAlign: "center", fontSize: "12px"}}>
                    <ArrowRightIcon
                      sx={{
                        display: "flex",
                        fontSize: 15,
                      }}
                    />
                  </TableCell>
                  <TableCell align="left" sx={{width: "25%", fontSize: "12px"}}>
                    Advance Collection (C)
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", cursor: "pointer", textDecoration: "underline", color: "#0000EE"}}>
                    {misData?.advanceCollection?.net?.toLocaleString("en-US", {minimumFractionDigits: 2})}
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 2}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 1}}></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right" sx={{width: "2%", textAlign: "center", fontSize: "12px"}}>
                    <ArrowRightIcon
                      sx={{
                        display: "flex",
                        fontSize: 15,
                      }}
                    />
                  </TableCell>
                  <TableCell align="left" sx={{width: "25%", fontSize: "12px"}}>
                    Credit/Insurance Bill Collection(D)
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", cursor: "pointer", textDecoration: "underline", color: "#0000EE"}}>
                    {misData?.creditinsurancebillCollection?.net?.toLocaleString("en-US", {minimumFractionDigits: 2})}
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 2}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 1}}></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right" sx={{width: "2%", textAlign: "center", fontSize: "12px"}}>
                    <ArrowRightIcon
                      sx={{
                        display: "flex",
                        fontSize: 15,
                      }}
                    />
                  </TableCell>
                  <TableCell align="left" sx={{width: "25%", fontSize: "12px"}}>
                    IP Previous Day's Collection(E)
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}>
                    {misData?.ipPreviousdayCollection?.net?.toLocaleString("en-US", {minimumFractionDigits: 2})}
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 2}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 1}}></TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    backgroundColor: "#BBD8FF",
                    height: "30px",
                  }}
                >
                  <TableCell align="right" sx={{width: "2%", fontWeight: "bolder", fontSize: "12px"}}></TableCell>
                  <TableCell align="left" colSpan={6} sx={{fontWeight: "bolder", fontSize: "12px"}}></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right" sx={{width: "2%", textAlign: "center", fontSize: "12px"}}></TableCell>
                  <TableCell align="left" sx={{width: "25%", fontSize: "12px"}}>
                    Total Counter Collection( A + C + D + E - B)
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}>
                    {misData?.countercollection?.net?.toLocaleString("en-US", {minimumFractionDigits: 2})}
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 2}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 1}}></TableCell>
                </TableRow>
                <TableRow sx={{backgroundColor: "#BBD8FF", height: "30px"}}>
                  <TableCell align="right" sx={{width: "2%", fontWeight: "bolder", fontSize: "12px"}}></TableCell>
                  <TableCell align="left" colSpan={6} sx={{fontWeight: "bolder", fontSize: "12px"}}></TableCell>
                </TableRow>
                <TableRow sx={{backgroundColor: "#94C5F7", height: "30px"}}>
                  <TableCell align="right" sx={{width: "2%", fontWeight: "bolder", fontSize: "12px"}}></TableCell>
                  <TableCell align="left" sx={{width: "25%", fontSize: "12px", fontWeight: "bold"}}>
                    Patient Type
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", fontWeight: "bold"}}>
                    Discount
                  </TableCell>
                  <TableCell align="left" colSpan={4} sx={{fontWeight: "bolder", fontSize: "12px"}}></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right" sx={{width: "2%", textAlign: "center", fontSize: "12px"}}>
                    <ArrowRightIcon
                      sx={{
                        display: "flex",
                        fontSize: 15,
                      }}
                    />
                  </TableCell>
                  <TableCell align="left" sx={{width: "25%", fontSize: "12px"}}>
                    General
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}>
                    {misData?.general?.net?.toLocaleString("en-US", {minimumFractionDigits: 2})}
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 2}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 1}}></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right" sx={{width: "2%", textAlign: "center", fontSize: "12px"}}>
                    <ArrowRightIcon
                      sx={{
                        display: "flex",
                        fontSize: 15,
                      }}
                    />
                  </TableCell>
                  <TableCell align="left" sx={{width: "25%", fontSize: "12px"}}>
                    Other Type
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}>
                    {misData?.otherType?.net?.toLocaleString("en-US", {minimumFractionDigits: 2})}
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 2}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 1}}></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right" sx={{width: "2%", textAlign: "center", fontSize: "12px"}}></TableCell>
                  <TableCell align="left" sx={{width: "25%", fontSize: "12px", fontWeight: "bold"}}>
                    Discount Total
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", fontWeight: "bold"}}>
                    {misData?.discountTotal?.net?.toLocaleString("en-US", {minimumFractionDigits: 2})}
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 2}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 1}}></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <ReportBottomMenu ClinicName={"Quilon Medical Trust"} UserName={"Admin"} />
      </Paper>
    </Box>
  );
};

export default memo(IncomeReports);
