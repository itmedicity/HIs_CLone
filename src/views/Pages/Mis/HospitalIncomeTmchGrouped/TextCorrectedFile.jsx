import React, {Fragment, memo, useCallback, useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ReportHeader from "../../../Components/ReportHeader";
import ReportBottomMenu from "../Components/ReportBottomMenu";
import MenuButton from "../Components/MenuButton";
import ReportModal from "../func/ReportModal";
import PharmacyReoprtModal from "../func/PharmacyReoprtModal";
import CreditInsuranceBillModal from "../func/CreditInsuranceBillModal";
import UnsettledAmntModal from "../func/UnsettledAmntModal";
import AdvanceCollcetionDetl from "../func/AdvanceCollcetionDetl";
import CreditInsurBillCollModal from "../func/CreditInsurBillCollModal";
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
import {getMisGroup, getMisGroupMaster, getRoundOff} from "../../../../Redux-Slice/incomeCollectionSlice/misGroupMastSlice";
import {getGrandTotal, getIncomeReportList, getMisGroupMasterList, getPhamracyIncome} from "../func/misFunc";
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
import LightBlueRow from "./LightBlueRow";
import WhiteRow from "./WhiteRow";
import WhiteRowTotal from "./WhiteRowTotal";
import {axiosinstance} from "../../../../controllers/AxiosConfig";
import "./Style.css";

/**
 * Component for displaying hospital income reports with grouped financial data.
 * Retrieves state from sessionStorage for rendering in a new tab.
 */
const IncomeReports = () => {
  const dispatch = useDispatch();

  // Retrieve state from sessionStorage
  const savedState = sessionStorage.getItem("incomeReportState");
  const state = savedState ? JSON.parse(savedState) : null;

  // State variables
  const [misGroupList, setMisGroupList] = useState([]);
  const [misReportList, setMisReportList] = useState([]);
  const [grand, setGrand] = useState({});
  const [general, setGeneral] = useState(0);
  const [otherType, setOtherType] = useState(0);
  const [pharmacyIc, setPharmacyIc] = useState({discount: 0, grossAmount: 0, netAmount: 0, tax: 0});
  const [pharma1, setPharma1] = useState([]);
  const [pharma2, setPharma2] = useState([]);
  const [pharma3, setPharma3] = useState([]);
  const [pharma4, setPharma4] = useState([]);
  const [pharmacyDetl, setPharmacyDetl] = useState({pharma1: [], pharma2: [], pharma3: [], pharma4: []});
  const [misCollection, setMisCollection] = useState([
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
  const [rndOff, setRndOff] = useState(0);
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

  // Redux selectors
  const collection = useSelector((state) => state.collectionTssh, shallowEqual);
  const pharmacyIncome = useSelector((state) => state.pharmacyIncomeTssh, shallowEqual);
  const procedureIncome = useSelector((state) => state.procedureIncomeTssh, shallowEqual);
  const misGroup = useSelector((state) => state.misGroup, shallowEqual);

  // Memoized values
  const proIncome = useMemo(() => procedureIncome, [procedureIncome]);
  const {discount, netAmount, tax} = pharmacyIc;
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

  // Formatted financial values
  const advanceCollection = ensureNumber(misCollection[0]?.advanceCollection).toLocaleString("en-US", {minimumFractionDigits: 2});
  const advanceRefund = ensureNumber(misCollection[1]?.advanceRefund).toLocaleString("en-US", {minimumFractionDigits: 2});
  const advanceSettled = ensureNumber(misCollection[2]?.advanceSettled).toLocaleString("en-US", {minimumFractionDigits: 2});
  const collectionAgainstSalesDeduction = ensureNumber(misCollection[3]?.collectionAgainstSalesDeduction);
  const collectionAgainstSalesTotal = ensureNumber(misCollection[4]?.collectionAgainstSalesTotal);
  const complimentory = ensureNumber(misCollection[5]?.complimentory).toLocaleString("en-US", {minimumFractionDigits: 2});
  const creditInsuranceBillCollection = ensureNumber(misCollection[6]?.creditInsuranceBillCollection).toLocaleString("en-US", {minimumFractionDigits: 2});
  const ipConsolidatedDiscount = ensureNumber(misCollection[7]?.ipConsolidatedDiscount).toLocaleString("en-US", {minimumFractionDigits: 2});
  const ipPreviousDayDiscount = ensureNumber(misCollection[8]?.ipPreviousDayDiscount).toLocaleString("en-US", {minimumFractionDigits: 2});
  const unsettledAmount = ensureNumber(misCollection[9]?.unsettledAmount).toLocaleString("en-US", {minimumFractionDigits: 2});
  const ippreviousDayCollection = ensureNumber(misCollection[10]?.ippreviousDayCollection).toLocaleString("en-US", {minimumFractionDigits: 2});
  const creditInsuranceBill = ensureNumber(misCollection[11]?.creditInsuranceBill).toLocaleString("en-US", {minimumFractionDigits: 2});
  const creditInsuranceBillTax = ensureNumber(misCollection[11]?.tax).toLocaleString("en-US", {minimumFractionDigits: 2});

  const collAgainSale = useMemo(() => collectionAgainstSalesTotal + collectionAgainstSalesDeduction - netAmount, [collectionAgainstSalesTotal, collectionAgainstSalesDeduction, netAmount]);

  const totals = useMemo(() => {
    const ipConatedDiscount = ensureNumber(misCollection[7]?.ipConsolidatedDiscount);
    const advSettled = ensureNumber(misCollection[2]?.advanceSettled);
    const creditInsurBill = ensureNumber(misCollection[11]?.creditInsuranceBill);
    const unsettledAmnt = ensureNumber(misCollection[9]?.unsettledAmount);
    const groupCollection = unsettledAmnt + creditInsurBill + advSettled + collAgainSale;
    const groupTax = ensureNumber(grand?.groupTax);
    const groupNet = ensureNumber(grand?.groupNet) + groupTax - ipConatedDiscount;
    const groupDis = ensureNumber(grand?.groupDis) + ipConatedDiscount;
    const groupGross = ensureNumber(grand?.groupGross);
    const roundOff = groupCollection - groupNet - rndOff + netAmount;
    const groupNetddctRoundoff = groupNet + roundOff;

    return {ipConatedDiscount, advSettled, creditInsurBill, unsettledAmnt, groupCollection, groupTax, groupNet, groupDis, groupGross, roundOff, groupNetddctRoundoff};
  }, [misCollection, grand, rndOff, netAmount, collAgainSale]);

  const totalCounterCollection = useMemo(
    () =>
      collAgainSale +
      ensureNumber(misCollection[0]?.advanceCollection) +
      ensureNumber(misCollection[6]?.creditInsuranceBillCollection) +
      ensureNumber(misCollection[10]?.ippreviousDayCollection) -
      ensureNumber(misCollection[1]?.advanceRefund),
    [collAgainSale, misCollection]
  );

  /**
   * Fetches detailed report data for a specific income group and opens a modal.
   * @param {Object} data - The income group data.
   */
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

  /**
   * Fetches pharmacy detail data and opens a modal.
   */
  const getPharmacyDetl = useCallback(async () => {
    setLayout1("fullscreen");
    try {
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
    } catch (error) {
      console.error("Error fetching pharmacy details:", error);
    }
  }, [state]);

  /**
   * Fetches credit insurance bill details and opens a modal.
   */
  const onClickCreditInsuranceBill = useCallback(async () => {
    setLayout2("fullscreen");
    try {
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
    } catch (error) {
      console.error("Error fetching credit insurance bill details:", error);
    }
  }, [state]);

  /**
   * Fetches unsettled amount details and opens a modal.
   */
  const onClickUnsettledAmount = useCallback(async () => {
    setLayout3("fullscreen");
    try {
      const results = await getUnsettledBillDetl(state);
      setUnsettled(results || []);
    } catch (error) {
      console.error("Error fetching unsettled amount details:", error);
    }
  }, [state]);

  /**
   * Fetches advance collection details and opens a modal.
   */
  const onClickAdvanceCollection = useCallback(async () => {
    setLayout4("fullscreen");
    try {
      const results = await advanceCollectionDetail(state);
      setAdvanceCollDetl(results || []);
    } catch (error) {
      console.error("Error fetching advance collection details:", error);
    }
  }, [state]);

  /**
   * Fetches credit insurance bill collection details and opens a modal.
   */
  const onClickCreditInsuranceBillCollection = useCallback(async () => {
    setLayout5("fullscreen");
    try {
      const [res1, res2] = await Promise.all([credInsuranceCollectionModalData1(state), credInsuranceCollectionModalData2(state)]);

      setCredInsuColl0(res1 || []);
      setCredInsuColl1(res2 || []);
    } catch (error) {
      console.error("Error fetching credit insurance bill collection details:", error);
    }
  }, [state]);

  // Update pharmacy details
  useEffect(() => {
    setPharmacyDetl({pharma1, pharma2, pharma3, pharma4});
  }, [pharma1, pharma2, pharma3, pharma4]);

  // Update credit insurance details
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

  // Update credit insurance collection
  useEffect(() => {
    setCredInsuranceCol({data0: credInsuColl0, data1: credInsuColl1});
  }, [credInsuColl0, credInsuColl1]);

  // Dispatch actions on state change
  useEffect(() => {
    if (!state) return;

    const thunks = [
      getMisGroup,
      getMisGroupMaster,
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
    ];

    thunks.forEach((thunk) => dispatch(thunk(state)));
  }, [dispatch, state]);

  // Process data updates
  useEffect(() => {
    // Process collection data
    if (Object.keys(collection).length > 0) {
      const misColl = [
        {
          advanceCollection: collection?.advanceCollection?.status === 1 ? collection.advanceCollection.data.reduce((acc, curr) => acc + curr.AMT, 0) : 0,
          tax: collection?.advanceCollection?.status === 1 ? collection.advanceCollection.data.reduce((acc, curr) => acc + curr.TAX, 0) : 0,
          status: collection?.advanceCollection?.status === 1 || collection?.advanceCollection?.status === 2,
        },
        {
          advanceRefund: collection?.advanceRefund?.status === 1 ? collection.advanceRefund.data.reduce((acc, curr) => acc + curr.AMT, 0) : 0,
          tax: collection?.advanceRefund?.status === 1 ? collection.advanceRefund.data.reduce((acc, curr) => acc + curr.TAX, 0) : 0,
          status: collection?.advanceRefund?.status === 1 || collection?.advanceRefund?.status === 2,
        },
        {
          advanceSettled: collection?.advanceSettled?.status === 1 ? collection.advanceSettled.data.reduce((acc, curr) => acc + curr.AMT, 0) : 0,
          tax: collection?.advanceSettled?.status === 1 ? collection.advanceSettled.data.reduce((acc, curr) => acc + curr.TAX, 0) : 0,
          status: collection?.advanceSettled?.status === 1 || collection?.advanceSettled?.status === 2,
        },
        {
          collectionAgainstSalesDeduction: collection?.collectionAgainstSalesDeduction?.status === 1 ? collection.collectionAgainstSalesDeduction.data.reduce((acc, curr) => acc + curr.AMT, 0) : 0,
          tax: collection?.collectionAgainstSalesDeduction?.status === 1 ? collection.collectionAgainstSalesDeduction.data.reduce((acc, curr) => acc + curr.TAX, 0) : 0,
          status: collection?.collectionAgainstSalesDeduction?.status === 1 || collection?.collectionAgainstSalesDeduction?.status === 2,
        },
        {
          collectionAgainstSalesTotal: collection?.collectionAgainstSalesTotal?.status === 1 ? collection.collectionAgainstSalesTotal.data.reduce((acc, curr) => acc + curr.AMT, 0) : 0,
          status: collection?.collectionAgainstSalesTotal?.status === 1 || collection?.collectionAgainstSalesTotal?.status === 2,
        },
        {
          complimentory: collection?.complimentory?.status === 1 ? collection.complimentory.data.reduce((acc, curr) => acc + curr.AMT, 0) : 0,
          tax: collection?.complimentory?.status === 1 ? collection.complimentory.data.reduce((acc, curr) => acc + curr.TAX, 0) : 0,
          status: collection?.complimentory?.status === 1 || collection?.complimentory?.status === 2,
        },
        {
          creditInsuranceBillCollection: collection?.creditInsuranceBillCollection?.status === 1 ? collection.creditInsuranceBillCollection.data.reduce((acc, curr) => acc + curr.AMT, 0) : 0,
          tax: collection?.creditInsuranceBillCollection?.status === 1 ? collection.creditInsuranceBillCollection.data.reduce((acc, curr) => acc + curr.TAX, 0) : 0,
          status: collection?.creditInsuranceBillCollection?.status === 1 || collection?.creditInsuranceBillCollection?.status === 2,
        },
        {
          ipConsolidatedDiscount: collection?.ipConsolidatedDiscount?.status === 1 ? collection.ipConsolidatedDiscount.data.reduce((acc, curr) => acc + curr.DISCOUNT, 0) : 0,
          status: collection?.ipConsolidatedDiscount?.status === 1 || collection?.ipConsolidatedDiscount?.status === 2,
        },
        {
          ipPreviousDayDiscount: collection?.ipPreviousDayDiscount?.status === 1 ? collection.ipPreviousDayDiscount.data.reduce((acc, curr) => acc + curr.DISCOUNT, 0) : 0,
          status: collection?.ipPreviousDayDiscount?.status === 1 || collection?.ipPreviousDayDiscount?.status === 2,
        },
        {
          unsettledAmount: collection?.unsettledAmount?.status === 1 ? collection.unsettledAmount.data.reduce((acc, curr) => acc + curr.AMT, 0) : 0,
          tax: collection?.unsettledAmount?.status === 1 ? collection.unsettledAmount.data.reduce((acc, curr) => acc + curr.TAX, 0) : 0,
          status: collection?.unsettledAmount?.status === 1 || collection?.unsettledAmount?.status === 2,
        },
        {
          ippreviousDayCollection: collection?.ippreviousDayCollection?.status === 1 ? collection.ippreviousDayCollection.data.reduce((acc, curr) => acc + curr.AMT, 0) : 0,
          tax: collection?.ippreviousDayCollection?.status === 1 ? collection.ippreviousDayCollection.data.reduce((acc, curr) => acc + curr.TAX, 0) : 0,
          status: collection?.ippreviousDayCollection?.status === 1 || collection?.ippreviousDayCollection?.status === 2,
        },
        {
          creditInsuranceBill:
            collection?.creditInsuranceBill?.status === 1
              ? collection.creditInsuranceBill.data.reduce((acc, curr) => acc + curr.AMT, 0) + collection.creditInsuranceBillPending.data.reduce((acc, curr) => acc + curr.AMT, 0)
              : 0,
          tax:
            collection?.creditInsuranceBill?.status === 1
              ? collection.creditInsuranceBill.data.reduce((acc, curr) => acc + curr.TAX, 0) + collection.creditInsuranceBillPending.data.reduce((acc, curr) => acc + curr.TAX, 0)
              : 0,
          status: collection?.creditInsuranceBill?.status === 1 || collection?.creditInsuranceBill?.status === 2,
        },
      ];

      if (!misColl.some((val) => !val.status)) {
        setMisCollection(misColl);
      }
    }

    // Process MIS group data
    const {misGroupState, misGroupMaster} = misGroup;
    getMisGroupMasterList(misGroupState, misGroupMaster).then(setMisGroupList);

    // Process procedure income
    if (proIncome?.patientTypeDiscount?.status === 1) {
      setGeneral(proIncome.patientTypeDiscount.data[0]?.DISCOUNT || 0);
      setOtherType(proIncome.patientTypeDiscount.data[1]?.DISCOUNT || 0);
    }
    const incomeArrayData = Object.values(proIncome)
      .filter((val) => val.income === true)
      .map((val) => (val.status === 1 ? val.data : []))
      .flat();
    getIncomeReportList(incomeArrayData, misGroupList).then(setMisReportList);

    // Process pharmacy income
    getPhamracyIncome(pharmacyIncome).then((value) => setPharmacyIc((prev) => ({...prev, ...value})));
    setRndOff(misGroup?.roundOff?.data?.reduce((acc, curr) => acc + curr.AMT, 0) || 0);

    // Calculate grand totals
    getGrandTotal(misReportList).then((ele) => {
      const grantTotal = {
        groupNet: ele?.reduce((acc, curr) => acc + curr.groupNet, 0) || 0,
        groupDis: ele?.reduce((acc, curr) => acc + curr.groupDiscnt, 0) || 0,
        groupTax: ele?.reduce((acc, curr) => acc + curr.groupTax, 0) || 0,
        groupGross: ele?.reduce((acc, curr) => acc + curr.groupGross, 0) || 0,
      };
      setGrand(grantTotal);
    });

    // Clean up sessionStorage
    sessionStorage.removeItem("incomeReportState");
  }, [collection, misGroup, proIncome, pharmacyIncome, misGroupList, misReportList]);

  return (
    <Box flex={1} sx={{backgroundColor: "lightgray", p: "1%"}}>
      <MenuButton navigateTo={"hospital_income_grouped"} />
      <ReportModal layout={layout} setLayout={setLayout} state={state} data={modalData} name="QMT" />
      <PharmacyReoprtModal layout={layout1} setLayout={setLayout1} state={state} data={pharmacyDetl} name="QMT" />
      <CreditInsuranceBillModal layout={layout2} setLayout={setLayout2} state={state} data={credtInsuranceDetl} name="QMT" />
      <UnsettledAmntModal layout={layout3} setLayout={setLayout3} state={state} data={unsettled} name="QMT" />
      <AdvanceCollcetionDetl layout={layout4} setLayout={setLayout4} state={state} data={advanceCollDetl} name="QMT" />
      <CreditInsurBillCollModal layout={layout5} setLayout={setLayout5} state={state} data={credInsuranceCol} name="QMT" />
      <Paper square sx={{borderColor: "black", border: 1}}>
        <ReportHeader name="Hospital Income" data={state} hosName="QMT" disable={false} />
        <Box sx={{overflow: "auto", padding: "15px"}}>
          <TableContainer component={Box}>
            <Table padding="none" size="small" aria-label="hospital income table">
              <TableHead sx={{backgroundColor: "#94C5F7"}}>
                <TableRow sx={{borderBottomColor: "black"}}>
                  <TableCell padding="none" align="right" sx={{width: "2%", fontWeight: "bolder", fontSize: "12px"}}>
                    Sl#
                  </TableCell>
                  <TableCell padding="none" align="left" sx={{width: "25%", fontWeight: "bolder", fontSize: "12px"}}>
                    Income Group
                  </TableCell>
                  <TableCell padding="none" align="right" sx={{width: "20%", fontWeight: "bolder", fontSize: "12px"}}>
                    Collection/Settlement(Rs)
                  </TableCell>
                  <TableCell padding="none" align="right" sx={{width: "20%", fontWeight: "bolder", fontSize: "12px"}}>
                    Net Amount(Rs)
                  </TableCell>
                  <TableCell padding="none" align="right" sx={{width: "20%", fontWeight: "bolder", fontSize: "12px"}}>
                    Tax
                  </TableCell>
                  <TableCell padding="none" align="right" sx={{width: "20%", fontWeight: "bolder", fontSize: "12px", pr: 2}}>
                    Discount(Rs)
                  </TableCell>
                  <TableCell padding="none" align="right" sx={{width: "20%", fontWeight: "bolder", fontSize: "12px", pr: 1}}>
                    Gross Amount(Rs)
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {misReportList?.map((val, idx) => (
                  <Fragment key={`group-${idx}`}>
                    <LightBlueRow data={val} />
                    {val.groupList?.map((ele, idex) => (
                      <WhiteRow data={ele} key={`subgroup-${idx}-${idex}`} onClick={onClickFuncLevelOne} />
                    ))}
                    <WhiteRowTotal data={val} />
                  </Fragment>
                ))}
                <TableRow>
                  <TableCell align="right" sx={{width: "2%", textAlign: "center"}}></TableCell>
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
                  <TableCell align="right" sx={{width: "2%", textAlign: "center"}}>
                    <ArrowRightIcon sx={{display: "flex", fontSize: 15}} />
                  </TableCell>
                  <TableCell align="left" sx={{width: "25%", fontSize: "12px", textTransform: "capitalize"}}>
                    Pharmacy Medicine Sale
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", cursor: "pointer", textDecoration: "underline", color: "#0000EE"}} onClick={getPharmacyDetl}>
                    {netAmount.toLocaleString("en-US", {minimumFractionDigits: 2})}
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}>
                    {tax.toLocaleString("en-US", {minimumFractionDigits: 2})}
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 2}}>
                    {discount.toLocaleString("en-US", {minimumFractionDigits: 2})}
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 1}}>
                    {(discount + netAmount + tax).toLocaleString("en-US", {minimumFractionDigits: 2})}
                  </TableCell>
                </TableRow>
                <TableRow sx={{backgroundColor: "#BBD8FF", height: "30px"}}>
                  <TableCell align="right" sx={{width: "2%", fontWeight: "bolder", fontSize: "12px"}}></TableCell>
                  <TableCell align="left" colSpan={6} sx={{fontWeight: "bolder", fontSize: "12px"}}></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right" sx={{width: "2%", textAlign: "center", fontSize: "12px"}}>
                    <ArrowRightIcon sx={{display: "flex", fontSize: 15}} />
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
                    <ArrowRightIcon sx={{display: "flex", fontSize: 15}} />
                  </TableCell>
                  <TableCell align="left" sx={{width: "25%", fontSize: "12px"}}>
                    Petty Cash Amount
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}>
                    0.00
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 2}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 1}}></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right" sx={{width: "2%", textAlign: "center", fontSize: "12px"}}>
                    <ArrowRightIcon sx={{display: "flex", fontSize: 15}} />
                  </TableCell>
                  <TableCell align="left" sx={{width: "25%", fontSize: "12px"}}>
                    Tax Amount
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}>
                    {tax.toLocaleString("en-US", {minimumFractionDigits: 2})}
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 2}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 1}}></TableCell>
                </TableRow>
                <TableRow sx={{backgroundColor: "#BBD8FF", height: "30px"}}>
                  <TableCell align="right" sx={{width: "2%", fontWeight: "bolder", fontSize: "12px"}}></TableCell>
                  <TableCell align="left" colSpan={6} sx={{fontWeight: "bolder", fontSize: "12px"}}></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right" sx={{width: "2%", textAlign: "center", fontSize: "12px"}}>
                    <ArrowRightIcon sx={{display: "flex", fontSize: 15}} />
                  </TableCell>
                  <TableCell align="left" sx={{width: "25%", fontSize: "12px"}}>
                    Collection Against Sales (A)
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}>
                    {collAgainSale.toLocaleString("en-US", {minimumFractionDigits: 2})}
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 2}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 1}}></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right" sx={{width: "2%", textAlign: "center", fontSize: "12px"}}>
                    <ArrowRightIcon sx={{display: "flex", fontSize: 15}} />
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
                    <ArrowRightIcon sx={{display: "flex", fontSize: 15}} />
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
                    <ArrowRightIcon sx={{display: "flex", fontSize: 15}} />
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
                    <ArrowRightIcon sx={{display: "flex", fontSize: 15}} />
                  </TableCell>
                  <TableCell align="left" sx={{width: "25%", fontSize: "12px", color: "red", fontWeight: "bold"}}>
                    Round Off
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}>
                    {totals.roundOff.toLocaleString("en-US", {minimumFractionDigits: 2})}
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
                    {totals.groupCollection.toLocaleString("en-US", {minimumFractionDigits: 2})}
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", fontWeight: "bold"}}>
                    {totals.groupNetddctRoundoff.toLocaleString("en-US", {minimumFractionDigits: 2})}
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", fontWeight: "bold"}}>
                    {totals.groupTax.toLocaleString("en-US", {minimumFractionDigits: 2})}
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", fontWeight: "bold", pr: 2}}>
                    {totals.groupDis.toLocaleString("en-US", {minimumFractionDigits: 2})}
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", fontWeight: "bold", pr: 1}}>
                    {totals.groupGross.toLocaleString("en-US", {minimumFractionDigits: 2})}
                  </TableCell>
                </TableRow>
                <TableRow sx={{backgroundColor: "#BBD8FF", height: "30px"}}>
                  <TableCell align="right" sx={{width: "2%", fontWeight: "bolder", fontSize: "12px"}}></TableCell>
                  <TableCell align="left" colSpan={6} sx={{fontWeight: "bolder", fontSize: "12px"}}></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right" sx={{width: "2%", textAlign: "center", fontSize: "12px"}}>
                    <ArrowRightIcon sx={{display: "flex", fontSize: 15}} />
                  </TableCell>
                  <TableCell align="left" sx={{width: "25%", fontSize: "12px"}}>
                    Credit/Insurance Bill Discount
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}>
                    0.00
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 2}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 1}}></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right" sx={{width: "2%", textAlign: "center", fontSize: "12px"}}>
                    <ArrowRightIcon sx={{display: "flex", fontSize: 15}} />
                  </TableCell>
                  <TableCell align="left" sx={{width: "25%", fontSize: "12px"}}>
                    Credit/Insurance WriteOff Amount
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}>
                    0.00
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 2}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 1}}></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right" sx={{width: "2%", textAlign: "center", fontSize: "12px"}}>
                    <ArrowRightIcon sx={{display: "flex", fontSize: 15}} />
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
                    <ArrowRightIcon sx={{display: "flex", fontSize: 15}} />
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
                    <ArrowRightIcon sx={{display: "flex", fontSize: 15}} />
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
                    <ArrowRightIcon sx={{display: "flex", fontSize: 15}} />
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
                    <ArrowRightIcon sx={{display: "flex", fontSize: 15}} />
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
                    <ArrowRightIcon sx={{display: "flex", fontSize: 15}} />
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
                <TableRow sx={{backgroundColor: "#BBD8FF", height: "30px"}}>
                  <TableCell align="right" sx={{width: "2%", fontWeight: "bolder", fontSize: "12px"}}></TableCell>
                  <TableCell align="left" colSpan={6} sx={{fontWeight: "bolder", fontSize: "12px"}}></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right" sx={{width: "2%", textAlign: "center", fontSize: "12px"}}></TableCell>
                  <TableCell align="left" sx={{width: "25%", fontSize: "12px"}}>
                    Total Counter Collection( A + C + D + E - B)
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}>
                    {totalCounterCollection.toLocaleString("en-US", {minimumFractionDigits: 2})}
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
                    <ArrowRightIcon sx={{display: "flex", fontSize: 15}} />
                  </TableCell>
                  <TableCell align="left" sx={{width: "25%", fontSize: "12px"}}>
                    General
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}>
                    {general.toLocaleString("en-US", {minimumFractionDigits: 2})}
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 2}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 1}}></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right" sx={{width: "2%", textAlign: "center", fontSize: "12px"}}>
                    <ArrowRightIcon sx={{display: "flex", fontSize: 15}} />
                  </TableCell>
                  <TableCell align="left" sx={{width: "25%", fontSize: "12px"}}>
                    Other Type
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}>
                    {otherType.toLocaleString("en-US", {minimumFractionDigits: 2})}
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
                    {discntTotal.toLocaleString("en-US", {minimumFractionDigits: 2})}
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
        <ReportBottomMenu ClinicName="Quilon Medical Trust" UserName="Admin" />
      </Paper>
    </Box>
  );
};

export default memo(IncomeReports);
