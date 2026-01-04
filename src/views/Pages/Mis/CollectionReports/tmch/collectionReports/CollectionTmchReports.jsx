import React, {useState} from "react";
import {Box, Divider, Paper} from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {CustomCalanderComponents} from "../../../Components/CustomCalenderComp";
import ButtonCmp from "../../../../../Components/ButtonCmp";
import {imageIcon} from "../../../../../../assets/ImageExport";
import SearchIcon from "../../../../../../assets/SearchSmall.png";
import "../../Style.css";
import {useNavigate} from "react-router-dom";

const user = [100, 1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 10008, 10009, 10008, 10010, 10011, 10022];

const CollectionTmchReports = () => {
  const navigate = useNavigate();

  const [checked, setChecked] = useState(true);

  const handleNavigateToDetlPage = () => {
    navigate("/Menu/CollectionReportTmchDetls");
  };

  return (
    <Paper sx={{display: "flex", flex: 1, justifyContent: "center"}} square variant="outlined">
      <Paper
        square
        sx={{
          display: "flex",
          width: "652px",
          marginTop: 3,
          height: "346px",
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
          User Wise Collection
        </Box>
        {/*  Date Selection start*/}
        <Box sx={{display: "flex", alignItems: "center"}} className="customUserCollectionDateBox">
          {/* From Date */}
          <Box className="customUserCollectionBoxFrom">
            <Box className="customUserCollectionLabel">From Date:</Box>
            <DatePicker showPopperArrow={false} selected={new Date()} className="customUserCollectionDatePicker" dateFormat="dd/MM/yyyy HH:mm:ss a" onChange={() => {}} />
          </Box>
          {/* To Date */}
          <Box className="customUserCollectionBoxFrom">
            <Box className="customUserCollectionLabel">To Date:</Box>
            <DatePicker showPopperArrow={false} selected={new Date()} className="customUserCollectionDatePicker" dateFormat="dd/MM/yyyy HH:mm:ss a" onChange={() => {}} />
          </Box>
        </Box>
        {/*  Date Selection end */}
        <Box sx={{display: "flex", flex: 1, marginBottom: 0}}>
          {/* main section for dividing the two section */}
          <Box sx={{display: "flex", flex: 1}}>
            {/* Left section Start*/}
            <Box sx={{display: "flex", flex: 1, flexDirection: "column"}}>
              {/* SEcondary Section for search input and clinic selection start */}
              <Box sx={{display: "flex", flex: 1, flexDirection: "column"}}>
                {/* Search input  */}
                <Box sx={{height: "28px", paddingTop: 0.4, paddingLeft: "12px", display: "flex", alignItems: "center"}}>
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
                {/* Clinic Selection */}
                <Box>
                  <table className="grdDetails" cellSpacing={0} style={{width: "85%"}}>
                    <tbody>
                      <tr className="grdHeader">
                        <td style={{width: "3%"}}>
                          <img src={imageIcon.checkBoxImage} alt="Check" />
                        </td>
                        <td>Clinic</td>
                      </tr>
                      <tr className="grdItemStyle">
                        <td style={{borderRight: "1px solid #dadbdcff", padding: "0px 3px 4px 0px"}}>
                          <input id="checkbox" type="checkbox" name="checkbox" value={checked} defaultChecked className="customCheckbox" />
                        </td>
                        <td>
                          <Box sx={{fontSize: "11.5px", fontWeight: "normal"}}>Travancore Medical College Hospital- (TMCH)</Box>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Box>
                {/* Clinic Selection End */}
              </Box>
              {/* SEcondary Section for search input and clinic selection end */}
            </Box>
            {/* Left section End */}

            {/* Right section start */}
            <Box sx={{display: "flex", flex: 1, flexDirection: "column"}}>
              {/* SEcondary Section for search input and clinic selection start */}
              <Box sx={{display: "flex", flex: 1, flexDirection: "column"}}>
                {/* Search input  */}
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
                {/* Search input End */}

                {/* user Selection section */}
                <Box sx={{display: "flex", flex: 1, overflow: "hidden"}}>
                  <Box sx={{width: "95%", maxHeight: "150px", overflowY: "auto"}}>
                    <table className="grdDetails" cellSpacing={0} style={{width: "100%"}}>
                      <tbody>
                        <tr className="grdHeader">
                          <td style={{width: "3%"}}>
                            <img src={imageIcon.checkBoxImage} alt="Check" />
                          </td>
                          <td>Users</td>
                        </tr>
                        {user.map((item, index) => {
                          return (
                            <tr className="grdItemStyle" key={`row-${index}`}>
                              <td style={{borderRight: "1px solid #dadbdcff", padding: "0px 3px 4px 0px"}}>
                                <input id={`checkbox-${index}`} type="checkbox" name={`checkbox-${index}`} value={true} defaultChecked className="customCheckbox" />
                              </td>
                              <td key={`row-${index}`}>
                                <Box sx={{fontSize: "11.5px", fontWeight: "normal"}}>{item}</Box>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </Box>
                </Box>
                {/* user Selection section End */}
              </Box>
            </Box>
            {/* Right section End */}
          </Box>
        </Box>
        {/* Bottom Menu section  */}
        <Box sx={{display: "flex", justifyContent: "center", paddingBottom: "3px"}}>
          <ButtonCmp name="Preview" style={{marginRight: "5px"}} onClick={handleNavigateToDetlPage} />
          <ButtonCmp name="Close" style={{}} onClick={() => navigate(-1)} />
        </Box>
        <Divider sx={{marginX: "2px", backgroundColor: "#949494"}} />
        <Box sx={{height: "27px"}}></Box>
      </Paper>
    </Paper>
  );
};

export default CollectionTmchReports;
