// @ts-nocheck
import React, { Fragment, memo, useMemo, useState } from 'react'
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
    getipcreditInsuranceBill
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

const IncomeReports = () => {

    const dispatch = useDispatch();
    const { state } = useLocation();
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    const componentState = useMemo(state => state, [state]);

    const [misGroupList, setMisGroupList] = useState([]);
    const [misReortList, setMisReportList] = useState([]);
    const [patientDiscount, setPatientDiscount] = useState([]);
    const [grand, setGrand] = useState({});

    const [general, setGeneral] = useState(0);
    const [otherType, setOtherType] = useState(0);
    const discntTotal = general + otherType;

    // @ts-ignore
    const [pharamcyIc, setPharamcyIc] = useState({
        discount: 0,
        grossAmount: 0,
        netAmount: 0,
        tax: 0
    });

    // @ts-ignore
    const {
        // @ts-ignore
        discount,
        // @ts-ignore
        grossAmount,
        // @ts-ignore
        netAmount,
        // @ts-ignore
        tax
    } = pharamcyIc;

    const GrosPharma = discount + netAmount + tax;

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
            dispatch(getAdvanceCollection(state.date))
            // @ts-ignore
            dispatch(getAdvanceRefund(state.date))
            // @ts-ignore
            dispatch(getAdvanceSettled(state.date))
            // @ts-ignore
            dispatch(getcollectionagainSaleTotal(state.date))
            // @ts-ignore
            dispatch(getcollectionagainSaleDeduction(state.date))
            // @ts-ignore
            dispatch(getcomplimentory(state.date))
            // @ts-ignore
            dispatch(getcreditInsuranceBillCollection(state.date))
            // @ts-ignore
            dispatch(getIpconsolidatedDiscount(state.date))
            // @ts-ignore
            dispatch(getipPreviousDayDiscount(state.date))
            // @ts-ignore
            dispatch(getunsettledAmount(state.date))
            // @ts-ignore
            dispatch(getipPreviousDayCollection(state.date))
            // @ts-ignore
            dispatch(getipcreditInsuranceBill(state.date))

            //INCOME PART
            // @ts-ignore
            dispatch(getProincome1(state.date))
            // @ts-ignore
            dispatch(getProincome2(state.date))
            // @ts-ignore
            dispatch(getProincome3(state.date))
            // @ts-ignore
            dispatch(getProincome4(state.date))
            // @ts-ignore
            dispatch(getPatietTypeDiscount(state.date))
            // @ts-ignore
            dispatch(getPhaSalePart1(state.date))
            // @ts-ignore
            dispatch(getPhaSalePart2(state.date))
            // @ts-ignore
            dispatch(getPhaSalePart3(state.date))
            // @ts-ignore
            dispatch(getPhaReturnPart1(state.date))
            // @ts-ignore
            dispatch(getPhaReturnPart2(state.date))
            // @ts-ignore
            dispatch(getPhaReturnPart3(state.date))
            // @ts-ignore
            dispatch(theaterIncome(state.date))

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
                        collection?.creditInsuranceBill?.data.reduce((accumulator, currentValue) => accumulator + currentValue.AMT, 0) : 0,
                    tax: collection?.creditInsuranceBill?.status === 1 ?
                        collection?.creditInsuranceBill?.data.reduce((accumulator, currentValue) => accumulator + currentValue.TAX, 0) : 0,
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

    return (
        <Box flex={1} sx={{ backgroundColor: 'lightgray', p: '1%' }} >
            <Paper square sx={{ borderColor: 'black', border: 1 }}  >
                <ReportHeader name="Hospital Income" data={state} />
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
                                                    return <WhiteRow data={ele} key={idex} />
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
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px' }} >
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
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px' }} >{creditInsuranceBill}</TableCell>
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
                                    <TableCell align="left" sx={{ width: '25%', fontSize: '12px' }} >UnSettled Amount</TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px' }} >{unsettledAmount}</TableCell>
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
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', }} >{advanceCollection}</TableCell>
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
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', }} >{creditInsuranceBillCollection}</TableCell>
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