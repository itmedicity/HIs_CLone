// @ts-nocheck
import React, { Fragment, memo, useCallback, useMemo, useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'
import {
    getAdvanceCollection,
    getAdvanceRefund,
    getAdvanceSettled,
    getcollectionagainSaleTotal,
    getcollectionagainSaleDeduction,
    getcomplimentory,
    getcreditInsuranceBillCollection,
    getIpconsolidatedDiscount,
    getipPreviousDayDiscount,
    getunsettledAmount,
    getipPreviousDayCollection,
    getipcreditInsuranceBill,
    getipcreditInsuranceBillPending
} from '../../../../Redux-Slice/incomeCollectionSlice/collectionSlice';
import {
    getProincome1,
    getProincome2,
    getProincome3,
    getProincome4,
    getPatietTypeDiscount,
    theaterIncome
} from '../../../../Redux-Slice/incomeCollectionSlice/incomeProcedureSlice'
import {
    getPhaSalePart1,
    getPhaSalePart2,
    getPhaSalePart3,
    getPhaReturnPart1,
    getPhaReturnPart2,
    getPhaReturnPart3
} from '../../../../Redux-Slice/incomeCollectionSlice/incomeSlice'
// @ts-ignore
// @ts-ignore
import { Box, Icon, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import ReportHeader from '../../../Components/ReportHeader';
import './Style.css'
import { getMisGroup } from '../../../../Redux-Slice/incomeCollectionSlice/misGroupMastSlice';
import { getMisGroupMaster } from '../../../../Redux-Slice/incomeCollectionSlice/misGroupMastSlice';
import LightBlueRow from './LightBlueRow';
import WhiteRow from './WhiteRow';
import WhiteRowTotal from './WhiteRowTotal';
import { getGrandTotal, getIncomeReportList, getMisGroupMasterList, getPhamracyIncome } from '../func/misFunc';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import _ from 'underscore';
import ReportModal from '../func/ReportModal';
import { axiosinstance } from '../../../../controllers/AxiosConfig';
import PharmacyReoprtModal from '../func/PharmacyReoprtModal';
import CreditInsuranceBillModal from '../func/CreditInsuranceBillModal';
import { advanceCollectionDetail, credInsuranceCollectionModalData1, credInsuranceCollectionModalData2, creditInsuranceBillDetlPart1, creditInsuranceBillDetlPart2, creditInsuranceBillDetlPart3, creditInsuranceBillDetlPart4, creditInsuranceBillDetlPart5, creditInsuranceBillDetlPart6, getUnsettledBillDetl } from './QmtFunc';
import UnsettledAmntModal from '../func/UnsettledAmntModal';
import AdvanceCollcetionDetl from '../func/AdvanceCollcetionDetl';
import CreditInsurBillCollModal from '../func/CreditInsurBillCollModal';

const IncomeReports = () => {

    const dispatch = useDispatch();
    const { state } = useLocation();

    const componentState = useMemo(state => state, [state]);

    const [misGroupList, setMisGroupList] = useState([]);
    const [misReortList, setMisReportList] = useState([]);
    const [patientDiscount, setPatientDiscount] = useState([]);
    const [grand, setGrand] = useState({});

    const [general, setGeneral] = useState(0);
    const [otherType, setOtherType] = useState(0);
    const discntTotal = general + otherType;

    const [pharamcyIc, setPharamcyIc] = useState({
        discount: 0,
        grossAmount: 0,
        netAmount: 0,
        tax: 0
    });

    // Pharmacy 
    const [pharma1, setPharma1] = useState([])
    const [pharma2, setPharma2] = useState([])
    const [pharma3, setPharma3] = useState([])
    const [pharma4, setPharma4] = useState([])

    const [pharmacyDetl, setPharmacyDetl] = useState({
        pharma1: [],
        pharma2: [],
        pharma3: [],
        pharma4: [],
    })

    useEffect(() => {
        setPharmacyDetl({
            pharma1: pharma1,
            pharma2: pharma2,
            pharma3: pharma3,
            pharma4: pharma4,
        })
    }, [pharma1, pharma2, pharma3, pharma4,])

    const {
        discount,
        grossAmount,
        netAmount,
        tax
    } = pharamcyIc;

    const GrosPharma = discount + netAmount + tax;

    const statesss = useSelector((state) => state);

    // @ts-ignore
    const collection = useSelector((state) => state.collection);
    // @ts-ignore
    // @ts-ignore
    const pharmacyIncome = useSelector((state) => state.pharmacyIncome, _.isEqual);
    // @ts-ignore
    const procedureIncome = useSelector((state) => state.procedureIncome);
    const proIncome = useMemo(() => procedureIncome, [procedureIncome]);
    // @ts-ignore
    const misGroup = useSelector((state) => state.misGroup);
    const misGroupLst = useMemo(() => misGroupList, [misGroupList])

    const [misCollection, setMisCollrction] = useState([
        { advanceCollection: 0, tax: 0, status: false },
        { advanceRefund: 0, tax: 0, status: false },
        { advanceSettled: 0, tax: 0, status: false },
        { collectionAgainstSalesDeduction: 0, tax: 0, status: false },
        { collectionAgainstSalesTotal: 0, status: false },
        { complimentory: 0, tax: 0, status: false },
        { creditInsuranceBillCollection: 0, tax: 0, status: false },
        { ipConsolidatedDiscount: 0, status: false },
        { ipPreviousDayDiscount: 0, status: false },
        { unsettledAmount: 0, tax: 0, status: false },
        { ippreviousDayCollection: 0, tax: 0, status: false },
        { creditInsuranceBill: 0, tax: 0, status: false }
    ])

    const advanceCollection = misCollection?.[0].advanceCollection?.toLocaleString('en-US', { minimumFractionDigits: 2 })
    const advanceRefund = misCollection?.[1].advanceRefund?.toLocaleString('en-US', { minimumFractionDigits: 2 })
    const advanceSettled = misCollection?.[2].advanceSettled?.toLocaleString('en-US', { minimumFractionDigits: 2 })
    const collectionAgainstSalesDeduction = misCollection?.[3].collectionAgainstSalesDeduction
    const collectionAgainstSalesTotal = misCollection?.[4].collectionAgainstSalesTotal
    const complimentory = misCollection?.[5].complimentory?.toLocaleString('en-US', { minimumFractionDigits: 2 })
    const creditInsuranceBillCollection = misCollection?.[6].creditInsuranceBillCollection?.toLocaleString('en-US', { minimumFractionDigits: 2 })
    const ipConsolidatedDiscount = misCollection?.[7].ipConsolidatedDiscount?.toLocaleString('en-US', { minimumFractionDigits: 2 })
    const ipPreviousDayDiscount = misCollection?.[8].ipPreviousDayDiscount?.toLocaleString('en-US', { minimumFractionDigits: 2 })
    const unsettledAmount = misCollection?.[9].unsettledAmount?.toLocaleString('en-US', { minimumFractionDigits: 2 })
    const ippreviousDayCollection = misCollection?.[10].ippreviousDayCollection?.toLocaleString('en-US', { minimumFractionDigits: 2 })
    const creditInsuranceBill = misCollection?.[11].creditInsuranceBill?.toLocaleString('en-US', { minimumFractionDigits: 2 })
    const creditInsuranceBillTax = misCollection?.[11].tax?.toLocaleString('en-US', { minimumFractionDigits: 2 })

    // @ts-ignore
    const collectionAgainSale = parseFloat(collectionAgainstSalesTotal)
    // @ts-ignore
    const collectionAgainReturn = parseFloat(collectionAgainstSalesDeduction)
    // @ts-ignore
    const collAgainSale = collectionAgainSale + collectionAgainReturn;
    //  DISPATCH ALL THE ACTION

    useEffect(() => {
        if (state === null) {
            return
        } else {
            //MIS GROUP NAME 
            // @ts-ignore
            dispatch(getMisGroup())
            // @ts-ignore
            dispatch(getMisGroupMaster())
            //COLLECTION PART
            // @ts-ignore
            dispatch(getAdvanceCollection(state))
            // @ts-ignore
            dispatch(getAdvanceRefund(state))
            // @ts-ignore
            dispatch(getAdvanceSettled(state))
            // @ts-ignore
            dispatch(getcollectionagainSaleTotal(state))
            // @ts-ignore
            dispatch(getcollectionagainSaleDeduction(state))
            // @ts-ignore
            dispatch(getcomplimentory(state))
            // @ts-ignore
            dispatch(getcreditInsuranceBillCollection(state))
            // @ts-ignore
            dispatch(getIpconsolidatedDiscount(state))
            // @ts-ignore
            dispatch(getipPreviousDayDiscount(state))
            // @ts-ignore
            dispatch(getunsettledAmount(state))
            // @ts-ignore
            dispatch(getipPreviousDayCollection(state))
            // @ts-ignore
            dispatch(getipcreditInsuranceBill(state))
            dispatch(getipcreditInsuranceBillPending(state))

            //INCOME PART
            // @ts-ignore
            dispatch(getProincome1(state))
            // @ts-ignore
            dispatch(getProincome2(state))
            // @ts-ignore
            dispatch(getProincome3(state))
            // @ts-ignore
            dispatch(getProincome4(state))
            // @ts-ignore
            dispatch(getPatietTypeDiscount(state))
            // @ts-ignore
            dispatch(getPhaSalePart1(state))
            // @ts-ignore
            dispatch(getPhaSalePart2(state))
            // @ts-ignore
            dispatch(getPhaSalePart3(state))
            // @ts-ignore
            dispatch(getPhaReturnPart1(state))
            // @ts-ignore
            dispatch(getPhaReturnPart2(state))
            // @ts-ignore
            dispatch(getPhaReturnPart3(state))
            // @ts-ignore
            dispatch(theaterIncome(state))

        }
    }, [state])

    // const { state } = locationData;

    useEffect(() => {
        if (Object.keys(collection).length > 0) {
            const misColl = [
                {
                    advanceCollection: collection?.advanceCollection?.status === 1 ?
                        collection?.advanceCollection?.data.reduce((accumulator, currentValue) => accumulator + currentValue.AMT, 0) : 0,
                    tax: collection?.advanceCollection?.status === 1 ?
                        collection?.advanceCollection?.data.reduce((accumulator, currentValue) => accumulator + currentValue.TAX, 0) : 0,
                    status: collection?.advanceCollection?.status === 1 || collection?.advanceCollection?.status === 2 ? true : false
                },
                {
                    advanceRefund: collection?.advanceRefund?.status === 1 ?
                        collection?.advanceRefund?.data.reduce((accumulator, currentValue) => accumulator + currentValue.AMT, 0) : 0,
                    tax: collection?.advanceRefund?.status === 1 ?
                        collection?.advanceRefund?.data.reduce((accumulator, currentValue) => accumulator + currentValue.TAX, 0) : 0,
                    status: collection?.advanceRefund?.status === 1 || collection?.advanceRefund?.status === 2 ? true : false
                },
                {
                    advanceSettled: collection?.advanceSettled?.status === 1 ?
                        collection?.advanceSettled?.data.reduce((accumulator, currentValue) => accumulator + currentValue.AMT, 0) : 0,
                    tax: collection?.advanceSettled?.status === 1 ?
                        collection?.advanceSettled?.data.reduce((accumulator, currentValue) => accumulator + currentValue.TAX, 0) : 0,
                    status: collection?.advanceSettled?.status === 1 || collection?.advanceSettled?.status === 2 ? true : false
                },
                {
                    collectionAgainstSalesDeduction: collection?.collectionAgainstSalesDeduction?.status === 1 ?
                        collection?.collectionAgainstSalesDeduction?.data.reduce((accumulator, currentValue) => accumulator + currentValue.AMT, 0) : 0,
                    tax: collection?.collectionAgainstSalesDeduction?.status === 1 ?
                        collection?.collectionAgainstSalesDeduction?.data.reduce((accumulator, currentValue) => accumulator + currentValue.TAX, 0) : 0,
                    status: collection?.collectionAgainstSalesDeduction?.status === 1 || collection?.collectionAgainstSalesDeduction?.status === 2 ? true : false
                },
                {
                    collectionAgainstSalesTotal: collection?.collectionAgainstSalesTotal?.status === 1 ?
                        collection?.collectionAgainstSalesTotal?.data.reduce((accumulator, currentValue) => accumulator + currentValue.AMT, 0) : 0,
                    status: collection?.collectionAgainstSalesTotal?.status === 1 || collection?.collectionAgainstSalesTotal?.status === 2 ? true : false
                },
                {
                    complimentory: collection?.complimentory?.status === 1 ?
                        collection?.complimentory?.data.reduce((accumulator, currentValue) => accumulator + currentValue.AMT, 0) : 0,
                    tax: collection?.complimentory?.status === 1 ?
                        collection?.complimentory?.data.reduce((accumulator, currentValue) => accumulator + currentValue.TAX, 0) : 0,
                    status: collection?.complimentory?.status === 1 || collection?.complimentory?.status === 2 ? true : false
                },
                {
                    creditInsuranceBillCollection: collection?.creditInsuranceBillCollection?.status === 1 ?
                        collection?.creditInsuranceBillCollection?.data.reduce((accumulator, currentValue) => accumulator + currentValue.AMT, 0) : 0,
                    tax: collection?.creditInsuranceBillCollection?.status === 1 ?
                        collection?.creditInsuranceBillCollection?.data.reduce((accumulator, currentValue) => accumulator + currentValue.TAX, 0) : 0,
                    status: collection?.creditInsuranceBillCollection?.status === 1 || collection?.creditInsuranceBillCollection?.status === 2 ? true : false
                },
                {
                    ipConsolidatedDiscount: collection?.ipConsolidatedDiscount?.status === 1 ?
                        collection?.ipConsolidatedDiscount?.data.reduce((accumulator, currentValue) => accumulator + currentValue.DISCOUNT, 0) : 0,
                    status: collection?.ipConsolidatedDiscount?.status === 1 || collection?.ipConsolidatedDiscount?.status === 2 ? true : false
                },
                {
                    ipPreviousDayDiscount: collection?.ipPreviousDayDiscount?.status === 1 ?
                        collection?.ipPreviousDayDiscount?.data.reduce((accumulator, currentValue) => accumulator + currentValue.DISCOUNT, 0) : 0,
                    status: collection?.ipPreviousDayDiscount?.status === 1 || collection?.ipPreviousDayDiscount?.status === 2 ? true : false
                },
                {
                    unsettledAmount: collection?.unsettledAmount?.status === 1 ?
                        collection?.unsettledAmount?.data.reduce((accumulator, currentValue) => accumulator + currentValue.AMT, 0) : 0,
                    tax: collection?.unsettledAmount?.status === 1 ?
                        collection?.unsettledAmount?.data.reduce((accumulator, currentValue) => accumulator + currentValue.TAX, 0) : 0,
                    status: collection?.unsettledAmount?.status === 1 || collection?.unsettledAmount?.status === 2 ? true : false
                },
                {
                    ippreviousDayCollection: collection?.ippreviousDayCollection?.status === 1 ?
                        collection?.ippreviousDayCollection?.data.reduce((accumulator, currentValue) => accumulator + currentValue.AMT, 0) : 0,
                    tax: collection?.ippreviousDayCollection?.status === 1 ?
                        collection?.ippreviousDayCollection?.data.reduce((accumulator, currentValue) => accumulator + currentValue.TAX, 0) : 0,
                    status: collection?.ippreviousDayCollection?.status === 1 || collection?.ippreviousDayCollection?.status === 2 ? true : false
                },
                {
                    creditInsuranceBill: collection?.creditInsuranceBill?.status === 1 ?
                        collection?.creditInsuranceBill?.data.reduce((accumulator, currentValue) => accumulator + currentValue.AMT, 0) +
                        collection?.creditInsuranceBillPending?.data.reduce((accumulator, currentValue) => accumulator + currentValue.AMT, 0)
                        : 0,
                    tax: collection?.creditInsuranceBill?.status === 1 ?
                        collection?.creditInsuranceBill?.data.reduce((accumulator, currentValue) => accumulator + currentValue.TAX, 0) +
                        collection?.creditInsuranceBillPending?.data.reduce((accumulator, currentValue) => accumulator + currentValue.TAX, 0)
                        : 0,
                    status: collection?.creditInsuranceBill?.status === 1 || collection?.creditInsuranceBill?.status === 2 ? true : false
                }
            ]

            const res = misColl?.find((val) => val.status === false)
            // console.log(misColl)
            // console.log(res)

            if (res === undefined) {
                // @ts-ignore
                setMisCollrction([
                    // @ts-ignore
                    // ...misCollection,
                    // @ts-ignore
                    { advanceCollection: misColl[0]?.advanceCollection, tax: misColl[0]?.tax, status: false },
                    // @ts-ignore
                    { advanceRefund: misColl[1]?.advanceRefund, tax: misColl[1]?.tax, status: false },
                    // @ts-ignore
                    { advanceSettled: misColl[2]?.advanceSettled, tax: misColl[2]?.tax, status: false },
                    // @ts-ignore
                    { collectionAgainstSalesDeduction: misColl[3]?.collectionAgainstSalesDeduction, tax: misColl[3]?.tax, status: false },
                    // @ts-ignore
                    { collectionAgainstSalesTotal: misColl[4]?.collectionAgainstSalesTotal, status: false },
                    // @ts-ignore
                    { complimentory: misColl[5]?.complimentory, tax: misColl[5]?.tax, status: false },
                    // @ts-ignore
                    { creditInsuranceBillCollection: misColl[6]?.creditInsuranceBillCollection, tax: misColl[6]?.tax, status: false },
                    // @ts-ignore
                    { ipConsolidatedDiscount: misColl[7]?.ipConsolidatedDiscount, status: false },
                    // @ts-ignore
                    { ipPreviousDayDiscount: misColl[8]?.ipPreviousDayDiscount, status: false },
                    // @ts-ignore
                    { unsettledAmount: misColl[9]?.unsettledAmount, tax: misColl[9]?.tax, status: false },
                    // @ts-ignore
                    { ippreviousDayCollection: misColl[10]?.ippreviousDayCollection, tax: misColl[10]?.tax, status: false },
                    // @ts-ignore
                    { creditInsuranceBill: misColl[11]?.creditInsuranceBill, tax: misColl[11]?.tax, status: false }
                ])
            }
        }
    }, [collection])

    // console.log(collection)
    // console.log(procedureIncome)


    useEffect(() => {
        // @ts-ignore
        const { misGroupState, misGroupMaster } = misGroup;
        getMisGroupMasterList(misGroupState, misGroupMaster).then((misGrpList) => {
            // console.log(misGrpList)
            // @ts-ignore
            setMisGroupList(misGrpList);
        })
    }, [misGroup])

    //UPDATE THE INCOME PART
    useEffect(() => {
        const incomeData = Object.values(proIncome);


        if (proIncome?.patientTypeDiscount?.status === 1) {
            // @ts-ignore
            setGeneral(proIncome?.patientTypeDiscount?.data?.[0].DISCOUNT)
            setOtherType(proIncome?.patientTypeDiscount?.data?.[1].DISCOUNT)
        }

        const incomeArrayData = incomeData?.filter(val => val.income === true)
            .map(val => val.status === 1 ? val.data : null)
            .flat()

        getIncomeReportList(incomeArrayData, misGroupLst).then((report) => {
            if (report !== undefined) {
                // console.log(report) 
                setMisReportList(report)
            }
        })

    }, [misGroupLst, proIncome])

    //PHARMACY COLLECTION INCOME PART
    useEffect(() => {
        getPhamracyIncome(pharmacyIncome).then((value) => {
            // @ts-ignore
            setPharamcyIc({
                ...pharamcyIc,
                ...value
            })
        })
    }, [pharmacyIncome])

    // @ts-ignore
    const C = parseFloat(misCollection?.[0].advanceCollection);
    // @ts-ignore
    const D = parseFloat(misCollection?.[6].creditInsuranceBillCollection);
    // @ts-ignore
    const E = parseFloat(misCollection?.[10].ippreviousDayCollection);
    // @ts-ignore
    const B = parseFloat(misCollection?.[1].advanceRefund);
    // @ts-ignore
    const totalCounterCollection = collAgainSale + C + D + E - B;

    //CALCULATE GRAND TOTALS
    useEffect(() => {
        getGrandTotal(misReortList).then((ele) => {
            let grantTotal = {
                groupNet: ele?.reduce((accumulator, currentValue) => accumulator + currentValue.groupNet, 0),
                groupDis: ele?.reduce((accumulator, currentValue) => accumulator + currentValue.groupDiscnt, 0),
                groupTax: ele?.reduce((accumulator, currentValue) => accumulator + currentValue.groupTax, 0),
                groupGross: ele?.reduce((accumulator, currentValue) => accumulator + currentValue.groupGross, 0)
            }
            setGrand(grantTotal)
        })
    }, [misReortList])

    // console.log(grand)
    // @ts-ignore
    const ipConatedDiscount = parseFloat(misCollection?.[7].ipConsolidatedDiscount)
    // @ts-ignore
    const advSettled = parseFloat(misCollection?.[2].advanceSettled);
    // @ts-ignore
    const creditInsurBill = parseFloat(misCollection?.[11].creditInsuranceBill);
    // @ts-ignore
    const unsettledAmnt = parseFloat(misCollection?.[9].unsettledAmount);

    const groupCollection = unsettledAmnt + creditInsurBill + advSettled + collAgainSale;
    // @ts-ignore
    const groupTax = parseFloat(grand?.groupTax) + tax;
    // @ts-ignore
    const groupNet = parseFloat(grand?.groupNet) + netAmount + groupTax - ipConatedDiscount;
    // @ts-ignore
    const groupDis = parseFloat(grand?.groupDis) + discount + ipConatedDiscount;
    // @ts-ignore
    const groupGross = parseFloat(grand?.groupGross) + GrosPharma;

    const roundOff = groupCollection - groupNet;
    const groupNetddctRoundoff = groupNet + roundOff;

    // const generalDiscount = patientDiscount

    /**********
     * MIS REPORTS DETALED REPORTS 
     */

    //FOR MODEL OPENING STATES
    const [layout, setLayout] = useState(undefined);
    const [layout1, setLayout1] = useState(undefined);
    const [layout2, setLayout2] = useState(undefined);
    const [layout3, setLayout3] = useState(undefined);
    const [layout4, setLayout4] = useState(undefined);
    const [layout5, setLayout5] = useState(undefined);

    const [modalData, setModalData] = useState({
        status: 0,
        reportName: '',
        reportData: []
    })

    const onClickFuncLevelOne = useCallback(async (data) => {
        let defautState = {
            status: 0,
            reportName: '',
            reportData: []
        }
        const reportName = data?.groupName;
        setLayout('fullscreen');
        if (reportName === 'BED') {
            // setModalData([])
            const bedIncomeDetl = async (state) => {
                setModalData(defautState)
                const result = await axiosinstance.post('/incomeDetl/bedIncome', state)
                const { success, data } = result.data;
                if (success === 1) {
                    setModalData({
                        status: 1,
                        reportName: 'Bed',
                        reportData: data
                    })
                } else {
                    setModalData(defautState)
                }
            }
            bedIncomeDetl(state)
        } else if (reportName === 'ROOM') {
            const roomIncomeDetl = async (state) => {
                setModalData(defautState)
                const result = await axiosinstance.post('/incomeDetl/roomRentIncome', state)
                const { success, data } = result.data;
                if (success === 1) {
                    setModalData({
                        status: 1,
                        reportName: 'Room',
                        reportData: data
                    })
                } else {
                    setModalData(defautState)
                }
            }
            roomIncomeDetl(state)
        } else if (reportName === 'NS') {
            const nsIncomeDetl = async (state) => {
                setModalData(defautState)
                const result = await axiosinstance.post('/incomeDetl/nsIncome', state)
                const { success, data } = result.data;
                if (success === 1) {
                    setModalData({
                        status: 1,
                        reportName: 'Ns',
                        reportData: data
                    })
                } else {
                    setModalData(defautState)
                }
            }
            nsIncomeDetl(state)
        } else if (reportName === 'OTHERS') {
            const othersIncomeDetl = async (state) => {
                setModalData(defautState)
                const result = await axiosinstance.post('/incomeDetl/otherIncome', state)
                const { success, data } = result.data;
                if (success === 1) {
                    setModalData({
                        status: 1,
                        reportName: 'Others',
                        reportData: data
                    })
                } else {
                    setModalData(defautState)
                }
            }
            othersIncomeDetl(state)
        } else if (reportName === 'CONSULTING') {
            const consultingIncomeDetl = async (state) => {
                setModalData(defautState)
                const result = await axiosinstance.post('/incomeDetl/consultingIncome', state)
                const { success, data } = result.data;
                if (success === 1) {
                    setModalData({
                        status: 1,
                        reportName: 'Consulting',
                        reportData: data
                    })
                } else {
                    setModalData(defautState)
                }
            }
            consultingIncomeDetl(state)
        } else if (reportName === 'THEATRE') {
            const theaterIncomeDetl = async (state) => {
                setModalData(defautState)
                const result = await axiosinstance.post('/incomeDetl/theaterIncome', state)
                const { success, data } = result.data;
                if (success === 1) {
                    setModalData({
                        status: 1,
                        reportName: 'Theater',
                        reportData: data
                    })
                } else {
                    setModalData(defautState)
                }
            }
            theaterIncomeDetl(state)
        } else if (reportName === 'OPERATION') {
            const surgeonIncomeDetl = async (state) => {
                setModalData(defautState)
                const result = await axiosinstance.post('/incomeDetl/surgeonIncome', state)
                const { success, data } = result.data;
                if (success === 1) {
                    setModalData({
                        status: 1,
                        reportName: 'Operation',
                        reportData: data
                    })
                } else {
                    setModalData(defautState)
                }
            }
            surgeonIncomeDetl(state)
        } else if (reportName === 'ANESTHESIA') {
            const anesthesiaIncomeDetl = async (state) => {
                setModalData(defautState)
                const result = await axiosinstance.post('/incomeDetl/anesthetiaIncome', state)
                const { success, data } = result.data;
                if (success === 1) {
                    setModalData({
                        status: 1,
                        reportName: 'Anesthesia',
                        reportData: data
                    })
                } else {
                    setModalData(defautState)
                }
            }
            anesthesiaIncomeDetl(state)
        } else if (reportName === 'CARDIOLOGY') {
            const cardiologyIncomeDetl = async (state) => {
                setModalData(defautState)
                const result = await axiosinstance.post('/incomeDetl/cardiologyIncome', state)
                const { success, data } = result.data;
                if (success === 1) {
                    setModalData({
                        status: 1,
                        reportName: 'Cardiology',
                        reportData: data
                    })
                } else {
                    setModalData(defautState)
                }
            }
            cardiologyIncomeDetl(state)
        } else if (reportName === 'DISPOSIBLE') {
            const disposibleIncomeDetl = async (state) => {
                setModalData(defautState)
                const result = await axiosinstance.post('/incomeDetl/disPosibleItemIncome', state)
                const { success, data } = result.data;
                if (success === 1) {
                    setModalData({
                        status: 1,
                        reportName: 'Disposible',
                        reportData: data
                    })
                } else {
                    setModalData(defautState)
                }
            }
            disposibleIncomeDetl(state)
        } else if (reportName === 'ICU') {
            const icuIncomeDetl = async (state) => {
                setModalData(defautState)
                const result = await axiosinstance.post('/incomeDetl/icuIncome', state)
                const { success, data } = result.data;
                if (success === 1) {
                    setModalData({
                        status: 1,
                        reportName: 'Icu',
                        reportData: data
                    })
                } else {
                    setModalData(defautState)
                }
            }
            icuIncomeDetl(state)
        } else if (reportName === 'ICU PROC') {
            const icuProIncomeDetl = async (state) => {
                setModalData(defautState)
                const result = await axiosinstance.post('/incomeDetl/icuprocedureIncome', state)
                const { success, data } = result.data;
                if (success === 1) {
                    setModalData({
                        status: 1,
                        reportName: 'Icu Procedure',
                        reportData: data
                    })
                } else {
                    setModalData(defautState)
                }
            }
            icuProIncomeDetl(state)
        } else if (reportName === 'RADIOLOGY') {
            const radiologyIncomeDetl = async (state) => {
                setModalData(defautState)
                const result = await axiosinstance.post('/incomeDetl/radiologyIncome', state)
                const { success, data } = result.data;
                if (success === 1) {
                    setModalData({
                        status: 1,
                        reportName: 'Radiology',
                        reportData: data
                    })
                } else {
                    setModalData(defautState)
                }
            }
            radiologyIncomeDetl(state)
        } else if (reportName === 'LAB') {
            const labIncomeDetl = async (state) => {
                setModalData(defautState)
                const result = await axiosinstance.post('/incomeDetl/laboratoryIncome', state)
                const { success, data } = result.data;
                if (success === 1) {
                    setModalData({
                        status: 1,
                        reportName: 'Laboratory',
                        reportData: data
                    })
                } else {
                    setModalData(defautState)
                }
            }
            labIncomeDetl(state)
        } else if (reportName === 'MRI') {
            const mriIncomeDetl = async (state) => {
                setModalData(defautState)
                const result = await axiosinstance.post('/incomeDetl/mriIncome', state)
                const { success, data } = result.data;
                if (success === 1) {
                    setModalData({
                        status: 1,
                        reportName: 'Mri',
                        reportData: data
                    })
                } else {
                    setModalData(defautState)
                }
            }
            mriIncomeDetl(state)
        } else if (reportName === 'DIET') {
            const dietIncomeDetl = async (state) => {
                setModalData(defautState)
                const result = await axiosinstance.post('/incomeDetl/dietIncome', state)
                const { success, data } = result.data;
                if (success === 1) {
                    setModalData({
                        status: 1,
                        reportName: 'Diet',
                        reportData: data
                    })
                } else {
                    setModalData(defautState)
                }
            }
            dietIncomeDetl(state)
        }


    }, [state])


    const getPharmacyDetl = useCallback(async () => {
        setLayout1('fullscreen');
        await axiosinstance.post('/incomeDetl/pharmacyIncomePart1', state).then((res) => {
            const { success, data } = res.data;
            if (success === 1) {
                setPharma1([...data])
            }
        })
        await axiosinstance.post('/incomeDetl/pharmacyIncomePart2', state).then((res) => {
            const { success, data } = res.data;
            if (success === 1) {
                setPharma2([...data])
            }
        })
        await axiosinstance.post('/incomeDetl/pharmacyIncomePart3', state).then((res) => {
            const { success, data } = res.data;
            if (success === 1) {
                setPharma3([...data])
            }
        })
        await axiosinstance.post('/incomeDetl/pharmacyIncomePart4', state).then((res) => {
            const { success, data } = res.data;
            if (success === 1) {
                setPharma4([...data])
            }
        })
    }, [])

    // CREDIT INSURANCE BILLING DETAILS 
    const [credDetlPard1, setCredDetlPard1] = useState([])
    const [credDetlPard2, setCredDetlPard2] = useState([])
    const [credDetlPard3, setCredDetlPard3] = useState([])
    const [credDetlPard4, setCredDetlPard4] = useState([])
    const [credDetlPard5, setCredDetlPard5] = useState([])
    const [credDetlPard6, setCredDetlPard6] = useState([])
    const [credtInsuranceDetl, setCredtInsuranceDetl] = useState({
        credit1: [],
        credit2: [],
        credit3: [],
        credit4: [],
        credit5: [],
        credit6: []
    })

    const onClickCreditInsuranceBill = useCallback(async () => {
        setLayout2('fullscreen');

        creditInsuranceBillDetlPart1(state).then((result) => {
            if (result !== undefined) {
                setCredDetlPard1([...result])
            }
        })

        creditInsuranceBillDetlPart2(state).then((result) => {
            if (result !== undefined) {
                setCredDetlPard2([...result])
            }
        })

        creditInsuranceBillDetlPart3(state).then((result) => {
            if (result !== undefined) {
                setCredDetlPard3([...result])
            }
        })

        creditInsuranceBillDetlPart4(state).then((result) => {
            if (result !== undefined) {
                setCredDetlPard4([...result])
            }
        })

        creditInsuranceBillDetlPart5(state).then((result) => {
            if (result !== undefined) {
                setCredDetlPard5([...result])
            }
        })

        creditInsuranceBillDetlPart6(state).then((result) => {
            if (result !== undefined) {
                setCredDetlPard6([...result])
            }
        })

    }, [state])

    useEffect(() => {
        setCredtInsuranceDetl({
            credit1: [...credDetlPard1],
            credit2: [...credDetlPard2],
            credit3: [...credDetlPard3],
            credit4: [...credDetlPard4],
            credit5: [...credDetlPard5],
            credit6: [...credDetlPard6]
        })
    }, [credDetlPard1, credDetlPard2, credDetlPard3, credDetlPard4, credDetlPard5, credDetlPard6])

    // ONcLICK UNSETTLED DETAILS
    const [unsettled, setUnsettled] = useState([])
    const onClickUnsettledAmount = useCallback(() => {
        setLayout3('fullscreen');
        getUnsettledBillDetl(state).then((results) => {
            setUnsettled([...results])
        })
    }, [state])

    //ADVANCE COLLCTION DETAILS [C]
    const [advanceCollDetl, setAdvanceCollDetl] = useState([])
    const onClickAdvanceCollection = useCallback(async () => {
        setLayout4('fullscreen');
        advanceCollectionDetail(state).then((results) => {
            setAdvanceCollDetl([...results])
        })
    }, [state])

    //  ONCLICK CREDIT INSURANCE BILL COLLECTION DETAILS MODAL 
    const [credInsuColl0, setCredInsuColl0] = useState([])
    const [credInsuColl1, setCredInsuColl1] = useState([])
    const [credInsuranceCol, setCredInsuranceCol] = useState({
        data0: [],
        data1: [],
    })

    useEffect(() => {
        setCredInsuranceCol({
            data0: [...credInsuColl0],
            data1: [...credInsuColl1]
        })
    }, [credInsuColl0, credInsuColl1])

    const onClickCreditInsuranceBillCollection = useCallback(async () => {
        setLayout5('fullscreen');
        credInsuranceCollectionModalData1(state).then((results) => {
            if (results !== undefined) {
                setCredInsuColl0([...results])
            }
        })

        credInsuranceCollectionModalData2(state).then((results) => {
            if (results !== undefined) {
                setCredInsuColl1([...results])
            }
        })

    }, [state])

    console.log(misCollection)

    return (
        <Box flex={1} sx={{ backgroundColor: 'lightgray', p: '1%' }} >
            {/* Detailed report model when open based on selected group using the "onClickFuncLevelOne" function */}
            <ReportModal
                layout={layout}
                setLayout={setLayout}
                state={state}
                data={modalData}
                name="QUILON MEDICAL TRUST"
            />
            {/* pHARMACY rEPORTS dETAILS mODAL */}
            <PharmacyReoprtModal
                layout={layout1}
                setLayout={setLayout1}
                state={state}
                data={pharmacyDetl}
                name="QUILON MEDICAL TRUST"
            />
            {/* Credit insurance Bill details */}
            <CreditInsuranceBillModal
                layout={layout2}
                setLayout={setLayout2}
                state={state}
                data={credtInsuranceDetl}
                name="QUILON MEDICAL TRUST"
            />
            {/* Unsettled amount Details */}
            <UnsettledAmntModal
                layout={layout3}
                setLayout={setLayout3}
                state={state}
                data={unsettled}
                name="QUILON MEDICAL TRUST"
            />
            {/* ADVANCE COLLECTION [C] */}
            <AdvanceCollcetionDetl
                layout={layout4}
                setLayout={setLayout4}
                state={state}
                data={advanceCollDetl}
                name="QUILON MEDICAL TRUST"
            />
            {/* CREDIT INSURANCE BILL COLLECTION  */}
            <CreditInsurBillCollModal
                layout={layout5}
                setLayout={setLayout5}
                state={state}
                data={credInsuranceCol}
                name="QUILON MEDICAL TRUST"
            />
            {/* Hospital income reports */}
            <Paper square sx={{ borderColor: 'black', border: 1 }}  >
                <ReportHeader name="Hospital Income" data={state} hosName="QUILON MEDICAL TRUST" disable={false} />
                <Box sx={{
                    overflow: 'auto',
                    padding: '15px'
                }} >
                    <TableContainer component={Box}>
                        <Table padding='none' sx={{}} size="small" aria-label="a dense table" >
                            <TableHead sx={{
                                backgroundColor: '#94C5F7',
                            }}
                            >
                                <TableRow sx={{
                                    p: 0, m: 0,
                                    borderBottomColor: 'black'
                                }} >
                                    <TableCell padding='none' variant='body' size='small' align="right" sx={{ width: '2%', fontWeight: 'bolder', fontSize: '12px' }} >Sl#</TableCell>
                                    <TableCell padding='none' variant='body' size='small' align="left" sx={{ width: '25%', fontWeight: 'bolder', fontSize: '12px' }}>Income Group</TableCell>
                                    <TableCell padding='none' variant='body' size='small' align="right" sx={{ width: '20%', fontWeight: 'bolder', fontSize: '12px' }}>Collection/Settlement(Rs)</TableCell>
                                    <TableCell padding='none' variant='body' size='small' align="right" sx={{ width: '20%', fontWeight: 'bolder', fontSize: '12px' }}>Net Amount(Rs)</TableCell>
                                    <TableCell padding='none' variant='body' size='small' align="right" sx={{ width: '20%', fontWeight: 'bolder', fontSize: '12px' }}>Tax</TableCell>
                                    <TableCell padding='none' variant='body' size='small' align="right" sx={{ width: '20%', fontWeight: 'bolder', fontSize: '12px', pr: 2 }}>Discount(Rs)</TableCell>
                                    <TableCell padding='none' variant='body' size='small' align="right" sx={{ width: '20%', fontWeight: 'bolder', fontSize: '12px', pr: 1 }}>Gross Amount(Rs)</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    misReortList?.map((val, idx) => {
                                        return <Fragment key={idx} >
                                            <LightBlueRow data={val} key={idx} />
                                            {
                                                // @ts-ignore
                                                val.groupList?.map((ele, idex) => {
                                                    return <WhiteRow data={ele} key={idex} onClick={onClickFuncLevelOne} />
                                                })
                                            }
                                            < WhiteRowTotal data={val} />
                                        </Fragment>
                                    })
                                }
                                <TableRow  >
                                    <TableCell align="right" sx={{ width: '2%', textAlign: 'center', alignItems: 'center' }} ></TableCell>
                                    <TableCell align="left" sx={{ width: '25%', fontSize: '12px', textTransform: 'capitalize' }} >Sale Of Medicine</TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px' }} ></TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px' }} ></TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px' }} ></TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', pr: 2 }} ></TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', pr: 1 }} ></TableCell>
                                </TableRow>
                                <TableRow  >
                                    <TableCell align="right" sx={{ width: '2%', textAlign: 'center', alignItems: 'center' }} ><ArrowRightIcon sx={{ display: 'flex', fontSize: 15 }} /></TableCell>
                                    <TableCell align="left" sx={{ width: '25%', fontSize: '12px', textTransform: 'capitalize' }} >Pharmacy Medicine Sale</TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px' }} ></TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', cursor: 'pointer', textDecoration: 'underline', color: '#0000EE' }}
                                        onClick={getPharmacyDetl}
                                    >
                                        {netAmount?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                    </TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px' }} >
                                        {tax?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                    </TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', pr: 2 }} >
                                        {discount?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                    </TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', pr: 1 }} >
                                        {GrosPharma?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                    </TableCell>
                                </TableRow>
                                <TableRow sx={{
                                    backgroundColor: '#BBD8FF',
                                    height: '30px',
                                }} >
                                    <TableCell align="right" sx={{ width: '2%', fontWeight: 'bolder', fontSize: '12px' }} ></TableCell>
                                    <TableCell align="left" colSpan={6} sx={{ fontWeight: 'bolder', fontSize: '12px' }} ></TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell align="right" sx={{ width: '2%', textAlign: 'center', fontSize: '12px', fontWeight: 'bolder' }} >
                                        <ArrowRightIcon sx={{
                                            display: 'flex',
                                            fontSize: 15,
                                        }} />
                                    </TableCell>
                                    <TableCell align="left" sx={{ width: '25%', fontSize: '12px' }} >Ip Consolidate Discount</TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px' }} ></TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px' }} >[{ipConsolidatedDiscount}]</TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px' }} ></TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', pr: 2 }} >{ipConsolidatedDiscount}</TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', pr: 1 }} ></TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell align="right" sx={{ width: '2%', textAlign: 'center', fontSize: '12px' }} >
                                        <ArrowRightIcon sx={{
                                            display: 'flex',
                                            fontSize: 15,
                                        }} />
                                    </TableCell>
                                    <TableCell align="left" sx={{ width: '25%', fontSize: '12px' }} >Petty Cash Amount</TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px' }} ></TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px' }} >0.00</TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px' }} ></TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', pr: 2 }} ></TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', pr: 1 }} ></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="right" sx={{ width: '2%', textAlign: 'center', fontSize: '12px' }} >
                                        <ArrowRightIcon sx={{
                                            display: 'flex',
                                            fontSize: 15,
                                        }} />
                                    </TableCell>
                                    <TableCell align="left" sx={{ width: '25%', fontSize: '12px' }} >Tax Amount</TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px' }} ></TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px' }} >{tax?.toLocaleString()}</TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px' }} ></TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', pr: 2 }} ></TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', pr: 1 }} ></TableCell>
                                </TableRow>
                                <TableRow sx={{
                                    backgroundColor: '#BBD8FF',
                                    height: '30px',
                                }} >
                                    <TableCell align="right" sx={{ width: '2%', fontWeight: 'bolder', fontSize: '12px' }} ></TableCell>
                                    <TableCell align="left" colSpan={6} sx={{ fontWeight: 'bolder', fontSize: '12px' }} ></TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell align="right" sx={{ width: '2%', textAlign: 'center', fontSize: '12px' }} >
                                        <ArrowRightIcon sx={{
                                            display: 'flex',
                                            fontSize: 15,
                                        }} />
                                    </TableCell>
                                    <TableCell align="left" sx={{ width: '25%', fontSize: '12px' }} >Collection Against Sales (A)</TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px' }} >{
                                        collAgainSale?.toLocaleString('en-US', { minimumFractionDigits: 2 })
                                    }</TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px' }} ></TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px' }} ></TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', pr: 2 }} ></TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', pr: 1 }} ></TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell align="right" sx={{ width: '2%', textAlign: 'center', fontSize: '12px' }} >
                                        <ArrowRightIcon sx={{
                                            display: 'flex',
                                            fontSize: 15,
                                        }} />
                                    </TableCell>
                                    <TableCell align="left" sx={{ width: '25%', fontSize: '12px' }} >Advance Settled</TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px' }} >{advanceSettled}</TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px' }} ></TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px' }} ></TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', pr: 2 }} ></TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', pr: 1 }} ></TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell align="right" sx={{ width: '2%', textAlign: 'center', fontSize: '12px' }} >
                                        <ArrowRightIcon sx={{
                                            display: 'flex',
                                            fontSize: 15,
                                        }} />
                                    </TableCell>
                                    <TableCell align="left" sx={{ width: '25%', fontSize: '12px' }} >Credit/Insurance Bill</TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', cursor: 'pointer', textDecoration: 'underline', color: '#0000EE' }}
                                        onClick={onClickCreditInsuranceBill}
                                    >
                                        {creditInsuranceBill}
                                    </TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px' }} ></TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px' }} >{creditInsuranceBillTax}</TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', pr: 2 }} ></TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', pr: 1 }} ></TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell align="right" sx={{ width: '2%', textAlign: 'center', fontSize: '12px' }} >
                                        <ArrowRightIcon sx={{
                                            display: 'flex',
                                            fontSize: 15,
                                        }} />
                                    </TableCell>
                                    <TableCell align="left" sx={{ width: '25%', fontSize: '12px' }} >UnSettled Amount</TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', cursor: 'pointer', textDecoration: 'underline', color: '#0000EE' }}
                                        onClick={onClickUnsettledAmount}
                                    >
                                        {unsettledAmount}
                                    </TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px' }} ></TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px' }} >0.00</TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', pr: 2 }} ></TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', pr: 1 }} ></TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell align="right" sx={{ width: '2%', textAlign: 'center', fontSize: '12px' }} >
                                        <ArrowRightIcon sx={{
                                            display: 'flex',
                                            fontSize: 15,
                                        }} />
                                    </TableCell>
                                    <TableCell align="left" sx={{ width: '25%', fontSize: '12px', color: 'red', fontWeight: 'bold' }} >Round Off</TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px' }} ></TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px' }} >{roundOff?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px' }} ></TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', pr: 2 }} ></TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', pr: 1 }} ></TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell align="right" sx={{ width: '2%', textAlign: 'center', fontSize: '12px' }} ></TableCell>
                                    <TableCell align="left" sx={{ width: '25%', fontSize: '12px', fontWeight: 'bold' }} >Grand Total</TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', fontWeight: 'bold' }} >{
                                        groupCollection?.toLocaleString('en-US', { minimumFractionDigits: 2 })
                                    }</TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', fontWeight: 'bold' }} >{
                                        groupNetddctRoundoff?.toLocaleString('en-US', { minimumFractionDigits: 2 })
                                    }</TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', fontWeight: 'bold' }} >{
                                        groupTax?.toLocaleString('en-US', { minimumFractionDigits: 2 })
                                    }</TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', fontWeight: 'bold', pr: 2 }} >{
                                        groupDis?.toLocaleString('en-US', { minimumFractionDigits: 2 })
                                    }</TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', fontWeight: 'bold', pr: 1 }} >{
                                        groupGross?.toLocaleString('en-US', { minimumFractionDigits: 2 })
                                    }</TableCell>
                                </TableRow>
                                <TableRow sx={{
                                    backgroundColor: '#BBD8FF',
                                    height: '30px',
                                }} >
                                    <TableCell align="right" sx={{ width: '2%', fontWeight: 'bolder', fontSize: '12px' }} ></TableCell>
                                    <TableCell align="left" colSpan={6} sx={{ fontWeight: 'bolder', fontSize: '12px' }} ></TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell align="right" sx={{ width: '2%', textAlign: 'center', fontSize: '12px' }} >
                                        <ArrowRightIcon sx={{
                                            display: 'flex',
                                            fontSize: 15,
                                        }} />
                                    </TableCell>
                                    <TableCell align="left" sx={{ width: '25%', fontSize: '12px', }} >Credit/Insurance Bill Discount</TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', }} >{0}</TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', }} ></TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', }} ></TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', pr: 2 }} ></TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', pr: 1 }} ></TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell align="right" sx={{ width: '2%', textAlign: 'center', fontSize: '12px' }} >
                                        <ArrowRightIcon sx={{
                                            display: 'flex',
                                            fontSize: 15,
                                        }} />
                                    </TableCell>
                                    <TableCell align="left" sx={{ width: '25%', fontSize: '12px', }} >Credit/Insurance WriteOff Amount</TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', }} >{0}</TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', }} ></TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', }} ></TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', pr: 2 }} ></TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', pr: 1 }} ></TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell align="right" sx={{ width: '2%', textAlign: 'center', fontSize: '12px' }} >
                                        <ArrowRightIcon sx={{
                                            display: 'flex',
                                            fontSize: 15,
                                        }} />
                                    </TableCell>
                                    <TableCell align="left" sx={{ width: '25%', fontSize: '12px', color: 'red', fontWeight: 'bold' }} >Complimentary</TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', }} >{complimentory}</TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', }} ></TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', }} ></TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', pr: 2 }} ></TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', pr: 1 }} ></TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell align="right" sx={{ width: '2%', textAlign: 'center', fontSize: '12px' }} >
                                        <ArrowRightIcon sx={{
                                            display: 'flex',
                                            fontSize: 15,
                                        }} />
                                    </TableCell>
                                    <TableCell align="left" sx={{ width: '25%', fontSize: '12px', }} >IP Previous Day's  Discount</TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', }} >{ipPreviousDayDiscount}</TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', }} ></TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', }} ></TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', pr: 2 }} ></TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', pr: 1 }} ></TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell align="right" sx={{ width: '2%', textAlign: 'center', fontSize: '12px' }} >
                                        <ArrowRightIcon sx={{
                                            display: 'flex',
                                            fontSize: 15,
                                        }} />
                                    </TableCell>
                                    <TableCell align="left" sx={{ width: '25%', fontSize: '12px', }} >Advance Refund (B)</TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', }} >{advanceRefund}</TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', }} ></TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', }} ></TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', pr: 2 }} ></TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', pr: 1 }} ></TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell align="right" sx={{ width: '2%', textAlign: 'center', fontSize: '12px' }} >
                                        <ArrowRightIcon sx={{
                                            display: 'flex',
                                            fontSize: 15,
                                        }} />
                                    </TableCell>
                                    <TableCell align="left" sx={{ width: '25%', fontSize: '12px', }} >Advance Collection (C)</TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', cursor: 'pointer', textDecoration: 'underline', color: '#0000EE' }}
                                        onClick={onClickAdvanceCollection}
                                    >
                                        {advanceCollection}
                                    </TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', }} ></TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', }} ></TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', pr: 2 }} ></TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', pr: 1 }} ></TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell align="right" sx={{ width: '2%', textAlign: 'center', fontSize: '12px' }} >
                                        <ArrowRightIcon sx={{
                                            display: 'flex',
                                            fontSize: 15,
                                        }} />
                                    </TableCell>
                                    <TableCell align="left" sx={{ width: '25%', fontSize: '12px', }} >Credit/Insurance Bill Collection(D)</TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', cursor: 'pointer', textDecoration: 'underline', color: '#0000EE' }}
                                        onClick={onClickCreditInsuranceBillCollection}
                                    >
                                        {creditInsuranceBillCollection}
                                    </TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', }} ></TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', }} ></TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', pr: 2 }} ></TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', pr: 1 }} ></TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell align="right" sx={{ width: '2%', textAlign: 'center', fontSize: '12px' }} >
                                        <ArrowRightIcon sx={{
                                            display: 'flex',
                                            fontSize: 15,
                                        }} />
                                    </TableCell>
                                    <TableCell align="left" sx={{ width: '25%', fontSize: '12px', }} >IP Previous Day's  Collection(E)</TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', }} >{ippreviousDayCollection}</TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', }} ></TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', }} ></TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', pr: 2 }} ></TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', pr: 1 }} ></TableCell>
                                </TableRow>
                                <TableRow sx={{
                                    backgroundColor: '#BBD8FF',
                                    height: '30px',
                                }} >
                                    <TableCell align="right" sx={{ width: '2%', fontWeight: 'bolder', fontSize: '12px' }} ></TableCell>
                                    <TableCell align="left" colSpan={6} sx={{ fontWeight: 'bolder', fontSize: '12px' }} ></TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell align="right" sx={{ width: '2%', textAlign: 'center', fontSize: '12px' }} ></TableCell>
                                    <TableCell align="left" sx={{ width: '25%', fontSize: '12px', }} >Total Counter Collection( A + C + D + E - B)</TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', }} >{
                                        totalCounterCollection?.toLocaleString('en-US', { minimumFractionDigits: 2 })
                                    }</TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', }} ></TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', }} ></TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', pr: 2 }} ></TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', pr: 1 }} ></TableCell>
                                </TableRow>
                                <TableRow sx={{ backgroundColor: '#BBD8FF', height: '30px', }} >
                                    <TableCell align="right" sx={{ width: '2%', fontWeight: 'bolder', fontSize: '12px' }} ></TableCell>
                                    <TableCell align="left" colSpan={6} sx={{ fontWeight: 'bolder', fontSize: '12px' }} ></TableCell>
                                </TableRow>
                                <TableRow sx={{ backgroundColor: '#94C5F7', height: '30px', }} >
                                    <TableCell align="right" sx={{ width: '2%', fontWeight: 'bolder', fontSize: '12px' }} ></TableCell>
                                    <TableCell align="left" sx={{ width: '25%', fontSize: '12px', fontWeight: 'bold' }} >Patient Type</TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', fontWeight: 'bold' }} >Discount</TableCell>
                                    <TableCell align="left" colSpan={4} sx={{ fontWeight: 'bolder', fontSize: '12px' }} ></TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell align="right" sx={{ width: '2%', textAlign: 'center', fontSize: '12px' }} >
                                        <ArrowRightIcon sx={{
                                            display: 'flex',
                                            fontSize: 15,
                                        }} />
                                    </TableCell>
                                    <TableCell align="left" sx={{ width: '25%', fontSize: '12px', }} >General</TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', }} >{general?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', }} ></TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', }} ></TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', pr: 2 }} ></TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', pr: 1 }} ></TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell align="right" sx={{ width: '2%', textAlign: 'center', fontSize: '12px' }} >
                                        <ArrowRightIcon sx={{
                                            display: 'flex',
                                            fontSize: 15,
                                        }} />
                                    </TableCell>
                                    <TableCell align="left" sx={{ width: '25%', fontSize: '12px', }} >Other Type</TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', }} >{otherType?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', }} ></TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', }} ></TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', pr: 2 }} ></TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', pr: 1 }} ></TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell align="right" sx={{ width: '2%', textAlign: 'center', fontSize: '12px' }} ></TableCell>
                                    <TableCell align="left" sx={{ width: '25%', fontSize: '12px', fontWeight: 'bold' }} >Discount Total</TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', fontWeight: 'bold' }} >{discntTotal?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', }} ></TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', }} ></TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', pr: 2 }} ></TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', pr: 1 }} ></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Paper>
        </Box>
    )
}

export default memo(IncomeReports) 