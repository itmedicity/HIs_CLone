// @ts-nocheck
import React, {memo, useCallback, useState} from "react";
import {Paper, Box, Divider, Checkbox} from "@mui/material";
import DatePicker from "react-datepicker";
import {useNavigate} from "react-router-dom";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import ButtonCmp from "../../../Components/ButtonCmp";
import {imageIcon} from "../../../../assets/ImageExport";
import {axiosinstance} from "../../../../controllers/AxiosConfig";
import SearchIcon from "../../../../assets/SearchSmall.png";
import "./Style.css";
import {CustomCalanderComponents} from "../Components/CustomCalenderComp";

const HospitalncomeReports = () => {
  /**
   * Hospital income Statement - TMCH
   */
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [checked, setChecked] = useState(false);

  const navigateToReport = (ipNumber, rmIpNumber, ipNoColl, groupedPatient) => {
    navigate("/Menu/income-reports-tmch", {
      state: {
        from: moment(startDate).format("DD/MM/YYYY 00:00:00"),
        to: moment(endDate).format("DD/MM/YYYY 23:59:59"),
        ptno: ipNumber,
        phar: rmIpNumber,
        ipNoColl,
        grouped: groupedPatient,
      },
    });
  };

  const handleClick = useCallback(async () => {
    if (!checked) {
      alert("Select Clinic");
      return;
    }

    if (startDate > endDate) {
      alert("Start date cannot be after end date.");
      return;
    }

    try {
      const postData2 = {
        from: moment(startDate).format("YYYY-MM-DD 00:00:00"),
        to: moment(endDate).format("YYYY-MM-DD 23:59:59"),
      };

      const ipNumberResponse = await axiosinstance.post("/admission/getIpNumber", postData2);
      const {success, data} = ipNumberResponse.data;
      const ipNumber = success === 1 ? data?.map((e) => e.ip_no) : [];
      const rmIpNumber = success === 1 ? data?.filter((e) => e.tmch_status === "0").map((e) => e.ip_no) : [];
      const groupedPatient = success === 1 ? data?.filter((e) => e.tmch_status === "1").map((e) => e.ip_no) : [];
      console.log(ipNumber);

      const postDate = {
        from: moment(startDate).format("DD/MM/YYYY 00:00:00"),
        to: moment(endDate).format("DD/MM/YYYY 23:59:59"),
      };

      const ipReceiptResponse = await axiosinstance.post("/admission/getIpReceiptInfo", postDate);
      const {success: ipReceiptResponseSuccess, data: ipReceiptResponseData} = ipReceiptResponse.data;
      let ipNoColl = ipNumber;
      if (ipReceiptResponseSuccess === 1 && ipReceiptResponseData.length > 0) {
        const minDate = ipReceiptResponseData.reduce((min, obj) => {
          const currentDate = new Date(obj.ADMISSION);
          return currentDate < min ? currentDate : min;
        }, new Date(ipReceiptResponseData[0].ADMISSION));

        console.log(minDate);

        const postData0 = {
          from: moment(minDate).format("YYYY-MM-DD 00:00:00"),
          to: moment(endDate).format("YYYY-MM-DD 23:59:59"),
        };
        console.log(postData0);

        const dischargedResponse = await axiosinstance.post("/admission/getIpDischargedPatientInfo", postData0);
        const {success: dischargedSuccess, data: newIpReceiptBased} = dischargedResponse.data;

        if (dischargedSuccess === 1 && newIpReceiptBased.length > 0) {
          const array1 = newIpReceiptBased.map((e) => e.ip_no);
          const array2 = ipReceiptResponseData.map((e) => e.IP_NO);
          const filtedArray = array1.filter((item) => array2.includes(item));
          ipNoColl = ipNumber.concat(filtedArray);
        }
      }
      navigateToReport(ipNumber, rmIpNumber, ipNoColl, groupedPatient);
    } catch (error) {
      console.error("Error fetching report data:", error);
      navigateToReport([], [], [], []);
    }
  }, [startDate, endDate, navigate, checked]);

  const handleClose = () => {
    navigate("/Menu/Mis");
  };

  return (
    <Paper sx={{display: "flex", flex: 1, justifyContent: "center"}} square variant="outlined">
      <Paper
        square
        sx={{
          display: "flex",
          width: "650px",
          marginTop: 3,
          height: "247px",
          flexDirection: "column",
          border: "1px solid #949494",
          boxShadow: "3px 3px 10px #ccc",
        }}
      >
        <Box
          sx={{
            display: "flex",
            fontSize: "13px",
            backgroundColor: "#525252",
            color: "#FFFFFF",
            fontWeight: "bold",
            padding: "0px 10px 0px 10px",
            height: "30px",
            alignItems: "center",
            fontFamily: "Arial,Tahoma,Verdana,sans-serif",
          }}
        >
          Income Report
        </Box>
        <Box
          sx={{
            display: "flex",
            flex: 1,
            // backgroundColor: 'lightblue'
          }}
        >
          <Box
            flex={1}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              // backgroundColor: 'lightcyan'
            }}
          >
            <table style={{display: "flex"}}>
              <tbody>
                <tr>
                  <td className="tableTextfeild">From Date</td>
                  <td>:</td>
                  <td>
                    <DatePicker selected={startDate} dateFormat="dd/MM/yyyy" onChange={(date) => setStartDate(date)} className="datePicker" customInput={<CustomCalanderComponents />} />
                  </td>
                </tr>
                <tr>
                  <td className="tableTextfeild">To Date</td>
                  <td>:</td>
                  <td>
                    <DatePicker selected={endDate} dateFormat="dd/MM/yyyy" onChange={(date) => setEndDate(date)} className="datePicker" customInput={<CustomCalanderComponents />} />
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td
                    style={{
                      display: "flex",
                      paddingTop: 10,
                    }}
                  >
                    <ButtonCmp name="Preview" style={{marginRight: "5px"}} onClick={handleClick} />
                    <ButtonCmp name="Close" style={{}} onClick={handleClose} />
                  </td>
                </tr>
              </tbody>
            </table>
          </Box>
          <Box flex={1} sx={{}}>
            <Box sx={{height: "28px", paddingTop: 0.4, display: "flex", alignItems: "center", justifyContent: "center"}}>
              <Box sx={{display: "flex"}}>
                <input
                  style={{
                    width: "210px",
                    fontSize: "12px",
                    border: "1px solid #898A8B",
                    padding: "3px",
                    outline: "medium none",
                    borderRadius: "3px",
                    marginLeft: "0px",
                    marginRight: "0px",
                    marginTop: "0px",
                  }}
                />
                <img src={SearchIcon} style={{marginLeft: "5px"}} alt="Search" width={"20px"} height={"20px"} />
              </Box>
            </Box>
            <Box>
              <table className="grdDetails" cellSpacing={0} style={{width: "90%"}}>
                <tbody>
                  <tr className="grdHeader">
                    <td style={{width: "3%"}}>
                      <img src={imageIcon.checkBoxImage} alt="Check" />
                    </td>
                    <td>Clinic</td>
                  </tr>
                  <tr className="grdItemStyle">
                    <td style={{borderRight: "1px solid #dadbdcff", padding: "0px 3px 4px 0px"}}>
                      <input id="checkbox" type="checkbox" name="checkbox" value={checked} onChange={(e) => setChecked(e.target.checked)} className="customCheckbox" />
                    </td>
                    <td>
                      <Box sx={{fontSize: "11.5px", fontWeight: "normal"}}>Travancore Medical College Hospital- (TMCH)</Box>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Box>
          </Box>
        </Box>
        <Divider />
        <Divider sx={{marginX: "2px", backgroundColor: "#949494"}} />
        <Box sx={{height: "27px"}}></Box>
      </Paper>
    </Paper>
  );
};

export default memo(HospitalncomeReports);
