// @ts-nocheck
import React, {Fragment, memo, useCallback, useMemo, useState, useEffect} from "react";
import {Box, Icon, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
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
import {
  getProincomeTssh1,
  getProincomeTssh2,
  getProincomeTssh3,
  getProincomeTssh4,
  getPatietTypeDiscountTssh,
  theaterIncomeTssh,
} from "../../../../Redux-Slice/incomeCollectionTsshSlice/incomeProcedureTsshSlice";
import {
  getPhaSalePartTssh1,
  getPhaSalePartTssh2,
  getPhaSalePartTssh3,
  getPhaReturnPartTssh1,
  getPhaReturnPartTssh2,
  getPhaReturnPartTssh3,
} from "../../../../Redux-Slice/incomeCollectionTsshSlice/incomeTsshSlice";
import ReportHeader from "../../../Components/ReportHeader";
import {getMisGroup} from "../../../../Redux-Slice/incomeCollectionSlice/misGroupMastSlice";
import {getMisGroupMaster} from "../../../../Redux-Slice/incomeCollectionSlice/misGroupMastSlice";
import LightBlueRow from "./LightBlueRow";
import WhiteRow from "./WhiteRow";
import WhiteRowTotal from "./WhiteRowTotal";
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
import {axiosinstance} from "../../../../controllers/AxiosConfig";
import ReportModal from "../func/ReportModal";
import PharmacyReoprtModal from "../func/PharmacyReoprtModal";
import CreditInsuranceBillModal from "../func/CreditInsuranceBillModal";
import UnsettledAmntModal from "../func/UnsettledAmntModal";
import AdvanceCollcetionDetl from "../func/AdvanceCollcetionDetl";
import CreditInsurBillCollModal from "../func/CreditInsurBillCollModal";
import "./Style.css";
import MenuButton from "../Components/MenuButton";
import ReportBottomMenu from "../Components/ReportBottomMenu";

const IncomeReports = () => {
  const dispatch = useDispatch();
  const {state} = useLocation();

  const collection = useSelector((state) => state.collectionTssh);
  const pharmacyIncome = useSelector((state) => state.pharmacyIncomeTssh);
  const procedureIncome = useSelector((state) => state.procedureIncomeTssh);
  const misGroup = useSelector((state) => state.misGroup);

  const [misGroupList, setMisGroupList] = useState([]);
  const [misReortList, setMisReportList] = useState([]);
  const [patientDiscount, setPatientDiscount] = useState([]);
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
  const [credtInsuranceDetl, setCredtInsuranceDetl] = useState({
    credit1: [],
    credit2: [],
    credit3: [],
    credit4: [],
    credit5: [],
    credit6: [],
  });
  const [unsettled, setUnsettled] = useState([]);
  const [advanceCollDetl, setAdvanceCollDetl] = useState([]);
  const [credInsuColl0, setCredInsuColl0] = useState([]);
  const [credInsuColl1, setCredInsuColl1] = useState([]);
  const [credInsuranceCol, setCredInsuranceCol] = useState({data0: [], data1: []});

  const ensureNumber = (value) => {
    const num = Number(value);
    return isNaN(num) ? 0 : num;
  };

  const discntTotal = general + otherType;
  const {discount, grossAmount, netAmount, tax} = pharamcyIc;
  const GrosPharma = discount + netAmount + tax;

  const proIncome = useMemo(() => procedureIncome, [procedureIncome]);
  const misGroupLst = useMemo(() => misGroupList, [misGroupList]);
  const {
    advanceCollection,
    advanceRefund,
    advanceSettled,
    collectionAgainstSalesDeduction,
    collectionAgainstSalesTotal,
    complimentory,
    creditInsuranceBillCollection,
    ipConsolidatedDiscount,
    ipPreviousDayDiscount,
    unsettledAmount,
    ippreviousDayCollection,
    creditInsuranceBill,
    creditInsuranceBillTax,
    collAgainSale,
  } = useMemo(() => {
    const advanceCollection = (misCollection?.[0].advanceCollection || 0).toLocaleString("en-US", {minimumFractionDigits: 2});
    const advanceRefund = (misCollection?.[1].advanceRefund || 0).toLocaleString("en-US", {minimumFractionDigits: 2});
    const advanceSettled = (misCollection?.[2].advanceSettled || 0).toLocaleString("en-US", {minimumFractionDigits: 2});
    const collectionAgainstSalesDeduction = misCollection?.[3].collectionAgainstSalesDeduction || 0;
    const collectionAgainstSalesTotal = misCollection?.[4].collectionAgainstSalesTotal || 0;
    const complimentory = (misCollection?.[5].complimentory || 0).toLocaleString("en-US", {minimumFractionDigits: 2});
    const creditInsuranceBillCollection = (misCollection?.[6].creditInsuranceBillCollection || 0).toLocaleString("en-US", {minimumFractionDigits: 2});
    const ipConsolidatedDiscount = (misCollection?.[7].ipConsolidatedDiscount || 0).toLocaleString("en-US", {minimumFractionDigits: 2});
    const ipPreviousDayDiscount = (misCollection?.[8].ipPreviousDayDiscount || 0).toLocaleString("en-US", {minimumFractionDigits: 2});
    const unsettledAmount = (misCollection?.[9].unsettledAmount || 0).toLocaleString("en-US", {minimumFractionDigits: 2});
    const ippreviousDayCollection = (misCollection?.[10].ippreviousDayCollection || 0).toLocaleString("en-US", {minimumFractionDigits: 2});
    const creditInsuranceBill = (misCollection?.[11].creditInsuranceBill || 0).toLocaleString("en-US", {minimumFractionDigits: 2});
    const creditInsuranceBillTax = (misCollection?.[11].tax || 0).toLocaleString("en-US", {minimumFractionDigits: 2});

    const collectionAgainSale = parseFloat(collectionAgainstSalesTotal);
    const collectionAgainReturn = parseFloat(collectionAgainstSalesDeduction);
    const collAgainSale = collectionAgainSale + collectionAgainReturn;

    return {
      advanceCollection,
      advanceRefund,
      advanceSettled,
      collectionAgainstSalesDeduction,
      collectionAgainstSalesTotal,
      complimentory,
      creditInsuranceBillCollection,
      ipConsolidatedDiscount,
      ipPreviousDayDiscount,
      unsettledAmount,
      ippreviousDayCollection,
      creditInsuranceBill,
      creditInsuranceBillTax,
      collAgainSale,
    };
  }, [misCollection]);

  const misCollectionAdvanceCollection = parseFloat(misCollection?.[0].advanceCollection);
  const misCollectionCreditInsuranceBillCollection = parseFloat(misCollection?.[6].creditInsuranceBillCollection);
  const misCollectionIppreviousDayCollection = parseFloat(misCollection?.[10].ippreviousDayCollection);
  const misCollectionAdvanceRefund = parseFloat(misCollection?.[1].advanceRefund);

  const totalCounterCollection = useMemo(
    () => collAgainSale + misCollectionAdvanceCollection + misCollectionCreditInsuranceBillCollection + misCollectionIppreviousDayCollection - misCollectionAdvanceRefund,
    [misCollectionAdvanceCollection, misCollectionCreditInsuranceBillCollection, misCollectionIppreviousDayCollection, misCollectionAdvanceRefund, collAgainSale]
  );

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
    ].forEach((thiunk) => dispatch(thiunk(state)));
  }, [state]);

  useEffect(() => {
    if (!Object.keys(collection).length) return;
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
        tax: collection?.collectionAgainstSalesDeduction?.status === 1 ? collection?.collectionAgainstSalesDeduction?.data.reduce((accumulator, currentValue) => accumulator + currentValue.TAX, 0) : 0,
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

    if (!misColl?.some((val) => val.status === false)) {
      setMisCollrction(misColl);
    }
  }, [collection]);

  useEffect(() => {
    const {misGroupState, misGroupMaster} = misGroup;
    getMisGroupMasterList(misGroupState, misGroupMaster).then(setMisGroupList);
  }, [misGroup]);

  //UPDATE THE INCOME PART
  useEffect(() => {
    if (proIncome?.patientTypeDiscount?.status === 1) {
      setGeneral(proIncome?.patientTypeDiscount?.data?.[0]?.DISCOUNT || 0);
      setOtherType(proIncome?.patientTypeDiscount?.data?.[1]?.DISCOUNT || 0);
    }

    const incomeArrayData = Object.values(proIncome)
      ?.filter((val) => val.income === true)
      .map((val) => (val.status === 1 ? val.data : null))
      .flat();
    getIncomeReportList(incomeArrayData, misGroupLst).then(setMisReportList);
  }, [misGroupLst, proIncome]);

  //PHARMACY COLLECTION INCOME PART
  useEffect(() => {
    getPhamracyIncome(pharmacyIncome).then((value) => setPharamcyIc((prev) => ({...prev, ...value})));
  }, [pharmacyIncome]);

  //CALCULATE GRAND TOTALS
  useEffect(() => {
    getGrandTotal(misReortList).then((ele) => {
      let grantTotal = {
        groupNet: ele?.reduce((accumulator, currentValue) => accumulator + currentValue.groupNet, 0),
        groupDis: ele?.reduce((accumulator, currentValue) => accumulator + currentValue.groupDiscnt, 0),
        groupTax: ele?.reduce((accumulator, currentValue) => accumulator + currentValue.groupTax, 0),
        groupGross: ele?.reduce((accumulator, currentValue) => accumulator + currentValue.groupGross, 0),
      };
      setGrand(grantTotal);
    });
  }, [misReortList]);

  const {ipConatedDiscount, advSettled, creditInsurBill, unsettledAmnt, groupTax, groupNet, groupDis, groupGross, groupCollection, roundOff, groupNetddctRoundoff} = useMemo(() => {
    const ipConatedDiscount = ensureNumber(misCollection?.[7].ipConsolidatedDiscount ?? 0);
    const advSettled = ensureNumber(misCollection?.[2].advanceSettled ?? 0);
    const creditInsurBill = ensureNumber(misCollection?.[11].creditInsuranceBill ?? 0);
    const unsettledAmnt = ensureNumber(misCollection?.[9].unsettledAmount ?? 0);
    const groupTax = ensureNumber(grand?.groupTax ?? 0) + tax;
    const groupNet = ensureNumber(grand?.groupNet ?? 0) + netAmount + groupTax - ipConatedDiscount;
    const groupDis = ensureNumber(grand?.groupDis ?? 0) + discount + ipConatedDiscount;
    const groupGross = ensureNumber(grand?.groupGross ?? 0) + GrosPharma;

    const groupCollection = unsettledAmnt + creditInsurBill + advSettled + collAgainSale;
    const roundOff = groupCollection - groupNet;
    const groupNetddctRoundoff = groupNet + roundOff;

    return {ipConatedDiscount, advSettled, creditInsurBill, unsettledAmnt, groupTax, groupNet, groupDis, groupGross, groupCollection, roundOff, groupNetddctRoundoff};
  }, [misCollection, grand, tax, netAmount, discount, GrosPharma, collAgainSale]);

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

      try {
        const result = await axiosinstance.post(endpoint, state);
        const {success, data} = result.data;
        setModalData({
          status: success === 1 ? 1 : 0,
          reportName: reportName.charAt(0).toUpperCase() + reportName.slice(1).toLowerCase(),
          reportData: success === 1 ? data : [],
        });
      } catch (error) {
        console.error(`Error fetching ${reportName} details:`, error);
        setModalData(defaultState);
      }
    },
    [state]
  );

  const getPharmacyDetl = useCallback(async () => {
    setLayout1("fullscreen");
    const [res1, res2, res3, res4] = await Promise.all([
      axiosinstance.post("/incomeDetlTssh/pharmacyIncomePart1", state),
      axiosinstance.post("/incomeDetlTssh/pharmacyIncomePart2", state),
      axiosinstance.post("/incomeDetlTssh/pharmacyIncomePart3", state),
      axiosinstance.post("/incomeDetlTssh/pharmacyIncomePart4", state),
    ]);
    setPharma1(res1.data.success === 1 ? res1.data.data : []);
    setPharma2(res2.data.success === 1 ? res2.data.data : []);
    setPharma3(res3.data.success === 1 ? res3.data.data : []);
    setPharma4(res4.data.success === 1 ? res4.data.data : []);
  }, []);

  const onClickCreditInsuranceBill = useCallback(async () => {
    setLayout2("fullscreen");

    const [res1, res2, res3, res4, res5, res6] = await Promise.all([
      creditInsuranceBillDetlPart1(state),
      creditInsuranceBillDetlPart2(state),
      creditInsuranceBillDetlPart3(state),
      creditInsuranceBillDetlPart4(state),
      creditInsuranceBillDetlPart5(state),
      creditInsuranceBillDetlPart6(state),
    ]);

    setCredDetlPard1(res1 || []);
    setCredDetlPard2(res2 || []);
    setCredDetlPard3(res3 || []);
    setCredDetlPard4(res4 || []);
    setCredDetlPard5(res5 || []);
    setCredDetlPard6(res6 || []);
  }, [state]);

  useEffect(() => {
    setCredtInsuranceDetl({
      credit1: credDetlPard1,
      credit2: credDetlPard2,
      credit3: credDetlPard3,
      credit4: credDetlPard4,
      credit5: credDetlPard5,
      credit6: credDetlPard6,
    });
  }, [credDetlPard1, credDetlPard2, credDetlPard3, credDetlPard4, credDetlPard5, credDetlPard6]);

  // ONcLICK UNSETTLED DETAILS
  const onClickUnsettledAmount = useCallback(async () => {
    setLayout3("fullscreen");
    try {
      const result = await getUnsettledBillDetl(state);
      setUnsettled(result || []);
    } catch (error) {
      console.log("Error fetching unsettled details:", error);
    }
  }, [state]);

  const onClickAdvanceCollection = useCallback(async () => {
    setLayout4("fullscreen");
    try {
      const result = await advanceCollectionDetail(state);
      setAdvanceCollDetl(result || []);
    } catch (error) {
      console.log("Error fetching advance collection details:", error);
    }
  }, [state]);

  useEffect(() => {
    setCredInsuranceCol({
      data0: credInsuColl0,
      data1: credInsuColl1,
    });
  }, [credInsuColl0, credInsuColl1]);

  const onClickCreditInsuranceBillCollection = useCallback(async () => {
    setLayout5("fullscreen");

    const [res1, res2] = await Promise.all([credInsuranceCollectionModalData1(state), credInsuranceCollectionModalData2(state)]);

    setCredInsuColl0(res1 || []);
    setCredInsuColl1(res2 || []);
  }, [state]);

  return (
    <Box flex={1} sx={{backgroundColor: "lightgray", p: "1%"}}>
      <MenuButton navigateTo={"hospital_income_tssh"} />
      <ReportModal layout={layout} setLayout={setLayout} state={state} data={modalData} name="TRAVANCORE SUPER SPECIALITY HOSPITAL" />
      <PharmacyReoprtModal layout={layout1} setLayout={setLayout1} state={state} data={pharmacyDetl} name="TRAVANCORE SUPER SPECIALITY HOSPITAL" />
      <CreditInsuranceBillModal layout={layout2} setLayout={setLayout2} state={state} data={credtInsuranceDetl} name="TRAVANCORE SUPER SPECIALITY HOSPITAL" />
      <UnsettledAmntModal layout={layout3} setLayout={setLayout3} state={state} data={unsettled} name="TRAVANCORE SUPER SPECIALITY HOSPITAL" />
      <AdvanceCollcetionDetl layout={layout4} setLayout={setLayout4} state={state} data={advanceCollDetl} name="TRAVANCORE SUPER SPECIALITY HOSPITAL" />
      <CreditInsurBillCollModal layout={layout5} setLayout={setLayout5} state={state} data={credInsuranceCol} name="TRAVANCORE SUPER SPECIALITY HOSPITAL" />
      <Paper square sx={{borderColor: "black", border: 1}}>
        <ReportHeader name="Hospital Income" data={state} hosName="TRAVANCORE SUPER SPECIALITY HOSPITAL" disable={false} />
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
                {misReortList?.map((val, idx) => {
                  return (
                    <Fragment key={idx}>
                      <LightBlueRow data={val} key={idx} />
                      {
                        // @ts-ignore
                        val.groupList?.map((ele, idex) => {
                          return <WhiteRow data={ele} key={idex} onClick={onClickFuncLevelOne} />;
                        })
                      }
                      <WhiteRowTotal data={val} />
                    </Fragment>
                  );
                })}
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
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", cursor: "pointer", textDecoration: "underline", color: "#0000EE"}} onClick={getPharmacyDetl}>
                    {netAmount?.toLocaleString("en-US", {minimumFractionDigits: 2})}
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}>
                    {tax?.toLocaleString("en-US", {minimumFractionDigits: 2})}
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 2}}>
                    {discount?.toLocaleString("en-US", {minimumFractionDigits: 2})}
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 1}}>
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
                    {collAgainSale?.toLocaleString("en-US", {minimumFractionDigits: 2})}
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
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", cursor: "pointer", textDecoration: "underline", color: "#0000EE"}} onClick={onClickCreditInsuranceBill}>
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
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", cursor: "pointer", textDecoration: "underline", color: "#0000EE"}} onClick={onClickUnsettledAmount}>
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
                  <TableCell align="left" sx={{width: "25%", fontSize: "12px", color: "red", fontWeight: "bold"}}>
                    Round Off
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}>
                    {roundOff?.toLocaleString("en-US", {minimumFractionDigits: 2})}
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
                    {groupCollection?.toLocaleString("en-US", {minimumFractionDigits: 2})}
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", fontWeight: "bold"}}>
                    {groupNetddctRoundoff?.toLocaleString("en-US", {minimumFractionDigits: 2})}
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", fontWeight: "bold"}}>
                    {groupTax?.toLocaleString("en-US", {minimumFractionDigits: 2})}
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", fontWeight: "bold", pr: 2}}>
                    {groupDis?.toLocaleString("en-US", {minimumFractionDigits: 2})}
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", fontWeight: "bold", pr: 1}}>
                    {groupGross?.toLocaleString("en-US", {minimumFractionDigits: 2})}
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
                  <TableCell align="left" sx={{width: "25%", fontSize: "12px", color: "red", fontWeight: "bold"}}>
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
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", cursor: "pointer", textDecoration: "underline", color: "#0000EE"}} onClick={onClickAdvanceCollection}>
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
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", cursor: "pointer", textDecoration: "underline", color: "#0000EE"}} onClick={onClickCreditInsuranceBillCollection}>
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
                    {totalCounterCollection?.toLocaleString("en-US", {minimumFractionDigits: 2})}
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
                    {general?.toLocaleString("en-US", {minimumFractionDigits: 2})}
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
                    {otherType?.toLocaleString("en-US", {minimumFractionDigits: 2})}
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
                    {discntTotal?.toLocaleString("en-US", {minimumFractionDigits: 2})}
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
