// @ts-nocheck
import React, {Fragment, useEffect, memo, useCallback, useMemo, useState} from "react";
import {Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router-dom";
import {
  getAdvanceCollectionTssh,
  getAdvanceRefundTssh,
  getAdvanceSettledTssh,
  getcollectionagainSaleTotalTssh,
  getcollectionagainSaleDeductionTssh,
  getcomplimentoryTssh,
  getcreditInsuranceBillCollectionTssh,
  getIpconsolidatedDiscountTssh,
  getipPreviousDayDiscountTssh,
  getunsettledAmountTssh,
  getipPreviousDayCollectionTssh,
  getipcreditInsuranceBillTssh,
  getipcreditInsuranceBillPending,
} from "../../../../Redux-Slice/incomeCollectionTsshSlice/collectionTsshSlice";
// /collectionSlice
import {
  getProincomeTssh1,
  getProincomeTssh2,
  getProincomeTssh3,
  getProincomeTssh4,
  getPatietTypeDiscountTssh,
  theaterIncomeTssh,
} from "../../../../Redux-Slice/incomeCollectionTsshSlice/incomeProcedureTsshSlice";
//incomeProcedureSlice
import {
  getPhaSalePartTssh1,
  getPhaSalePartTssh2,
  getPhaSalePartTssh3,
  getPhaReturnPartTssh1,
  getPhaReturnPartTssh2,
  getPhaReturnPartTssh3,
} from "../../../../Redux-Slice/incomeCollectionTsshSlice/incomeTsshSlice";
import ReportHeader from "../../../Components/ReportHeader";
import {getMisGroup, getRoundOff} from "../../../../Redux-Slice/incomeCollectionSlice/misGroupMastSlice";
import {getMisGroupMaster} from "../../../../Redux-Slice/incomeCollectionSlice/misGroupMastSlice";
import {getGrandTotal, getIncomeReportList, getMisGroupMasterList, getPhamracyIncome} from "../func/misFunc";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import {
  advanceCollectionDetail,
  credInsuranceCollectionModalData1,
  credInsuranceCollectionModalData2,
  creditInsuranceBillDetlPart1,
  creditInsuranceBillDetlPart2,
  creditInsuranceBillDetlPart3,
  creditInsuranceBillDetlPart4,
  creditInsuranceBillDetlPart5,
  creditInsuranceBillDetlPart6,
  getUnsettledBillDetl,
} from "./TsshFunc";
import ReportModal from "../func/ReportModal";
import PharmacyReoprtModal from "../func/PharmacyReoprtModal";
import CreditInsuranceBillModal from "../func/CreditInsuranceBillModal";
import UnsettledAmntModal from "../func/UnsettledAmntModal";
import AdvanceCollcetionDetl from "../func/AdvanceCollcetionDetl";
import CreditInsurBillCollModal from "../func/CreditInsurBillCollModal";
import MenuButton from "../Components/MenuButton";
import ReportBottomMenu from "../Components/ReportBottomMenu";
import LightBlueRow from "./LightBlueRow";
import WhiteRow from "./WhiteRow";
import WhiteRowTotal from "./WhiteRowTotal";
import {axiosinstance} from "../../../../controllers/AxiosConfig";
import "./Style.css";

const IncomeReports = () => {
  // calling hooks
  const dispatch = useDispatch();
  const state = useLocation().state;
  // state variables
  const [misGroupList, setMisGroupList] = useState([]);
  const [misReortList, setMisReportList] = useState([]);
  const [grand, setGrand] = useState({});
  const [general, setGeneral] = useState(0);
  const [otherType, setOtherType] = useState(0);
  const [pharamcyIc, setPharamcyIc] = useState({discount: 0, grossAmount: 0, netAmount: 0, tax: 0});
  const [pharma1, setPharma1] = useState([]);
  const [pharma2, setPharma2] = useState([]);
  const [pharma3, setPharma3] = useState([]);
  const [pharma4, setPharma4] = useState([]);
  const [pharmacyDetl, setPharmacyDetl] = useState({pharma1: [], pharma2: [], pharma3: [], pharma4: []});
  const [misCollection, setMisCollrction] = useState([
    {advanceCollection: 0, tax: 0, status: false},
    {advanceRefund: 0, tax: 0, status: false},
    {advanceSettled: 0, tax: 0, status: false},
    {collectionAgainstSalesDeduction: 0, tax: 0, status: false},
    {collectionAgainstSalesTotal: 0, status: false},
    {complimentory: 0, tax: 0, status: false},
    {creditInsuranceBillCollection: 0, tax: 0, status: false},
    {ipConsolidatedDiscount: 0, status: false},
    {ipPreviousDayDiscount: 0, status: false},
    {unsettledAmount: 0, tax: 0, status: false},
    {ippreviousDayCollection: 0, tax: 0, status: false},
    {creditInsuranceBill: 0, tax: 0, status: false},
  ]);
  const [rndOff, setRndOff] = useState([]);
  const [layout, setLayout] = useState(undefined);
  const [layout1, setLayout1] = useState(undefined);
  const [layout2, setLayout2] = useState(undefined);
  const [layout3, setLayout3] = useState(undefined);
  const [layout4, setLayout4] = useState(undefined);
  const [layout5, setLayout5] = useState(undefined);
  const [modalData, setModalData] = useState({status: 0, reportName: "", reportData: []});
  const [credDetlPard1, setCredDetlPard1] = useState([]);
  const [credDetlPard2, setCredDetlPard2] = useState([]);
  const [credDetlPard3, setCredDetlPard3] = useState([]);
  const [credDetlPard4, setCredDetlPard4] = useState([]);
  const [credDetlPard5, setCredDetlPard5] = useState([]);
  const [credDetlPard6, setCredDetlPard6] = useState([]);
  const [credtInsuranceDetl, setCredtInsuranceDetl] = useState({credit1: [], credit2: [], credit3: [], credit4: [], credit5: [], credit6: []});
  const [unsettled, setUnsettled] = useState([]);
  const [advanceCollDetl, setAdvanceCollDetl] = useState([]);
  const [credInsuColl0, setCredInsuColl0] = useState([]);
  const [credInsuColl1, setCredInsuColl1] = useState([]);
  const [credInsuranceCol, setCredInsuranceCol] = useState({data0: [], data1: []});

  // Reduc Selector
  const collection = useSelector((state) => state.collectionTssh, shallowEqual);
  const pharmacyIncome = useSelector((state) => state.pharmacyIncomeTssh, shallowEqual);
  const procedureIncome = useSelector((state) => state.procedureIncomeTssh, shallowEqual);
  const misGroup = useSelector((state) => state.misGroup, shallowEqual);

  //Memorise Values
  const proIncome = useMemo(() => procedureIncome, [procedureIncome]);
  const {discount, netAmount, GrosPharma, tax} = pharamcyIc;
  const discntTotal = general + otherType;

  /**
   * Ensures a value is a valid number, returning 0 if invalid.
   * @param {*} value - The value to convert to a number.
   * @returns {number} The converted number or 0 if invalid.
   */

  const ensureNumber = (value) => {
    const num = Number(value);
    return isNaN(num) ? 0 : num;
  };

  // Formating Finantial Values

  const advanceCollection = (misCollection?.[0].advanceCollection || 0).toLocaleString("en-US", {minimumFractionDigits: 2});
  const advanceRefund = (misCollection?.[1].advanceRefund || 0).toLocaleString("en-US", {minimumFractionDigits: 2});
  const advanceSettled = (misCollection?.[2].advanceSettled || 0).toLocaleString("en-US", {minimumFractionDigits: 2});
  const collectionAgainstSalesDeduction = misCollection?.[3].collectionAgainstSalesDeduction || 0;
  const collectionAgainstSalesTotal = misCollection?.[4].collectionAgainstSalesTotal || 0;
  const complimentory = (misCollection?.[5].complimentory || 0)?.toLocaleString("en-US", {minimumFractionDigits: 2});
  const creditInsuranceBillCollection = (misCollection?.[6].creditInsuranceBillCollection || 0).toLocaleString("en-US", {minimumFractionDigits: 2});
  const ipConsolidatedDiscount = (misCollection?.[7].ipConsolidatedDiscount || 0).toLocaleString("en-US", {minimumFractionDigits: 2});
  const ipPreviousDayDiscount = (misCollection?.[8].ipPreviousDayDiscount || 0).toLocaleString("en-US", {minimumFractionDigits: 2});
  const unsettledAmount = (misCollection?.[9].unsettledAmount || 0)?.toLocaleString("en-US", {minimumFractionDigits: 2});
  const ippreviousDayCollection = (misCollection?.[10].ippreviousDayCollection || 0).toLocaleString("en-US", {minimumFractionDigits: 2});
  const creditInsuranceBill = (misCollection?.[11].creditInsuranceBill || 0).toLocaleString("en-US", {minimumFractionDigits: 2});
  const creditInsuranceBillTax = (misCollection?.[11].tax || 0)?.toLocaleString("en-US", {minimumFractionDigits: 2});

  const collAgainSale = useMemo(
    () => parseFloat(collectionAgainstSalesTotal || 0) + parseFloat(collectionAgainstSalesDeduction || 0) - (pharamcyIc.netAmount || 0),
    [collectionAgainstSalesTotal, collectionAgainstSalesDeduction, pharamcyIc.netAmount]
  );

  const {ipConatedDiscount, advSettled, creditInsurBill, unsettledAmnt, groupCollection, groupTax, groupNet, groupDis, groupGross, roundOff, groupNetddctRoundoff} = useMemo(() => {
    // Calculate the ipconsolidate Discount
    const ipConatedDiscount = ensureNumber(misCollection?.[7].ipConsolidatedDiscount ?? 0);
    // Calculate the Advance Settled
    const advSettled = ensureNumber(misCollection?.[2].advanceSettled ?? 0);
    // Calculate the Credit Insurance Bill
    const creditInsurBill = ensureNumber(misCollection?.[11].creditInsuranceBill ?? 0);
    // Calculate the unsettled Amount
    const unsettledAmnt = ensureNumber(misCollection?.[9].unsettledAmount ?? 0);
    // Calculate the Group Collection
    const groupCollection = unsettledAmnt + creditInsurBill + advSettled + collAgainSale;
    // calculate group tax
    const groupTax = ensureNumber(grand?.groupTax ?? 0); // removing "tax" column for Grouped reports
    // Calculate Group Net Amount
    const groupNet = ensureNumber(grand?.groupNet ?? 0) + groupTax - ipConatedDiscount; // removing "netAmount" column for Grouped reports
    // Calculte Group Discount
    const groupDis = ensureNumber(grand?.groupDis ?? 0) + ipConatedDiscount; // removing "discount" column for Grouped reports
    // Calculte Group Gross
    const groupGross = ensureNumber(grand?.groupGross ?? 0); // removing "GrosPharma" column for Grouped reports
    // calculate round off
    const roundOff = groupCollection - groupNet - rndOff + netAmount; // add the net amount ( "netAmount" ) for Grouped reports
    // calculate the group net with round off
    const groupNetddctRoundoff = groupNet + roundOff;

    return {ipConatedDiscount, advSettled, creditInsurBill, unsettledAmnt, groupCollection, groupTax, groupNet, groupDis, groupGross, roundOff, groupNetddctRoundoff};
  }, [misCollection, grand, rndOff, netAmount, collAgainSale]);

  const misCollection_advanceCollection = ensureNumber(misCollection[0]?.advanceCollection ?? 0);
  const misCollection_creditInsuranceBillCollection = ensureNumber(misCollection[6]?.creditInsuranceBillCollection ?? 0);
  const misCollection_ippreviousDayCollection = ensureNumber(misCollection[10]?.ippreviousDayCollection ?? 0);
  const misCollection_advanceRefund = ensureNumber(misCollection[1]?.advanceRefund ?? 0);

  const totalCounterCollection = useMemo(
    () => collAgainSale + misCollection_advanceCollection + misCollection_creditInsuranceBillCollection + misCollection_ippreviousDayCollection - misCollection_advanceRefund,
    [collAgainSale, misCollection_advanceCollection, misCollection_creditInsuranceBillCollection, misCollection_ippreviousDayCollection, misCollection_advanceRefund]
  );

  /****
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   */
  useEffect(() => {
    setPharmacyDetl({
      pharma1: pharma1,
      pharma2: pharma2,
      pharma3: pharma3,
      pharma4: pharma4,
    });
  }, [pharma1, pharma2, pharma3, pharma4]);

  useEffect(() => {
    if (!state) return;

    // Dispatch all the actions
    dispatch(getMisGroup());
    dispatch(getMisGroupMaster());

    [
      getAdvanceCollectionTssh,
      getAdvanceRefundTssh,
      getAdvanceSettledTssh,
      getcollectionagainSaleTotalTssh,
      getcollectionagainSaleDeductionTssh,
      getcomplimentoryTssh,
      getcreditInsuranceBillCollectionTssh,
      getIpconsolidatedDiscountTssh,
      getipPreviousDayDiscountTssh,
      getunsettledAmountTssh,
      getipPreviousDayCollectionTssh,
      getipcreditInsuranceBillTssh,
      getipcreditInsuranceBillPending,
      getProincomeTssh1,
      getProincomeTssh2,
      getProincomeTssh3,
      getProincomeTssh4,
      getPatietTypeDiscountTssh,
      getPhaSalePartTssh1,
      getPhaSalePartTssh2,
      getPhaSalePartTssh3,
      getPhaReturnPartTssh1,
      getPhaReturnPartTssh2,
      getPhaReturnPartTssh3,
      theaterIncomeTssh,
      getRoundOff,
    ].forEach((thunk) => dispatch(thunk(state)));
  }, [dispatch, state]);

  //  DISPATCH ALL THE ACTION

  useEffect(() => {
    // Process collection data
    if (Object.keys(collection).length > 0) {
      const misColl = [
        {
          advanceCollection: collection?.advanceCollection?.status === 1 ? collection?.advanceCollection?.data.reduce((accumulator, currentValue) => accumulator + currentValue.AMT, 0) : 0,
          tax: collection?.advanceCollection?.status === 1 ? collection?.advanceCollection?.data.reduce((accumulator, currentValue) => accumulator + currentValue.TAX, 0) : 0,
          status: collection?.advanceCollection?.status === 1 || collection?.advanceCollection?.status === 2 ? true : false,
        },
        {
          advanceRefund: collection?.advanceRefund?.status === 1 ? collection?.advanceRefund?.data.reduce((accumulator, currentValue) => accumulator + currentValue.AMT, 0) : 0,
          tax: collection?.advanceRefund?.status === 1 ? collection?.advanceRefund?.data.reduce((accumulator, currentValue) => accumulator + currentValue.TAX, 0) : 0,
          status: collection?.advanceRefund?.status === 1 || collection?.advanceRefund?.status === 2 ? true : false,
        },
        {
          advanceSettled: collection?.advanceSettled?.status === 1 ? collection?.advanceSettled?.data.reduce((accumulator, currentValue) => accumulator + currentValue.AMT, 0) : 0,
          tax: collection?.advanceSettled?.status === 1 ? collection?.advanceSettled?.data.reduce((accumulator, currentValue) => accumulator + currentValue.TAX, 0) : 0,
          status: collection?.advanceSettled?.status === 1 || collection?.advanceSettled?.status === 2 ? true : false,
        },
        {
          collectionAgainstSalesDeduction:
            collection?.collectionAgainstSalesDeduction?.status === 1 ? collection?.collectionAgainstSalesDeduction?.data.reduce((accumulator, currentValue) => accumulator + currentValue.AMT, 0) : 0,
          tax:
            collection?.collectionAgainstSalesDeduction?.status === 1 ? collection?.collectionAgainstSalesDeduction?.data.reduce((accumulator, currentValue) => accumulator + currentValue.TAX, 0) : 0,
          status: collection?.collectionAgainstSalesDeduction?.status === 1 || collection?.collectionAgainstSalesDeduction?.status === 2 ? true : false,
        },
        {
          collectionAgainstSalesTotal:
            collection?.collectionAgainstSalesTotal?.status === 1 ? collection?.collectionAgainstSalesTotal?.data.reduce((accumulator, currentValue) => accumulator + currentValue.AMT, 0) : 0,
          status: collection?.collectionAgainstSalesTotal?.status === 1 || collection?.collectionAgainstSalesTotal?.status === 2 ? true : false,
        },
        {
          complimentory: collection?.complimentory?.status === 1 ? collection?.complimentory?.data.reduce((accumulator, currentValue) => accumulator + currentValue.AMT, 0) : 0,
          tax: collection?.complimentory?.status === 1 ? collection?.complimentory?.data.reduce((accumulator, currentValue) => accumulator + currentValue.TAX, 0) : 0,
          status: collection?.complimentory?.status === 1 || collection?.complimentory?.status === 2 ? true : false,
        },
        {
          creditInsuranceBillCollection:
            collection?.creditInsuranceBillCollection?.status === 1 ? collection?.creditInsuranceBillCollection?.data.reduce((accumulator, currentValue) => accumulator + currentValue.AMT, 0) : 0,
          tax: collection?.creditInsuranceBillCollection?.status === 1 ? collection?.creditInsuranceBillCollection?.data.reduce((accumulator, currentValue) => accumulator + currentValue.TAX, 0) : 0,
          status: collection?.creditInsuranceBillCollection?.status === 1 || collection?.creditInsuranceBillCollection?.status === 2 ? true : false,
        },
        {
          ipConsolidatedDiscount:
            collection?.ipConsolidatedDiscount?.status === 1 ? collection?.ipConsolidatedDiscount?.data.reduce((accumulator, currentValue) => accumulator + currentValue.DISCOUNT, 0) : 0,
          status: collection?.ipConsolidatedDiscount?.status === 1 || collection?.ipConsolidatedDiscount?.status === 2 ? true : false,
        },
        {
          ipPreviousDayDiscount:
            collection?.ipPreviousDayDiscount?.status === 1 ? collection?.ipPreviousDayDiscount?.data.reduce((accumulator, currentValue) => accumulator + currentValue.DISCOUNT, 0) : 0,
          status: collection?.ipPreviousDayDiscount?.status === 1 || collection?.ipPreviousDayDiscount?.status === 2 ? true : false,
        },
        {
          unsettledAmount: collection?.unsettledAmount?.status === 1 ? collection?.unsettledAmount?.data.reduce((accumulator, currentValue) => accumulator + currentValue.AMT, 0) : 0,
          tax: collection?.unsettledAmount?.status === 1 ? collection?.unsettledAmount?.data.reduce((accumulator, currentValue) => accumulator + currentValue.TAX, 0) : 0,
          status: collection?.unsettledAmount?.status === 1 || collection?.unsettledAmount?.status === 2 ? true : false,
        },
        {
          ippreviousDayCollection:
            collection?.ippreviousDayCollection?.status === 1 ? collection?.ippreviousDayCollection?.data.reduce((accumulator, currentValue) => accumulator + currentValue.AMT, 0) : 0,
          tax: collection?.ippreviousDayCollection?.status === 1 ? collection?.ippreviousDayCollection?.data.reduce((accumulator, currentValue) => accumulator + currentValue.TAX, 0) : 0,
          status: collection?.ippreviousDayCollection?.status === 1 || collection?.ippreviousDayCollection?.status === 2 ? true : false,
        },
        {
          creditInsuranceBill:
            collection?.creditInsuranceBill?.status === 1
              ? collection?.creditInsuranceBill?.data.reduce((accumulator, currentValue) => accumulator + currentValue.AMT, 0) +
                collection?.creditInsuranceBillPending?.data.reduce((accumulator, currentValue) => accumulator + currentValue.AMT, 0)
              : 0,
          tax:
            collection?.creditInsuranceBill?.status === 1
              ? collection?.creditInsuranceBill?.data.reduce((accumulator, currentValue) => accumulator + currentValue.TAX, 0) +
                collection?.creditInsuranceBillPending?.data.reduce((accumulator, currentValue) => accumulator + currentValue.TAX, 0)
              : 0,
          status: collection?.creditInsuranceBill?.status === 1 || collection?.creditInsuranceBill?.status === 2 ? true : false,
        },
      ];

      if (!misColl.some((val) => val.status === false)) {
        setMisCollrction(misColl);
      }
    }

    // // Process misGroup data
    // const {misGroupState, misGroupMaster} = misGroup;
    // getMisGroupMasterList(misGroupState, misGroupMaster).then(setMisGroupList);

    // Process procedure income
    // if (proIncome?.patientTypeDiscount?.status === 1) {
    //   setGeneral(proIncome.patientTypeDiscount.data[0]?.DISCOUNT || 0);
    //   setOtherType(proIncome.patientTypeDiscount.data[1]?.DISCOUNT || 0);
    // }
    // const incomeArrayData = Object.values(proIncome)
    //   .filter((val) => val.income === true)
    //   .map((val) => (val.status === 1 ? val.data : null))
    //   .flat();
    // getIncomeReportList(incomeArrayData, misGroupList).then(setMisReportList);

    // Process pharmacy income
    // getPhamracyIncome(pharmacyIncome).then((value) => setPharamcyIc((prev) => ({...prev, ...value})));
    // setRndOff(misGroup?.roundOff?.data?.reduce((acc, curr) => acc + curr.AMT, 0) || 0);

    // Calculate grand totals
    // getGrandTotal(misReortList).then((ele) => {
    //   const grantTotal = {
    //     groupNet: ele?.reduce((acc, curr) => acc + curr.groupNet, 0) || 0,
    //     groupDis: ele?.reduce((acc, curr) => acc + curr.groupDiscnt, 0) || 0,
    //     groupTax: ele?.reduce((acc, curr) => acc + curr.groupTax, 0) || 0,
    //     groupGross: ele?.reduce((acc, curr) => acc + curr.groupGross, 0) || 0,
    //   };
    //   setGrand(grantTotal);
    // });
  }, [collection]);

  useEffect(() => {
    // @ts-ignore
    const {misGroupState, misGroupMaster} = misGroup;
    getMisGroupMasterList(misGroupState, misGroupMaster).then((misGrpList) => {
      // console.log(misGrpList)
      // @ts-ignore
      setMisGroupList(misGrpList);
    });
  }, [misGroup]);

  useEffect(() => {
    if (proIncome?.patientTypeDiscount?.status === 1) {
      setGeneral(proIncome.patientTypeDiscount.data[0]?.DISCOUNT || 0);
      setOtherType(proIncome.patientTypeDiscount.data[1]?.DISCOUNT || 0);
    }
    const incomeArrayData = Object.values(proIncome)
      .filter((val) => val.income === true)
      .map((val) => (val.status === 1 ? val.data : null))
      .flat();
    getIncomeReportList(incomeArrayData, misGroupList).then(setMisReportList);
  }, [proIncome, misGroupList]);

  useEffect(() => {
    getPhamracyIncome(pharmacyIncome).then((value) => setPharamcyIc((prev) => ({...prev, ...value})));
    setRndOff(misGroup?.roundOff?.data?.reduce((acc, curr) => acc + curr.AMT, 0) || 0);
  }, [pharmacyIncome, misGroup]);

  useEffect(() => {
    getGrandTotal(misReortList).then((ele) => {
      const grantTotal = {
        groupNet: ele?.reduce((acc, curr) => acc + curr.groupNet, 0) || 0,
        groupDis: ele?.reduce((acc, curr) => acc + curr.groupDiscnt, 0) || 0,
        groupTax: ele?.reduce((acc, curr) => acc + curr.groupTax, 0) || 0,
        groupGross: ele?.reduce((acc, curr) => acc + curr.groupGross, 0) || 0,
      };
      setGrand(grantTotal);
    });
  }, [misReortList]);

  // useEffect(() => {
  //   if (state === null) {
  //     return;
  //   } else {
  //     //MIS GROUP NAME
  //     // @ts-ignore
  //     // dispatch(getMisGroup());
  //     // // @ts-ignore
  //     // dispatch(getMisGroupMaster());
  //     // //COLLECTION PART
  //     // // @ts-ignore
  //     // dispatch(getAdvanceCollectionTssh(state));
  //     // // @ts-ignore
  //     // dispatch(getAdvanceRefundTssh(state));
  //     // // @ts-ignore
  //     // dispatch(getAdvanceSettledTssh(state));
  //     // // @ts-ignore
  //     // dispatch(getcollectionagainSaleTotalTssh(state));
  //     // // @ts-ignore
  //     // dispatch(getcollectionagainSaleDeductionTssh(state));
  //     // // @ts-ignore
  //     // dispatch(getcomplimentoryTssh(state));
  //     // // @ts-ignore
  //     // dispatch(getcreditInsuranceBillCollectionTssh(state));
  //     // // @ts-ignore
  //     // dispatch(getIpconsolidatedDiscountTssh(state));
  //     // // @ts-ignore
  //     // dispatch(getipPreviousDayDiscountTssh(state));
  //     // // @ts-ignore
  //     // dispatch(getunsettledAmountTssh(state));
  //     // // @ts-ignore
  //     // dispatch(getipPreviousDayCollectionTssh(state));
  //     // // @ts-ignore
  //     // dispatch(getipcreditInsuranceBillTssh(state));
  //     // dispatch(getipcreditInsuranceBillPending(state));

  //     // //INCOME PART
  //     // // @ts-ignore
  //     // dispatch(getProincomeTssh1(state));
  //     // // @ts-ignore
  //     // dispatch(getProincomeTssh2(state));
  //     // // @ts-ignore
  //     // dispatch(getProincomeTssh3(state));
  //     // // @ts-ignore
  //     // dispatch(getProincomeTssh4(state));
  //     // // @ts-ignore
  //     // dispatch(getPatietTypeDiscountTssh(state));
  //     // // @ts-ignore
  //     // dispatch(getPhaSalePartTssh1(state));
  //     // // @ts-ignore
  //     // dispatch(getPhaSalePartTssh2(state));
  //     // // @ts-ignore
  //     // dispatch(getPhaSalePartTssh3(state));
  //     // // @ts-ignore
  //     // dispatch(getPhaReturnPartTssh1(state));
  //     // // @ts-ignore
  //     // dispatch(getPhaReturnPartTssh2(state));
  //     // // @ts-ignore
  //     // dispatch(getPhaReturnPartTssh3(state));
  //     // // @ts-ignore
  //     // dispatch(theaterIncomeTssh(state));
  //     // dispatch(getRoundOff(state));

  //     // console.log(state);
  //   }
  // }, [state]);

  // const { state } = locationData;

  // useEffect(() => {
  //   if (Object.keys(collection).length > 0) {
  //     const misColl = [
  //       {
  //         advanceCollection: collection?.advanceCollection?.status === 1 ? collection?.advanceCollection?.data.reduce((accumulator, currentValue) => accumulator + currentValue.AMT, 0) : 0,
  //         tax: collection?.advanceCollection?.status === 1 ? collection?.advanceCollection?.data.reduce((accumulator, currentValue) => accumulator + currentValue.TAX, 0) : 0,
  //         status: collection?.advanceCollection?.status === 1 || collection?.advanceCollection?.status === 2 ? true : false,
  //       },
  //       {
  //         advanceRefund: collection?.advanceRefund?.status === 1 ? collection?.advanceRefund?.data.reduce((accumulator, currentValue) => accumulator + currentValue.AMT, 0) : 0,
  //         tax: collection?.advanceRefund?.status === 1 ? collection?.advanceRefund?.data.reduce((accumulator, currentValue) => accumulator + currentValue.TAX, 0) : 0,
  //         status: collection?.advanceRefund?.status === 1 || collection?.advanceRefund?.status === 2 ? true : false,
  //       },
  //       {
  //         advanceSettled: collection?.advanceSettled?.status === 1 ? collection?.advanceSettled?.data.reduce((accumulator, currentValue) => accumulator + currentValue.AMT, 0) : 0,
  //         tax: collection?.advanceSettled?.status === 1 ? collection?.advanceSettled?.data.reduce((accumulator, currentValue) => accumulator + currentValue.TAX, 0) : 0,
  //         status: collection?.advanceSettled?.status === 1 || collection?.advanceSettled?.status === 2 ? true : false,
  //       },
  //       {
  //         collectionAgainstSalesDeduction:
  //           collection?.collectionAgainstSalesDeduction?.status === 1 ? collection?.collectionAgainstSalesDeduction?.data.reduce((accumulator, currentValue) => accumulator + currentValue.AMT, 0) : 0,
  //         tax:
  //           collection?.collectionAgainstSalesDeduction?.status === 1 ? collection?.collectionAgainstSalesDeduction?.data.reduce((accumulator, currentValue) => accumulator + currentValue.TAX, 0) : 0,
  //         status: collection?.collectionAgainstSalesDeduction?.status === 1 || collection?.collectionAgainstSalesDeduction?.status === 2 ? true : false,
  //       },
  //       {
  //         collectionAgainstSalesTotal:
  //           collection?.collectionAgainstSalesTotal?.status === 1 ? collection?.collectionAgainstSalesTotal?.data.reduce((accumulator, currentValue) => accumulator + currentValue.AMT, 0) : 0,
  //         status: collection?.collectionAgainstSalesTotal?.status === 1 || collection?.collectionAgainstSalesTotal?.status === 2 ? true : false,
  //       },
  //       {
  //         complimentory: collection?.complimentory?.status === 1 ? collection?.complimentory?.data.reduce((accumulator, currentValue) => accumulator + currentValue.AMT, 0) : 0,
  //         tax: collection?.complimentory?.status === 1 ? collection?.complimentory?.data.reduce((accumulator, currentValue) => accumulator + currentValue.TAX, 0) : 0,
  //         status: collection?.complimentory?.status === 1 || collection?.complimentory?.status === 2 ? true : false,
  //       },
  //       {
  //         creditInsuranceBillCollection:
  //           collection?.creditInsuranceBillCollection?.status === 1 ? collection?.creditInsuranceBillCollection?.data.reduce((accumulator, currentValue) => accumulator + currentValue.AMT, 0) : 0,
  //         tax: collection?.creditInsuranceBillCollection?.status === 1 ? collection?.creditInsuranceBillCollection?.data.reduce((accumulator, currentValue) => accumulator + currentValue.TAX, 0) : 0,
  //         status: collection?.creditInsuranceBillCollection?.status === 1 || collection?.creditInsuranceBillCollection?.status === 2 ? true : false,
  //       },
  //       {
  //         ipConsolidatedDiscount:
  //           collection?.ipConsolidatedDiscount?.status === 1 ? collection?.ipConsolidatedDiscount?.data.reduce((accumulator, currentValue) => accumulator + currentValue.DISCOUNT, 0) : 0,
  //         status: collection?.ipConsolidatedDiscount?.status === 1 || collection?.ipConsolidatedDiscount?.status === 2 ? true : false,
  //       },
  //       {
  //         ipPreviousDayDiscount:
  //           collection?.ipPreviousDayDiscount?.status === 1 ? collection?.ipPreviousDayDiscount?.data.reduce((accumulator, currentValue) => accumulator + currentValue.DISCOUNT, 0) : 0,
  //         status: collection?.ipPreviousDayDiscount?.status === 1 || collection?.ipPreviousDayDiscount?.status === 2 ? true : false,
  //       },
  //       {
  //         unsettledAmount: collection?.unsettledAmount?.status === 1 ? collection?.unsettledAmount?.data.reduce((accumulator, currentValue) => accumulator + currentValue.AMT, 0) : 0,
  //         tax: collection?.unsettledAmount?.status === 1 ? collection?.unsettledAmount?.data.reduce((accumulator, currentValue) => accumulator + currentValue.TAX, 0) : 0,
  //         status: collection?.unsettledAmount?.status === 1 || collection?.unsettledAmount?.status === 2 ? true : false,
  //       },
  //       {
  //         ippreviousDayCollection:
  //           collection?.ippreviousDayCollection?.status === 1 ? collection?.ippreviousDayCollection?.data.reduce((accumulator, currentValue) => accumulator + currentValue.AMT, 0) : 0,
  //         tax: collection?.ippreviousDayCollection?.status === 1 ? collection?.ippreviousDayCollection?.data.reduce((accumulator, currentValue) => accumulator + currentValue.TAX, 0) : 0,
  //         status: collection?.ippreviousDayCollection?.status === 1 || collection?.ippreviousDayCollection?.status === 2 ? true : false,
  //       },
  //       {
  //         creditInsuranceBill:
  //           collection?.creditInsuranceBill?.status === 1
  //             ? collection?.creditInsuranceBill?.data.reduce((accumulator, currentValue) => accumulator + currentValue.AMT, 0) +
  //               collection?.creditInsuranceBillPending?.data.reduce((accumulator, currentValue) => accumulator + currentValue.AMT, 0)
  //             : 0,
  //         tax:
  //           collection?.creditInsuranceBill?.status === 1
  //             ? collection?.creditInsuranceBill?.data.reduce((accumulator, currentValue) => accumulator + currentValue.TAX, 0) +
  //               collection?.creditInsuranceBillPending?.data.reduce((accumulator, currentValue) => accumulator + currentValue.TAX, 0)
  //             : 0,
  //         status: collection?.creditInsuranceBill?.status === 1 || collection?.creditInsuranceBill?.status === 2 ? true : false,
  //       },
  //     ];

  //     const res = misColl?.find((val) => val.status === false);

  //     if (res === undefined) {
  //       // @ts-ignore
  //       setMisCollrction([
  //         // @ts-ignore
  //         // ...misCollection,
  //         // @ts-ignore
  //         {
  //           advanceCollection: misColl[0]?.advanceCollection,
  //           tax: misColl[0]?.tax,
  //           status: false,
  //         },
  //         // @ts-ignore
  //         {
  //           advanceRefund: misColl[1]?.advanceRefund,
  //           tax: misColl[1]?.tax,
  //           status: false,
  //         },
  //         // @ts-ignore
  //         {
  //           advanceSettled: misColl[2]?.advanceSettled,
  //           tax: misColl[2]?.tax,
  //           status: false,
  //         },
  //         // @ts-ignore
  //         {
  //           collectionAgainstSalesDeduction: misColl[3]?.collectionAgainstSalesDeduction,
  //           tax: misColl[3]?.tax,
  //           status: false,
  //         },
  //         // @ts-ignore
  //         {
  //           collectionAgainstSalesTotal: misColl[4]?.collectionAgainstSalesTotal,
  //           status: false,
  //         },
  //         // @ts-ignore
  //         {
  //           complimentory: misColl[5]?.complimentory,
  //           tax: misColl[5]?.tax,
  //           status: false,
  //         },
  //         // @ts-ignore
  //         {
  //           creditInsuranceBillCollection: misColl[6]?.creditInsuranceBillCollection,
  //           tax: misColl[6]?.tax,
  //           status: false,
  //         },
  //         // @ts-ignore
  //         {
  //           ipConsolidatedDiscount: misColl[7]?.ipConsolidatedDiscount,
  //           status: false,
  //         },
  //         // @ts-ignore
  //         {
  //           ipPreviousDayDiscount: misColl[8]?.ipPreviousDayDiscount,
  //           status: false,
  //         },
  //         // @ts-ignore
  //         {
  //           unsettledAmount: misColl[9]?.unsettledAmount,
  //           tax: misColl[9]?.tax,
  //           status: false,
  //         },
  //         // @ts-ignore
  //         {
  //           ippreviousDayCollection: misColl[10]?.ippreviousDayCollection,
  //           tax: misColl[10]?.tax,
  //           status: false,
  //         },
  //         // @ts-ignore
  //         {
  //           creditInsuranceBill: misColl[11]?.creditInsuranceBill,
  //           tax: misColl[11]?.tax,
  //           status: false,
  //         },
  //       ]);
  //     }
  //   }
  // }, [collection]);

  // useEffect(() => {
  //   // @ts-ignore
  //   const {misGroupState, misGroupMaster} = misGroup;
  //   getMisGroupMasterList(misGroupState, misGroupMaster).then((misGrpList) => {
  //     // @ts-ignore
  //     setMisGroupList(misGrpList);
  //   });
  // }, [misGroup]);

  //UPDATE THE INCOME PART
  // useEffect(() => {
  //   const incomeData = Object.values(proIncome);

  //   if (proIncome?.patientTypeDiscount?.status === 1) {
  //     // @ts-ignore
  //     setGeneral(proIncome?.patientTypeDiscount?.data?.[0]?.DISCOUNT);
  //     setOtherType(proIncome?.patientTypeDiscount?.data?.[1]?.DISCOUNT);
  //   }

  //   const incomeArrayData = incomeData
  //     ?.filter((val) => val.income === true)
  //     .map((val) => (val.status === 1 ? val.data : null))
  //     .flat();
  //   getIncomeReportList(incomeArrayData, misGroupLst).then((report) => {
  //     if (report !== undefined) {
  //       setMisReportList(report);
  //     }
  //   });
  // }, [misGroupLst, proIncome]);

  //PHARMACY COLLECTION INCOME PART
  // useEffect(() => {
  //   getPhamracyIncome(pharmacyIncome).then((value) => {
  //     // @ts-ignore
  //     setPharamcyIc({
  //       ...pharamcyIc,
  //       ...value,
  //     });
  //   });
  //   setRndOff(misGroup?.roundOff?.data?.reduce((accumulator, currentValue) => accumulator + currentValue.AMT, 0));
  // }, [pharmacyIncome, misGroup]);

  // @ts-ignore
  // const C = parseFloat(misCollection?.[0].advanceCollection);
  // // @ts-ignore
  // const D = parseFloat(misCollection?.[6].creditInsuranceBillCollection);
  // // @ts-ignore
  // const E = parseFloat(misCollection?.[10].ippreviousDayCollection);
  // // @ts-ignore
  // const B = parseFloat(misCollection?.[1].advanceRefund);
  // // @ts-ignore
  // const totalCounterCollection = collAgainSale + C + D + E - B;

  /**********
   * MIS REPORTS DETALED REPORTS
   */

  //FOR MODEL OPENING STATES

  const onClickFuncLevelOne = useCallback(
    async (data) => {
      const reportName = data?.groupName;
      if (!reportName) return;
      setLayout("fullscreen");

      const defaultState = {status: 0, reportName: "", reportData: []};
      setModalData(defaultState);
      const endpoints = {
        BED: "/incomeDetlTssh/bedIncome",
        ROOM: "/incomeDetlTssh/roomRentIncome",
        NS: "/incomeDetlTssh/nsIncome",
        OTHERS: "/incomeDetlTssh/otherIncome",
        CONSULTING: "/incomeDetlTssh/consultingIncome",
        THEATRE: "/incomeDetlTssh/theaterIncome",
        OPERATION: "/incomeDetlTssh/surgeonIncome",
        ANESTHESIA: "/incomeDetlTssh/anesthetiaIncome",
        CARDIOLOGY: "/incomeDetlTssh/cardiologyIncome",
        DISPOSIBLE: "/incomeDetlTssh/disPosibleItemIncome",
        ICU: "/incomeDetlTssh/icuIncome",
        "ICU PROC": "/incomeDetlTssh/icuprocedureIncome",
        RADIOLOGY: "/incomeDetlTssh/radiologyIncome",
        LAB: "/incomeDetlTssh/laboratoryIncome",
        MRI: "/incomeDetlTssh/mriIncome",
        DIET: "/incomeDetlTssh/dietIncome",
      };

      const endpoint = endpoints[reportName];
      if (!endpoint) {
        setModalData(defaultState);
        return;
      }

      // if (reportName === "BED") {
      //   // setModalData([])
      //   const bedIncomeDetl = async (state) => {
      //     setModalData(defautState);
      //     const result = await axiosinstance.post("/incomeDetlTssh/bedIncome", state);
      //     const {success, data} = result.data;
      //     if (success === 1) {
      //       setModalData({
      //         status: 1,
      //         reportName: "Bed",
      //         reportData: data,
      //       });
      //     } else {
      //       setModalData(defautState);
      //     }
      //   };
      //   bedIncomeDetl(state);
      // } else if (reportName === "ROOM") {
      //   const roomIncomeDetl = async (state) => {
      //     setModalData(defautState);
      //     const result = await axiosinstance.post("/incomeDetlTssh/roomRentIncome", state);
      //     const {success, data} = result.data;
      //     if (success === 1) {
      //       setModalData({
      //         status: 1,
      //         reportName: "Room",
      //         reportData: data,
      //       });
      //     } else {
      //       setModalData(defautState);
      //     }
      //   };
      //   roomIncomeDetl(state);
      // } else if (reportName === "NS") {
      //   const nsIncomeDetl = async (state) => {
      //     setModalData(defautState);
      //     const result = await axiosinstance.post("/incomeDetlTssh/nsIncome", state);
      //     const {success, data} = result.data;
      //     if (success === 1) {
      //       setModalData({
      //         status: 1,
      //         reportName: "Ns",
      //         reportData: data,
      //       });
      //     } else {
      //       setModalData(defautState);
      //     }
      //   };
      //   nsIncomeDetl(state);
      // } else if (reportName === "OTHERS") {
      //   const othersIncomeDetl = async (state) => {
      //     setModalData(defautState);
      //     const result = await axiosinstance.post("/incomeDetlTssh/otherIncome", state);
      //     const {success, data} = result.data;
      //     if (success === 1) {
      //       setModalData({
      //         status: 1,
      //         reportName: "Others",
      //         reportData: data,
      //       });
      //     } else {
      //       setModalData(defautState);
      //     }
      //   };
      //   othersIncomeDetl(state);
      // } else if (reportName === "CONSULTING") {
      //   const consultingIncomeDetl = async (state) => {
      //     setModalData(defautState);
      //     const result = await axiosinstance.post("/incomeDetlTssh/consultingIncome", state);
      //     const {success, data} = result.data;
      //     if (success === 1) {
      //       setModalData({
      //         status: 1,
      //         reportName: "Consulting",
      //         reportData: data,
      //       });
      //     } else {
      //       setModalData(defautState);
      //     }
      //   };
      //   consultingIncomeDetl(state);
      // } else if (reportName === "THEATRE") {
      //   const theaterIncomeDetl = async (state) => {
      //     setModalData(defautState);
      //     const result = await axiosinstance.post("/incomeDetlTssh/theaterIncome", state);
      //     const {success, data} = result.data;
      //     if (success === 1) {
      //       setModalData({
      //         status: 1,
      //         reportName: "Theater",
      //         reportData: data,
      //       });
      //     } else {
      //       setModalData(defautState);
      //     }
      //   };
      //   theaterIncomeDetl(state);
      // } else if (reportName === "OPERATION") {
      //   const surgeonIncomeDetl = async (state) => {
      //     setModalData(defautState);
      //     const result = await axiosinstance.post("/incomeDetlTssh/surgeonIncome", state);
      //     const {success, data} = result.data;
      //     if (success === 1) {
      //       setModalData({
      //         status: 1,
      //         reportName: "Operation",
      //         reportData: data,
      //       });
      //     } else {
      //       setModalData(defautState);
      //     }
      //   };
      //   surgeonIncomeDetl(state);
      // } else if (reportName === "ANESTHESIA") {
      //   const anesthesiaIncomeDetl = async (state) => {
      //     setModalData(defautState);
      //     const result = await axiosinstance.post("/incomeDetlTssh/anesthetiaIncome", state);
      //     const {success, data} = result.data;
      //     if (success === 1) {
      //       setModalData({
      //         status: 1,
      //         reportName: "Anesthesia",
      //         reportData: data,
      //       });
      //     } else {
      //       setModalData(defautState);
      //     }
      //   };
      //   anesthesiaIncomeDetl(state);
      // } else if (reportName === "CARDIOLOGY") {
      //   const cardiologyIncomeDetl = async (state) => {
      //     setModalData(defautState);
      //     const result = await axiosinstance.post("/incomeDetlTssh/cardiologyIncome", state);
      //     const {success, data} = result.data;
      //     if (success === 1) {
      //       setModalData({
      //         status: 1,
      //         reportName: "Cardiology",
      //         reportData: data,
      //       });
      //     } else {
      //       setModalData(defautState);
      //     }
      //   };
      //   cardiologyIncomeDetl(state);
      // } else if (reportName === "DISPOSIBLE") {
      //   const disposibleIncomeDetl = async (state) => {
      //     setModalData(defautState);
      //     const result = await axiosinstance.post("/incomeDetlTssh/disPosibleItemIncome", state);
      //     const {success, data} = result.data;
      //     if (success === 1) {
      //       setModalData({
      //         status: 1,
      //         reportName: "Disposible",
      //         reportData: data,
      //       });
      //     } else {
      //       setModalData(defautState);
      //     }
      //   };
      //   disposibleIncomeDetl(state);
      // } else if (reportName === "ICU") {
      //   const icuIncomeDetl = async (state) => {
      //     setModalData(defautState);
      //     const result = await axiosinstance.post("/incomeDetlTssh/icuIncome", state);
      //     const {success, data} = result.data;
      //     if (success === 1) {
      //       setModalData({
      //         status: 1,
      //         reportName: "Icu",
      //         reportData: data,
      //       });
      //     } else {
      //       setModalData(defautState);
      //     }
      //   };
      //   icuIncomeDetl(state);
      // } else if (reportName === "ICU PROC") {
      //   const icuProIncomeDetl = async (state) => {
      //     setModalData(defautState);
      //     const result = await axiosinstance.post("/incomeDetlTssh/icuprocedureIncome", state);
      //     const {success, data} = result.data;
      //     if (success === 1) {
      //       setModalData({
      //         status: 1,
      //         reportName: "Icu Procedure",
      //         reportData: data,
      //       });
      //     } else {
      //       setModalData(defautState);
      //     }
      //   };
      //   icuProIncomeDetl(state);
      // } else if (reportName === "RADIOLOGY") {
      //   const radiologyIncomeDetl = async (state) => {
      //     setModalData(defautState);
      //     const result = await axiosinstance.post("/incomeDetlTssh/radiologyIncome", state);
      //     const {success, data} = result.data;
      //     if (success === 1) {
      //       setModalData({
      //         status: 1,
      //         reportName: "Radiology",
      //         reportData: data,
      //       });
      //     } else {
      //       setModalData(defautState);
      //     }
      //   };
      //   radiologyIncomeDetl(state);
      // } else if (reportName === "LAB") {
      //   const labIncomeDetl = async (state) => {
      //     setModalData(defautState);
      //     const result = await axiosinstance.post("/incomeDetlTssh/laboratoryIncome", state);
      //     const {success, data} = result.data;
      //     if (success === 1) {
      //       setModalData({
      //         status: 1,
      //         reportName: "Laboratory",
      //         reportData: data,
      //       });
      //     } else {
      //       setModalData(defautState);
      //     }
      //   };
      //   labIncomeDetl(state);
      // } else if (reportName === "MRI") {
      //   const mriIncomeDetl = async (state) => {
      //     setModalData(defautState);
      //     const result = await axiosinstance.post("/incomeDetlTssh/mriIncome", state);
      //     const {success, data} = result.data;
      //     if (success === 1) {
      //       setModalData({
      //         status: 1,
      //         reportName: "Mri",
      //         reportData: data,
      //       });
      //     } else {
      //       setModalData(defautState);
      //     }
      //   };
      //   mriIncomeDetl(state);
      // } else if (reportName === "DIET") {
      //   const dietIncomeDetl = async (state) => {
      //     setModalData(defautState);
      //     const result = await axiosinstance.post("/incomeDetlTssh/dietIncome", state);
      //     const {success, data} = result.data;
      //     if (success === 1) {
      //       setModalData({
      //         status: 1,
      //         reportName: "Diet",
      //         reportData: data,
      //       });
      //     } else {
      //       setModalData(defautState);
      //     }
      //   };
      //   dietIncomeDetl(state);
      // }
    },
    [state]
  );

  const getPharmacyDetl = useCallback(async () => {
    setLayout1("fullscreen");
    await axiosinstance.post("/incomeDetlTssh/pharmacyIncomePart1", state).then((res) => {
      const {success, data} = res.data;
      if (success === 1) {
        setPharma1([...data]);
      }
    });
    await axiosinstance.post("/incomeDetlTssh/pharmacyIncomePart2", state).then((res) => {
      const {success, data} = res.data;
      if (success === 1) {
        setPharma2([...data]);
      }
    });
    await axiosinstance.post("/incomeDetlTssh/pharmacyIncomePart3", state).then((res) => {
      const {success, data} = res.data;
      if (success === 1) {
        setPharma3([...data]);
      }
    });
    await axiosinstance.post("/incomeDetlTssh/pharmacyIncomePart4", state).then((res) => {
      const {success, data} = res.data;
      if (success === 1) {
        setPharma4([...data]);
      }
    });
  }, [state]);

  const onClickCreditInsuranceBill = useCallback(async () => {
    setLayout2("fullscreen");

    creditInsuranceBillDetlPart1(state).then((result) => {
      if (result !== undefined) {
        setCredDetlPard1([...result]);
      }
    });

    creditInsuranceBillDetlPart2(state).then((result) => {
      if (result !== undefined) {
        setCredDetlPard2([...result]);
      }
    });

    creditInsuranceBillDetlPart3(state).then((result) => {
      if (result !== undefined) {
        setCredDetlPard3([...result]);
      }
    });

    creditInsuranceBillDetlPart4(state).then((result) => {
      if (result !== undefined) {
        setCredDetlPard4([...result]);
      }
    });

    creditInsuranceBillDetlPart5(state).then((result) => {
      if (result !== undefined) {
        setCredDetlPard5([...result]);
      }
    });

    creditInsuranceBillDetlPart6(state).then((result) => {
      if (result !== undefined) {
        setCredDetlPard6([...result]);
      }
    });
  }, [state]);

  useEffect(() => {
    setCredtInsuranceDetl({
      credit1: [...credDetlPard1],
      credit2: [...credDetlPard2],
      credit3: [...credDetlPard3],
      credit4: [...credDetlPard4],
      credit5: [...credDetlPard5],
      credit6: [...credDetlPard6],
    });
  }, [credDetlPard1, credDetlPard2, credDetlPard3, credDetlPard4, credDetlPard5, credDetlPard6]);

  const onClickUnsettledAmount = useCallback(() => {
    setLayout3("fullscreen");
    getUnsettledBillDetl(state).then((results) => {
      setUnsettled([...results]);
    });
  }, [state]);

  //ADVANCE COLLCTION DETAILS [C]
  const onClickAdvanceCollection = useCallback(async () => {
    setLayout4("fullscreen");
    advanceCollectionDetail(state).then((results) => {
      setAdvanceCollDetl([...results]);
    });
  }, [state]);

  useEffect(() => {
    setCredInsuranceCol({
      data0: [...credInsuColl0],
      data1: [...credInsuColl1],
    });
  }, [credInsuColl0, credInsuColl1]);

  const onClickCreditInsuranceBillCollection = useCallback(async () => {
    setLayout5("fullscreen");
    credInsuranceCollectionModalData1(state).then((results) => {
      if (results !== undefined) {
        setCredInsuColl0([...results]);
      }
    });

    credInsuranceCollectionModalData2(state).then((results) => {
      if (results !== undefined) {
        setCredInsuColl1([...results]);
      }
    });
  }, [state]);

  return (
    <Box flex={1} sx={{backgroundColor: "lightgray", p: "1%"}}>
      <MenuButton navigateTo={"hospital_income_grouped"} />
      {/* Detailed report model when open based on selected group using the "onClickFuncLevelOne" function */}
      <ReportModal layout={layout} setLayout={setLayout} state={state} data={modalData} name="QMT" />
      {/* pHARMACY rEPORTS dETAILS mODAL */}
      <PharmacyReoprtModal layout={layout1} setLayout={setLayout1} state={state} data={pharmacyDetl} name="QMT" />
      {/* Credit insurance Bill details */}
      <CreditInsuranceBillModal layout={layout2} setLayout={setLayout2} state={state} data={credtInsuranceDetl} name="QMT" />
      {/* Unsettled amount Details */}
      <UnsettledAmntModal layout={layout3} setLayout={setLayout3} state={state} data={unsettled} name="QMT" />
      {/* ADVANCE COLLECTION [C] */}
      <AdvanceCollcetionDetl layout={layout4} setLayout={setLayout4} state={state} data={advanceCollDetl} name="QMT" />
      {/* CREDIT INSURANCE BILL COLLECTION  */}
      <CreditInsurBillCollModal layout={layout5} setLayout={setLayout5} state={state} data={credInsuranceCol} name="QMT" />
      <Paper square sx={{borderColor: "black", border: 1}}>
        <ReportHeader name="Hospital Income" data={state} hosName="QMT" disable={false} />
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
                  <TableCell
                    padding="none"
                    variant="body"
                    size="small"
                    align="left"
                    sx={{
                      width: "25%",
                      fontWeight: "bolder",
                      fontSize: "12px",
                    }}
                  >
                    Income Group
                  </TableCell>
                  <TableCell
                    padding="none"
                    variant="body"
                    size="small"
                    align="right"
                    sx={{
                      width: "20%",
                      fontWeight: "bolder",
                      fontSize: "12px",
                    }}
                  >
                    Collection/Settlement(Rs)
                  </TableCell>
                  <TableCell
                    padding="none"
                    variant="body"
                    size="small"
                    align="right"
                    sx={{
                      width: "20%",
                      fontWeight: "bolder",
                      fontSize: "12px",
                    }}
                  >
                    Net Amount(Rs)
                  </TableCell>
                  <TableCell
                    padding="none"
                    variant="body"
                    size="small"
                    align="right"
                    sx={{
                      width: "20%",
                      fontWeight: "bolder",
                      fontSize: "12px",
                    }}
                  >
                    Tax
                  </TableCell>
                  <TableCell
                    padding="none"
                    variant="body"
                    size="small"
                    align="right"
                    sx={{
                      width: "20%",
                      fontWeight: "bolder",
                      fontSize: "12px",
                      pr: 2,
                    }}
                  >
                    Discount(Rs)
                  </TableCell>
                  <TableCell
                    padding="none"
                    variant="body"
                    size="small"
                    align="right"
                    sx={{
                      width: "20%",
                      fontWeight: "bolder",
                      fontSize: "12px",
                      pr: 1,
                    }}
                  >
                    Gross Amount(Rs)
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {misReortList?.map((val, idx) => {
                  return (
                    <Fragment key={`group-${idx}`}>
                      <LightBlueRow data={val} />
                      {val.groupList?.map((ele, idex) => {
                        return <WhiteRow data={ele} key={`subgroup-${idx}-${idex}`} onClick={onClickFuncLevelOne} />;
                      })}
                      <WhiteRowTotal data={val} />
                    </Fragment>
                  );
                })}
                <TableRow>
                  <TableCell
                    align="right"
                    sx={{
                      width: "2%",
                      textAlign: "center",
                      alignItems: "center",
                    }}
                  ></TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      width: "25%",
                      fontSize: "12px",
                      textTransform: "capitalize",
                    }}
                  >
                    Sale Of Medicine
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 2}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 1}}></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    align="right"
                    sx={{
                      width: "2%",
                      textAlign: "center",
                      alignItems: "center",
                    }}
                  >
                    <ArrowRightIcon sx={{display: "flex", fontSize: 15}} />
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      width: "25%",
                      fontSize: "12px",
                      textTransform: "capitalize",
                    }}
                  >
                    Pharmacy Medicine Sale
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}></TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      width: "20%",
                      fontSize: "12px",
                      cursor: "pointer",
                      textDecoration: "underline",
                      color: "#0000EE",
                    }}
                    onClick={getPharmacyDetl}
                  >
                    {"0.00"}
                    {netAmount?.toLocaleString("en-US", {minimumFractionDigits: 2})}
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}>
                    {"0.00"}
                    {tax?.toLocaleString("en-US", {minimumFractionDigits: 2})}
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 2}}>
                    {"0.00"}
                    {discount?.toLocaleString("en-US", {minimumFractionDigits: 2})}
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 1}}>
                    {"0.00"}
                    {GrosPharma?.toLocaleString("en-US", {minimumFractionDigits: 2})}
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
                  <TableCell
                    align="right"
                    sx={{
                      width: "2%",
                      textAlign: "center",
                      fontSize: "12px",
                      fontWeight: "bolder",
                    }}
                  >
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
                    [{ipConsolidatedDiscount}]
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 2}}>
                    {ipConsolidatedDiscount}
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
                    {tax?.toLocaleString()}
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
                    {collAgainSale?.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
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
                    {advanceSettled}
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
                  <TableCell
                    align="right"
                    sx={{
                      width: "20%",
                      fontSize: "12px",
                      cursor: "pointer",
                      textDecoration: "underline",
                      color: "#0000EE",
                    }}
                    onClick={onClickCreditInsuranceBill}
                  >
                    {creditInsuranceBill}
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}>
                    {creditInsuranceBillTax}
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
                  <TableCell
                    align="right"
                    sx={{
                      width: "20%",
                      fontSize: "12px",
                      cursor: "pointer",
                      textDecoration: "underline",
                      color: "#0000EE",
                    }}
                    onClick={onClickUnsettledAmount}
                  >
                    {unsettledAmount}
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
                  <TableCell
                    align="left"
                    sx={{
                      width: "25%",
                      fontSize: "12px",
                      color: "red",
                      fontWeight: "bold",
                    }}
                  >
                    Round Off
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}>
                    {roundOff?.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
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
                    {groupCollection?.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", fontWeight: "bold"}}>
                    {groupNetddctRoundoff?.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", fontWeight: "bold"}}>
                    {groupTax?.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      width: "20%",
                      fontSize: "12px",
                      fontWeight: "bold",
                      pr: 2,
                    }}
                  >
                    {groupDis?.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      width: "20%",
                      fontSize: "12px",
                      fontWeight: "bold",
                      pr: 1,
                    }}
                  >
                    {groupGross?.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
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
                    {0}
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
                    {0}
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
                  <TableCell
                    align="left"
                    sx={{
                      width: "25%",
                      fontSize: "12px",
                      color: "red",
                      fontWeight: "bold",
                    }}
                  >
                    Complimentary
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}>
                    {complimentory}
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
                    {ipPreviousDayDiscount}
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
                    {advanceRefund}
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
                  <TableCell
                    align="right"
                    sx={{
                      width: "20%",
                      fontSize: "12px",
                      cursor: "pointer",
                      textDecoration: "underline",
                      color: "#0000EE",
                    }}
                    onClick={onClickAdvanceCollection}
                  >
                    {advanceCollection}
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
                  <TableCell
                    align="right"
                    sx={{
                      width: "20%",
                      fontSize: "12px",
                      cursor: "pointer",
                      textDecoration: "underline",
                      color: "#0000EE",
                    }}
                    onClick={onClickCreditInsuranceBillCollection}
                  >
                    {creditInsuranceBillCollection}
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
                    {ippreviousDayCollection}
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
                    {totalCounterCollection?.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
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
                    {general?.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
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
                    {otherType?.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
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
                    {discntTotal?.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
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
