

import React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { TableVirtuoso } from 'react-virtuoso'


const TableComponents = {
    Scroller: React.forwardRef((props, ref) => <TableContainer sx={{ maxHeight: 620, maxWidth: "100%" }} component={Paper} {...props} ref={ref} />),
    Table: (props) => <Table size='small'{...props} style={{ borderCollapse: 'separate' }} />,
    TableHead: TableHead,
    TableRow: TableRow,
    TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
}

const VirtuosoTableReport = ({ reportData }) => {

    return (
        <TableVirtuoso
            style={{ height: 580 }}
            data={reportData}
            components={TableComponents}
            fixedHeaderContent={() => (
                <TableRow>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: 12, background: 'lightgrey', borderRight: '1px solid lightgrey', pl: 1, borderTop: '1px solid lightgrey', backgroundColor: 'lightgrey', minWidth: 120 }}>Pharmacy Code</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: 12, background: 'lightgrey', borderRight: '1px solid lightgrey', pl: 1, borderTop: '1px solid lightgrey', backgroundColor: 'lightgrey', minWidth: 250 }}>Pharmacy</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: 12, background: 'lightgrey', borderRight: '1px solid lightgrey', pl: 1, borderTop: '1px solid lightgrey', backgroundColor: 'lightgrey', minWidth: 80 }}>Item Code</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: 12, background: 'lightgrey', borderRight: '1px solid lightgrey', pl: 1, borderTop: '1px solid lightgrey', backgroundColor: 'lightgrey', minWidth: 400 }}>Item</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: 12, background: 'lightgrey', borderRight: '1px solid lightgrey', pl: 1, borderTop: '1px solid lightgrey', backgroundColor: 'lightgrey', minWidth: 100 }}>Bill No</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: 12, background: 'lightgrey', borderRight: '1px solid lightgrey', pl: 1, borderTop: '1px solid lightgrey', backgroundColor: 'lightgrey', minWidth: 150 }}>Bill Date</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: 12, background: 'lightgrey', borderRight: '1px solid lightgrey', pl: 1, borderTop: '1px solid lightgrey', backgroundColor: 'lightgrey', minWidth: 50 }}>CACR</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: 12, background: 'lightgrey', borderRight: '1px solid lightgrey', pl: 1, borderTop: '1px solid lightgrey', backgroundColor: 'lightgrey', minWidth: 80 }}>Quantity</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: 12, background: 'lightgrey', borderRight: '1px solid lightgrey', pl: 1, borderTop: '1px solid lightgrey', backgroundColor: 'lightgrey', minWidth: 80 }}>Loose</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: 12, background: 'lightgrey', borderRight: '1px solid lightgrey', pl: 1, borderTop: '1px solid lightgrey', backgroundColor: 'lightgrey', minWidth: 100 }}>Purcahse Rate</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: 12, background: 'lightgrey', borderRight: '1px solid lightgrey', pl: 1, borderTop: '1px solid lightgrey', backgroundColor: 'lightgrey', minWidth: 100 }}>MRP</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: 12, background: 'lightgrey', borderRight: '1px solid lightgrey', pl: 1, borderTop: '1px solid lightgrey', backgroundColor: 'lightgrey', minWidth: 100 }}>Actual MRP</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: 12, background: 'lightgrey', borderRight: '1px solid lightgrey', pl: 1, borderTop: '1px solid lightgrey', backgroundColor: 'lightgrey', minWidth: 100 }}>Discount</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: 12, background: 'lightgrey', borderRight: '1px solid lightgrey', pl: 1, borderTop: '1px solid lightgrey', backgroundColor: 'lightgrey', minWidth: 100 }}>Amount</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: 12, background: 'lightgrey', borderRight: '1px solid lightgrey', pl: 1, borderTop: '1px solid lightgrey', backgroundColor: 'lightgrey', minWidth: 100 }}>Tax Amount</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: 12, background: 'lightgrey', borderRight: '1px solid lightgrey', pl: 1, borderTop: '1px solid lightgrey', backgroundColor: 'lightgrey', minWidth: 100 }}>Tax Code</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: 12, background: 'lightgrey', borderRight: '1px solid lightgrey', pl: 1, borderTop: '1px solid lightgrey', backgroundColor: 'lightgrey', minWidth: 80 }}>Tax %</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: 12, background: 'lightgrey', borderRight: '1px solid lightgrey', pl: 1, borderTop: '1px solid lightgrey', backgroundColor: 'lightgrey', minWidth: 100 }}>Tax Description</TableCell>

                </TableRow>
            )}
            itemContent={(index, val) => (
                <>
                    <TableCell sx={{ fontSize: 13, borderRight: '1px solid lightgrey', pl: 1 }}>{val.OUCODE}</TableCell>
                    <TableCell sx={{ fontSize: 13, borderRight: '1px solid lightgrey', pl: 1 }}>{val.OUC_DESC}</TableCell>
                    <TableCell sx={{ fontSize: 13, borderRight: '1px solid lightgrey', pl: 1 }}>{val.CODE}</TableCell>
                    <TableCell sx={{ fontSize: 13, borderRight: '1px solid lightgrey', pl: 1 }}>{val.ITC_DESC}</TableCell>
                    <TableCell sx={{ fontSize: 13, borderRight: '1px solid lightgrey', pl: 1 }}>{val.BILL}</TableCell>
                    <TableCell sx={{ fontSize: 13, borderRight: '1px solid lightgrey', pl: 1 }}>{val.BILLDATE}</TableCell>
                    <TableCell sx={{ fontSize: 13, borderRight: '1px solid lightgrey', pl: 1 }}>{val.CACR}</TableCell>
                    <TableCell sx={{ fontSize: 13, borderRight: '1px solid lightgrey', pl: 1 }}>{val.QTY}</TableCell>
                    <TableCell sx={{ fontSize: 13, borderRight: '1px solid lightgrey', pl: 1 }}>{val.LOOSE}</TableCell>
                    <TableCell sx={{ fontSize: 13, borderRight: '1px solid lightgrey', pl: 1 }}>{val.PRATE}</TableCell>
                    <TableCell sx={{ fontSize: 13, borderRight: '1px solid lightgrey', pl: 1 }}>{val.MRP}</TableCell>
                    <TableCell sx={{ fontSize: 13, borderRight: '1px solid lightgrey', pl: 1 }}>{val.ACTMRP}</TableCell>
                    <TableCell sx={{ fontSize: 13, borderRight: '1px solid lightgrey', pl: 1 }}>{val.DIS}</TableCell>
                    <TableCell sx={{ fontSize: 13, borderRight: '1px solid lightgrey', pl: 1 }}>{val.AMT}</TableCell>
                    <TableCell sx={{ fontSize: 13, borderRight: '1px solid lightgrey', pl: 1 }}>{val.TAXAMT}</TableCell>
                    <TableCell sx={{ fontSize: 13, borderRight: '1px solid lightgrey', pl: 1 }}>{val.TAXCODE}</TableCell>
                    <TableCell sx={{ fontSize: 13, borderRight: '1px solid lightgrey', pl: 1 }}>{val.TAXPER}</TableCell>
                    <TableCell sx={{ fontSize: 13, borderRight: '1px solid lightgrey', pl: 1 }}>{val.TXC_DESC}</TableCell>

                </>
            )}
        />
    )


}
export default VirtuosoTableReport