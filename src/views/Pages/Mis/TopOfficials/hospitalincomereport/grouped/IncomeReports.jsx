// @ts-nocheck
import React, {Fragment, memo, useCallback, useMemo, useState, useEffect} from "react";
import {Box, Icon, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ReportHeader from "../../../../../Components/ReportHeader";
import LightBlueRow from "../../components/LightBlueRow";
import WhiteRow from "../../components/RowWhite";
import WhiteRowTotal from "../../components/RowWhiteTotal";
import {axiosinstance} from "../../../../../../controllers/AxiosConfig";
import MenuButton from "../../components/ButtonMenu";
import ReportBottomMenu from "../../components/ButtonReportMenu";
import HeaderRowBlue from "../../components/HeaderRowBlue";
import {formatToDecimal} from "../../utils/utlils.fun";
import "../../utils/Style.css";
import {useProcedureIncome} from "../hooks/useProcedureIncome";
import {useIncomeCalculations} from "../hooks/useIncomeCalculations";
import {exportStyledExcel} from "../../utils/exportIncomeExcel";

const IncomeReports = () => {
  let serialNo = 1;
  const getSerial = () => serialNo++;

  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state || {
    fromDate: null,
    toDate: null,
  };

  // ✅ API STATE
  const [apiData, setApiData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const getQmtMisData = async () => {
      try {
        const response = await axiosinstance.post(`/getQmt/getQmtReport`, state);
        const data = response.data;
        if (data.success === 0 || data.success === null || !data) {
          alert("No Data Found");
        }
        if (data.success === 1) {
          setApiData(response.data);
        }
        console.log(response.data);
      } catch (error) {
        console.log(error);
        navigate("/Menu/QmtIncomeReportsDateSelection");
      }
    };

    getQmtMisData();
  }, []);

  // ✅ HOOK DATA
  const PrcedureIncome = useProcedureIncome(apiData);
  const {pharmacyIncome, IpConsolidatedDiscountSection, CollectionAgainstSalesSection, CreditInsuranceBillSection, CounterCollection, Patient_Type} = useIncomeCalculations(apiData, setIsLoading);

  // Ensure the value is valid and a n umber
  // Income State
  // const incomeData = hospitalIncomeData[0];
  // State Management
  // const PrcedureIncome = incomeData.ProcudureIncome || [];
  // const pharmacyIncome = incomeData.PharmacySales[0].groupData || [];
  // const IpConsolidatedDiscountSection = incomeData.IpConsolidatedDiscountSection || [];
  // const CollectionAgainstSalesSection = incomeData.CollectionAgainstSalesSection || [];
  // const CreditInsuranceBillSection = incomeData.CreditInsuranceBillSection || [];
  // const CounterCollection = incomeData.CounterCollection[0].collection || [];
  // const Patient_Type = incomeData.Patient_Type[0].groupData || [];

  // Procedure Income Data
  const ProcedureIncomeDataJsx = PrcedureIncome?.map((item, index) => (
    <Fragment key={`ProIncome-${item.groupHead}`}>
      <LightBlueRow data={item.groupHead?.toLowerCase()} />
      {item.groupData?.length > 0 &&
        item.groupData.filter((item) => item.subGroupName !== "SubGroupTotal").map((group, i) => <WhiteRow key={`row-${i}`} data={group} serialNum={getSerial()} onClick={() => {}} />)}
      <WhiteRowTotal data={item.groupData} />
    </Fragment>
  ));

  // Pharmacy Income Data
  const PharmacyIncomeDataJsx = pharmacyIncome?.map((item, index) => (
    <TableRow key={`row-${index}`}>
      <TableCell align="right" sx={{width: "2%", textAlign: "center", fontSize: "12px"}}>
        {getSerial()}
      </TableCell>
      <TableCell align="left" sx={{width: "25%", fontSize: "12px", textTransform: "capitalize"}}>
        Pharmacy Medicine Sale
      </TableCell>
      <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}></TableCell>
      <TableCell align="right" sx={{width: "20%", fontSize: "12px", cursor: "pointer", textDecoration: "underline", color: "#0000EE"}} onClick={() => {}}>
        {formatToDecimal(item.netAmount)}
      </TableCell>
      <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}>
        {formatToDecimal(item.tax)}
      </TableCell>
      <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 2}}>
        {formatToDecimal(item.discount)}
      </TableCell>
      <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 1}}>
        {formatToDecimal(item.gross)}
      </TableCell>
    </TableRow>
  ));

  const IpConsolidatedDiscountSectionJsx = IpConsolidatedDiscountSection?.map((item, index) => (
    <TableRow key={`row-${index}`}>
      <TableCell align="right" sx={{width: "2%", textAlign: "center", fontSize: "12px"}}>
        {getSerial()}
      </TableCell>
      <TableCell align="left" sx={{width: "25%", fontSize: "12px"}}>
        {item.subGroupName}
      </TableCell>
      <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}></TableCell>
      <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}>
        {item.subGroupName === "Ip Consolidate Discount" ? `[${formatToDecimal(item.netAmount)}]` : formatToDecimal(item.netAmount)}
      </TableCell>
      <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}></TableCell>
      <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 2}}>
        {item.subGroupName === "Ip Consolidate Discount" ? formatToDecimal(item.discount) : null}
      </TableCell>
      <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 1}}></TableCell>
    </TableRow>
  ));

  const CollectionAgainstSalesSectionJsx = CollectionAgainstSalesSection?.map((item, index) => (
    <TableRow key={`Col-Agn${index}`}>
      <TableCell align="right" sx={{width: "2%", textAlign: "center", fontSize: "12px"}}>
        {item.subGroupName === "Grand Total" ? null : getSerial()}
      </TableCell>
      <TableCell align="left" sx={{width: "25%", fontSize: "12px", fontWeight: item.style === "B" && "bold"}}>
        {item.subGroupName}
      </TableCell>
      <TableCell
        align="right"
        sx={{width: "20%", fontSize: "12px", cursor: "pointer", textDecoration: item.style === "U" && "underline", color: item.style === "U" && "#0000EE", fontWeight: item.style === "B" && "bold"}}
        onClick={() => {}}
      >
        {item.collection === null ? null : formatToDecimal(item.collection)}
      </TableCell>
      <TableCell align="right" sx={{width: "20%", fontSize: "12px", fontWeight: item.style === "B" && "bold"}}>
        {item.netAmount === null ? null : formatToDecimal(item.netAmount)}
      </TableCell>
      <TableCell align="right" sx={{width: "20%", fontSize: "12px", fontWeight: item.style === "B" && "bold"}}>
        {item.tax === null ? null : formatToDecimal(item.tax)}
      </TableCell>
      <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 2, fontWeight: item.style === "B" && "bold"}}>
        {item.discount === null ? null : formatToDecimal(item.discount)}
      </TableCell>
      <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 1, fontWeight: item.style === "B" && "bold"}}>
        {item.gross === null ? null : formatToDecimal(item.gross)}
      </TableCell>
    </TableRow>
  ));

  const CreditInsuranceBillSectionJsx = CreditInsuranceBillSection.map((item, index) => (
    <TableRow key={`row-${index}`}>
      <TableCell align="right" sx={{width: "2%", textAlign: "center", fontSize: "12px"}}>
        {getSerial()}
      </TableCell>
      <TableCell align="left" sx={{width: "25%", fontSize: "12px"}}>
        {item.subGroupName}
      </TableCell>
      <TableCell align="right" sx={{width: "20%", fontSize: "12px", textDecoration: item.style === "U" && "underline", color: item.style === "U" && "#0000EE"}}>
        {formatToDecimal(item.collection)}
      </TableCell>
      <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}></TableCell>
      <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}></TableCell>
      <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 2}}></TableCell>
      <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 1}}></TableCell>
    </TableRow>
  ));

  const PatientTypeAmountJsx = Patient_Type.map((item, index) => (
    <TableRow key={`row-${index}`}>
      <TableCell align="right" sx={{width: "2%", textAlign: "center", fontSize: "12px"}}>
        {index + 1 >= 3 ? null : index + 1}
      </TableCell>
      <TableCell align="left" sx={{width: "25%", fontSize: "12px", fontWeight: item.style === "B" && "bold"}}>
        {item.subGroupName}
      </TableCell>
      <TableCell align="right" sx={{width: "20%", fontSize: "12px", fontWeight: item.style === "B" && "bold"}}>
        {formatToDecimal(item.collection)}
      </TableCell>
      <TableCell align="right" sx={{width: "20%", fontSize: "12px", fontWeight: item.style === "B" && "bold"}}></TableCell>
      <TableCell align="right" sx={{width: "20%", fontSize: "12px", fontWeight: item.style === "B" && "bold"}}></TableCell>
      <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 2, fontWeight: item.style === "B" && "bold"}}></TableCell>
      <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 1, fontWeight: item.style === "B" && "bold"}}></TableCell>
    </TableRow>
  ));

  if (isLoading) {
    return (
      <Box flex={1} sx={{display: "flex", backgroundColor: "lightgray", p: "1%", flexDirection: "column"}}>
        <Paper square sx={{display: "flex", borderColor: "black", border: 1, height: "92%"}}></Paper>
      </Box>
    );
  }

  return (
    <Box flex={1} sx={{backgroundColor: "lightgray", p: "1%"}}>
      <MenuButton
        navigateTo={"groupedIncomeReportsDateSelection"}
        onExportExcel={() =>
          exportStyledExcel({
            procedureIncome: PrcedureIncome,
            pharmacyIncome,
            ipDiscount: IpConsolidatedDiscountSection,
            collectionAgainstSales: CollectionAgainstSalesSection,
            creditInsurance: CreditInsuranceBillSection,
            counterCollection: CounterCollection,
            patientType: Patient_Type,
          })
        }
      />
      <Paper square sx={{borderColor: "black", border: 1}}>
        <ReportHeader name="Hospital Income" data={state} hosName="QUILON MEDICAL TRUST - (GRP)" disable={false} />
        <Box
          sx={{
            overflow: "auto",
            padding: "15px",
          }}
        >
          <TableContainer component={Box}>
            <Table padding="none" sx={{}} size="small" aria-label="a dense table">
              <TableHead sx={{backgroundColor: "#94C5F7"}}>
                <TableRow sx={{p: 0, m: 0, borderBottomColor: "black"}}>
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
                {ProcedureIncomeDataJsx}
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
                {PharmacyIncomeDataJsx}
                <HeaderRowBlue />
                {IpConsolidatedDiscountSectionJsx}
                <HeaderRowBlue />
                {CollectionAgainstSalesSectionJsx}
                <HeaderRowBlue />
                {CreditInsuranceBillSectionJsx}
                <HeaderRowBlue />
                {/* Counter Collection Section Start */}
                <TableRow>
                  <TableCell align="right" sx={{width: "2%", textAlign: "center", fontSize: "12px"}}></TableCell>
                  <TableCell align="left" sx={{width: "25%", fontSize: "12px"}}>
                    Total Counter Collection( A + C + D + E - B)
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}>
                    {formatToDecimal(CounterCollection)}
                  </TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 2}}></TableCell>
                  <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 1}}></TableCell>
                </TableRow>
                {/* Counter Collection Section End */}
                <HeaderRowBlue />
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
                {PatientTypeAmountJsx}
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
