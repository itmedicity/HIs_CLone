import React, {useState} from "react";
import {Box, Divider, Paper} from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import {CustomCalanderComponents} from "../../../Components/CustomCalenderComp";

import SearchIcon from "../../../../../../assets/SearchSmall.png";
import {useNavigate} from "react-router-dom";
import ButtonCmp from "../../../../../Components/ButtonCmp";
import "../../Style.css";
import {imageIcon} from "../../../../../../assets/ImageExport";

const user = [100, 1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 10008, 10009, 10008, 10010, 10011, 10022];

const CollectionReportsCollectionOnly = () => {
  const navigate = useNavigate();

  const [checked, setChecked] = useState(false);

  const handleNavigateToDetlPage = () => {
    navigate("/Menu/CollectionReportCollectionOnlyDetl");
  };

  return (
    <Paper sx={{display: "flex", flex: 1, justifyContent: "center"}} square variant="outlined">
      <Paper
        square
        sx={{
          display: "flex",
          width: "652px",
          marginTop: 3,
          height: "250px",
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
        <Box sx={{display: "flex", flex: 1, marginBottom: 0}}>
          {/* main section for dividing the two section */}
          <Box sx={{display: "flex", flex: 1}}>
            {/* Left section Start*/}
            <Box sx={{display: "flex", flex: 1, flexDirection: "column"}}>
              {/* SEcondary Section for search input and clinic selection start */}
              <Box sx={{display: "flex", flex: 1, flexDirection: "column"}}>
                {/* Search input  */}
                {/*  Date Selection start*/}
                <Box sx={{display: "flex", flex: 1, marginTop: "36px", flexDirection: "column"}}>
                  {/* From Date */}
                  <Box className="" sx={{display: "flex", flexDirection: "row"}}>
                    <Box className="customUserCollectionLabelPaddingCorrection" sx={{width: "73px", textAlign: "end", alignContent: "center", paddingRight: "0px"}}>
                      From Date:
                    </Box>

                    <DatePicker
                      showPopperArrow={false}
                      selected={new Date()}
                      className="customUserCollectionDatePicker customUserCollectionDatePickerReduceLength"
                      dateFormat="dd/MM/yyyy HH:mm:ss a"
                      onChange={() => {}}
                    />
                  </Box>

                  <Box className="" sx={{display: "flex", flexDirection: "row"}}>
                    <Box className="customUserCollectionLabelPaddingCorrection" sx={{width: "73px", textAlign: "end", alignContent: "center", paddingRight: "0px"}}>
                      To Date:
                    </Box>
                    <DatePicker
                      showPopperArrow={false}
                      selected={new Date()}
                      className="customUserCollectionDatePicker customUserCollectionDatePickerReduceLength"
                      dateFormat="dd/MM/yyyy HH:mm:ss a"
                      onChange={() => {}}
                    />
                  </Box>

                  <Box sx={{display: "flex", alignItems: "center", marginTop: "2px", marginLeft: "71px"}}>
                    <input id="checkbox" type="checkbox" name="checkbox" value={checked} className="customCheckbox" />
                    <label htmlFor="checkbox" style={{fontSize: "12px", fontFamily: "Arial,Tahoma,Verdana,sans-serif", marginTop: 5}}>
                      Include fully advance settled bill
                    </label>
                  </Box>

                  {/* Bottom Menu section  */}
                  <Box sx={{display: "flex", marginLeft: "90px", alignItems: "center", marginTop: "18px"}}>
                    <ButtonCmp name="Preview" style={{marginRight: "5px"}} onClick={handleNavigateToDetlPage} />
                    <ButtonCmp name="Close" style={{}} onClick={() => navigate(-1)} />
                  </Box>
                </Box>
                {/*  Date Selection end */}
              </Box>
              {/* SEcondary Section for search input and clinic selection end */}
            </Box>
            {/* Left section End */}

            {/* Right section start */}
            <Box sx={{display: "flex", flex: 1, flexDirection: "column"}}>
              {/* SEcondary Section for search input and clinic selection start */}
              <Box sx={{display: "flex", flex: 1, flexDirection: "column"}}>
                {/* Search input  */}
                <Box sx={{height: "28px", paddingTop: 0.4, display: "flex", alignItems: "center", justifyContent: "end", paddingRight: "18px"}}>
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
                <Box className="customScrollBar" sx={{display: "flex", flex: 1, overflow: "hidden", justifyContent: "end", marginRight: "2px"}}>
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
                              <td style={{border: "1px solid #eaeaea", padding: "0px 3px 4px 0px"}}>
                                <input id={`checkbox-${index}`} type="checkbox" name={`checkbox-${index}`} value={true} defaultChecked className="customCheckbox" />
                              </td>
                              <td key={`row-${index}`} style={{border: "1px solid #eaeaea", padding: "0px 3px 4px 0px"}}>
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
        <Divider sx={{marginX: "2px", backgroundColor: "#949494"}} />
        <Box sx={{height: "27px"}}></Box>
      </Paper>
    </Paper>
  );
};

export default CollectionReportsCollectionOnly;
