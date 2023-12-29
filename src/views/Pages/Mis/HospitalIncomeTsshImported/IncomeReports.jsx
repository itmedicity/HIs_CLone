// @ts-nocheck
import React, { memo, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import ReportHeader from '../../../Components/ReportHeader';
import './Style.css'
import LightBlueRow from './LightBlueRow';
import WhiteRow from './WhiteRow';
import WhiteRowTotal from './WhiteRowTotal';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const IncomeReports = () => {
    const { state } = useLocation();

    useEffect(() => {
        const incomeData = state?.data[0];
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
            discountTotal: incomeData?.discountTotal
        })
    }, [state])


    const [reportData, setReportData] = useState({
        bed: 0.00,
        ns: 0.00,
        room: 0.00,
        others: 0.00,
        consulting: 0.00,
        anesthesia: 0.00,
        operation: 0.00,
        theater: 0.00,
        theaterInstr: 0.00,
        cardiology: 0.00,
        disposible: 0.00,
        icu: 0.00,
        icuProc: 0.00,
        radiology: 0.00,
        laboratory: 0.00,
        bloodBank: 0.00,
        mri: 0.00,
        diet: 0.00,
        pharmacy: 0.00,
        pharDiscount: 0.00,
        pharTax: 0.00,
        PharGross: 0.00,
        ipConsolidatedDiscount: 0.00,
        pettyCash: 0.00,
        TaxAmount: 0.00,
        collectionAgainSale: 0.00,
        AdvanceSettled: 0.00,
        creditIsuranceBill: 0.00,
        unsettledAmount: 0.00,
        roundOff: 0.00,
        grandcollection: 0.00,
        grandNetAmnt: 0.00,
        grantTax: 0.00,
        grantDiscount: 0.00,
        grandGrossAmnt: 0.00,
        creditInsurnaceBillDiscount: 0.00,
        creditInsuranceWriteOff: 0.00,
        complimentary: 0.00,
        ipPreviousDayDiscount: 0.00,
        advanceRefund: 0.00,
        advanceCollection: 0.00,
        creditInsuranceBillCollection: 0.00,
        ipPreviousDayCollection: 0.00,
        TotalCounterCollection: 0.00,
        General: 0.00,
        OtherType: 0.00,
        discountTotal: 0.00
    })

    const {
        bed, ns, room, others, consulting, anesthesia, operation, theater, theaterInstr, cardiology, disposible, icu, icuProc, radiology,
        laboratory, bloodBank, mri, diet, pharmacy, pharDiscount, pharTax, PharGross, ipConsolidatedDiscount, pettyCash, TaxAmount,
        collectionAgainSale, AdvanceSettled, creditIsuranceBill, unsettledAmount, roundOff, grandcollection, grandNetAmnt,
        grantTax, grantDiscount, grandGrossAmnt, creditInsurnaceBillDiscount, creditInsuranceWriteOff, complimentary,
        ipPreviousDayDiscount, advanceRefund, advanceCollection, creditInsuranceBillCollection, ipPreviousDayCollection,
        TotalCounterCollection, General, OtherType, discountTotal,
    } = reportData;



    const misData = {
        Bed: [
            { groupName: "Bed", net: bed, tax: 0.00, discount: 0.00, gross: bed },
            { groupName: "Room", net: room, tax: 0.00, discount: 0.00, gross: room },
            { groupName: "Ns", net: ns, tax: 0.00, discount: 0.00, gross: ns }
        ],
        Others: [
            { groupName: "Others", net: others, tax: 0.00, discount: 0.00, gross: others },
        ],
        Consulting: [
            { groupName: "Consulting", net: consulting, tax: 0.00, discount: 0.00, gross: consulting },
        ],
        Surgery: [
            { groupName: "Anesthesia", net: anesthesia, tax: 0.00, discount: 0.00, gross: anesthesia },
            { groupName: "Operation", net: operation, tax: 0.00, discount: 0.00, gross: operation },
            { groupName: "Theater  Charge", net: theater, tax: 0.00, discount: 0.00, gross: theater },
            { groupName: "Theatre Instrument", net: theaterInstr, tax: 0.00, discount: 0.00, gross: theaterInstr },
        ],
        Cardiology: [
            { groupName: "Cardiology", net: cardiology, tax: 0.00, discount: 0.00, gross: cardiology },
        ],
        Disposible: [
            { groupName: "Disposible", net: disposible, tax: 0.00, discount: 0.00, gross: disposible },
        ],
        Icu: [
            { groupName: "Icu", net: icu, tax: 0.00, discount: 0.00, gross: icu },
            { groupName: "Icu Proc", net: icuProc, tax: 0.00, discount: 0.00, gross: icuProc },
        ],
        Radiology: [
            { groupName: "Radiology", net: radiology, tax: 0.00, discount: 0.00, gross: radiology },
        ],
        Lab: [
            { groupName: "Laboratory", net: laboratory, tax: 0.00, discount: 0.00, gross: laboratory },
            { groupName: "BloodBank", net: bloodBank, tax: 0.00, discount: 0.00, gross: bloodBank },
        ],
        Mri: [
            { groupName: "Mri", net: mri, tax: 0.00, discount: 0.00, gross: mri },
        ],
        Diet: [
            { groupName: "Diet", net: diet, tax: 0.00, discount: 0.00, gross: diet },
        ],
        pharmacy: { groupName: "Pharmacy Medicine Sale", net: pharmacy, tax: pharTax, discount: pharDiscount, gross: PharGross },
        ipConsolidatedAmount: { groupName: "Ip Consolidate Discount", net: ipConsolidatedDiscount, discount: ipConsolidatedDiscount },
        PettyCash: { groupName: "Petty Cash Amount", net: pettyCash },
        taxAmount: { groupName: "Tax Amount", net: TaxAmount },
        collectionAgainSale: { groupName: "Collection Against Sales (A)", net: collectionAgainSale },
        advanceSettled: { groupName: "Advance Settled", net: AdvanceSettled },
        creditInsuranceBill: { groupName: "Credit/Insurance Bill", net: creditIsuranceBill },
        unsettledAmnt: { groupName: "UnSettled Amount", net: unsettledAmount },
        roundOff: { groupName: "Round Off", net: roundOff },
        grandTotal: { groupName: "Grand Total", collection: grandcollection, net: grandNetAmnt, Tax: grantTax, discount: grantDiscount, Gross: grandGrossAmnt },
        creditInsurance: { groupName: "Credit/Insurance Bill Discount", net: creditInsurnaceBillDiscount },
        writeoff: { groupName: "Credit/Insurance WriteOff Amount", net: creditInsuranceWriteOff },
        complimentary: { groupName: "Complimentary", net: complimentary },
        ipPreviousdayDiscount: { groupName: "IP Previous Day's Discount", net: ipPreviousDayDiscount },
        advanceRefund: { groupName: "Advance Refund (B)", net: advanceRefund },
        advanceCollection: { groupName: "Advance Collection (C)", net: advanceCollection },
        creditinsurancebillCollection: { groupName: "Credit/Insurance Bill Collection(D)", net: creditInsuranceBillCollection },
        ipPreviousdayCollection: { groupName: "IP Previous Day's Collection(E)", net: ipPreviousDayCollection },
        countercollection: { groupName: "Total Counter Collection( A + C + D + E - B)", net: TotalCounterCollection },
        general: { groupName: "General", net: General },
        otherType: { groupName: "Other Type", net: OtherType },
        discountTotal: { groupName: "Discount Total", net: discountTotal }
    }

    return (
        <Box flex={1} sx={{ backgroundColor: 'lightgray', p: '1%' }} >
            {/* Detailed report model when open based on selected group using the "onClickFuncLevelOne" function */}
            <Paper square sx={{ borderColor: 'black', border: 1 }}  >
                <ReportHeader name="Hospital Income" data={state} hosName='TRAVANCORE SUPER SPECIALITY HOSPITAL' disable={false} />
                <Box sx={{
                    overflow: 'auto',
                    padding: '15px'
                }} >
                    {/* <Box>Tssh</Box> */}
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
                                {/* Bed Section */}
                                <LightBlueRow name={"Bed"} />
                                {
                                    misData?.Bed?.map((ele, idx) => {
                                        return (< WhiteRow data={ele} key={idx} />)
                                    })
                                }
                                <WhiteRowTotal data={misData?.Bed} />

                                {/* Others */}
                                <LightBlueRow name={"Others"} />
                                {
                                    misData?.Others?.map((ele, idx) => {
                                        return (< WhiteRow data={ele} key={idx} />)
                                    })
                                }
                                <WhiteRowTotal data={misData?.Others} />

                                {/* Consulting */}
                                <LightBlueRow name={"Consulting"} />
                                {
                                    misData?.Consulting?.map((ele, idx) => {
                                        return (< WhiteRow data={ele} key={idx} />)
                                    })
                                }
                                <WhiteRowTotal data={misData?.Consulting} />

                                {/* SUrgery */}
                                <LightBlueRow name={"Surgery"} />
                                {
                                    misData?.Surgery?.map((ele, idx) => {
                                        return (< WhiteRow data={ele} key={idx} />)
                                    })
                                }
                                <WhiteRowTotal data={misData?.Surgery} />

                                {/* Cardiology */}
                                <LightBlueRow name={"Cardiology"} />
                                {
                                    misData?.Cardiology?.map((ele, idx) => {
                                        return (< WhiteRow data={ele} key={idx} />)
                                    })
                                }
                                <WhiteRowTotal data={misData?.Cardiology} />

                                {/* Disposible */}
                                <LightBlueRow name={"Disposible"} />
                                {
                                    misData?.Disposible?.map((ele, idx) => {
                                        return (< WhiteRow data={ele} key={idx} />)
                                    })
                                }
                                <WhiteRowTotal data={misData?.Disposible} />

                                {/* icu */}
                                <LightBlueRow name={"Icu"} />
                                {
                                    misData?.Icu?.map((ele, idx) => {
                                        return (< WhiteRow data={ele} key={idx} />)
                                    })
                                }
                                <WhiteRowTotal data={misData?.Icu} />

                                {/* Radiology */}
                                <LightBlueRow name={"Radiology"} />
                                {
                                    misData?.Radiology?.map((ele, idx) => {
                                        return (< WhiteRow data={ele} key={idx} />)
                                    })
                                }
                                <WhiteRowTotal data={misData?.Radiology} />

                                {/* Lab */}
                                <LightBlueRow name={"Lab"} />
                                {
                                    misData?.Lab?.map((ele, idx) => {
                                        return (< WhiteRow data={ele} key={idx} />)
                                    })
                                }
                                <WhiteRowTotal data={misData?.Lab} />

                                {/* Mri */}
                                <LightBlueRow name={"Lab"} />
                                {
                                    misData?.Mri?.map((ele, idx) => {
                                        return (< WhiteRow data={ele} key={idx} />)
                                    })
                                }
                                <WhiteRowTotal data={misData?.Mri} />

                                {/* Diet */}
                                <LightBlueRow name={"Lab"} />
                                {
                                    misData?.Diet?.map((ele, idx) => {
                                        return (< WhiteRow data={ele} key={idx} />)
                                    })
                                }
                                <WhiteRowTotal data={misData?.Diet} />

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
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', cursor: 'pointer', textDecoration: 'underline', color: '#0000EE' }}>
                                        {misData?.pharmacy?.net?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                    </TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px' }} >
                                        {misData?.pharmacy?.tax?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                    </TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', pr: 2 }} >
                                        {misData?.pharmacy?.discount?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                    </TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', pr: 1 }} >
                                        {misData?.pharmacy?.gross?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
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
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px' }} >[{misData?.ipConsolidatedAmount?.net?.toLocaleString('en-US', { minimumFractionDigits: 2 })}]</TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px' }} ></TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', pr: 2 }} >{misData?.ipConsolidatedAmount?.net?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</TableCell>
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
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px' }} >{misData?.taxAmount?.net?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</TableCell>
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
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px' }} >{misData?.collectionAgainSale?.net?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</TableCell>
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
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px' }} >{misData?.advanceSettled?.net?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</TableCell>
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
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', cursor: 'pointer', textDecoration: 'underline', color: '#0000EE' }}>
                                        {misData?.creditInsuranceBill?.net?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                    </TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px' }} ></TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px' }} >0</TableCell>
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
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', cursor: 'pointer', textDecoration: 'underline', color: '#0000EE' }}>
                                        {misData?.unsettledAmnt?.net?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
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
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px' }} >{misData?.roundOff?.net?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px' }} ></TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', pr: 2 }} ></TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', pr: 1 }} ></TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell align="right" sx={{ width: '2%', textAlign: 'center', fontSize: '12px' }} ></TableCell>
                                    <TableCell align="left" sx={{ width: '25%', fontSize: '12px', fontWeight: 'bold' }} >Grand Total</TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', fontWeight: 'bold' }} >{misData?.grandTotal?.collection?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', fontWeight: 'bold' }} >{misData?.grandTotal?.net?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', fontWeight: 'bold' }} >{misData?.grandTotal?.tax?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', fontWeight: 'bold', pr: 2 }} >{misData?.grandTotal?.discount?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', fontWeight: 'bold', pr: 1 }} >{misData?.grandTotal?.Gross?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</TableCell>
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
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', }} >{misData?.creditInsurance?.net?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</TableCell>
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
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', }} >{misData?.writeoff?.net?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</TableCell>
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
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', }} >{misData?.complimentary?.net?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</TableCell>
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
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', }} >{misData?.ipPreviousdayDiscount?.net?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</TableCell>
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
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', }} >{misData?.advanceRefund?.net?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</TableCell>
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
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', cursor: 'pointer', textDecoration: 'underline', color: '#0000EE' }}>
                                        {misData?.advanceCollection?.net?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
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
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', cursor: 'pointer', textDecoration: 'underline', color: '#0000EE' }}>
                                        {misData?.creditinsurancebillCollection?.net?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
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
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', }} >{misData?.ipPreviousdayCollection?.net?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</TableCell>
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
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', }} >{misData?.countercollection?.net?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</TableCell>
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
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', }} >{misData?.general?.net?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</TableCell>
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
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', }} >{misData?.otherType?.net?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', }} ></TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', }} ></TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', pr: 2 }} ></TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', pr: 1 }} ></TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell align="right" sx={{ width: '2%', textAlign: 'center', fontSize: '12px' }} ></TableCell>
                                    <TableCell align="left" sx={{ width: '25%', fontSize: '12px', fontWeight: 'bold' }} >Discount Total</TableCell>
                                    <TableCell align="right" sx={{ width: '20%', fontSize: '12px', fontWeight: 'bold' }} >{misData?.discountTotal?.net?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</TableCell>
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