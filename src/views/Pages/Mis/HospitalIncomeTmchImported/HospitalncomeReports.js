// @ts-nocheck
import {Paper, Box, Divider} from "@mui/material";
import React, {memo, useCallback, useState} from "react";
import moment from "moment";
import DatePicker from "react-datepicker";
import {useNavigate} from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import "./Style.css";
import ButtonCmp from "../../../Components/ButtonCmp";
import {imageIcon} from "../../../../assets/ImageExport";
import {axiosinstance} from "../../../../controllers/AxiosConfig";
import {CustomCalanderComponents} from "../Components/CustomCalenderComp";
import SearchIcon from "../../../../assets/SearchSmall.png";

const HospitalncomeReports = () => {
  /**
   *  Hospital income Statement - imported TMCH
   */
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [checked, setChecked] = useState(false);

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
      const postDataForMysql = {
        from: moment(startDate).format("YYYY-MM-DD"),
        to: moment(endDate).format("YYYY-MM-DD"),
      };
      const result = await axiosinstance.post("/admission/getTmcIncome", postDataForMysql);
      const {success, data} = result.data;
      if (success === 1) {
        navigate("/Menu/income-reports-imTmch", {
          state: {
            from: postDataForMysql.from,
            to: postDataForMysql.to,
            data: data,
          },
        });
      } else {
        navigate("/Menu/income-reports", {
          state: {
            from: postDataForMysql.from,
            to: postDataForMysql.to,
          },
        });
      }
    } catch (error) {
      console.log("error getting MIS reports", error);
      alert("error getting MIS reports");
    }
  }, [startDate, endDate, checked, navigate]);

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
          Income Report (00)
        </Box>
        <Box
          sx={{
            display: "flex",
            flex: 1,
          }}
        >
          <Box
            flex={1}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
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
        <Box sx={{height: "30px"}}></Box>
      </Paper>
    </Paper>
  );
};

export default memo(HospitalncomeReports);
