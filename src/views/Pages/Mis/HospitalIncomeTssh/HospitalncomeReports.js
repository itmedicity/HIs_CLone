// @ts-nocheck
import React, {memo, useCallback, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Paper, Box, Divider} from "@mui/material";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ButtonCmp from "../../../Components/ButtonCmp";
import {imageIcon} from "../../../../assets/ImageExport";
import {axiosinstance} from "../../../../controllers/AxiosConfig";
import {CustomCalanderComponents} from "../Components/CustomCalenderComp";
import SearchIcon from "../../../../assets/SearchSmall.png";
import "./Style.css";

const HospitalncomeReports = () => {
  /**
   * Hospital Income Statement - TSSH
   */
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [checked, setChecked] = useState(false);

  const navigateToReport = (ipNumber, rmIpNumber, ipNoColl) => {
    navigate("/Menu/income-reports-tssh", {
      state: {
        from: moment(startDate).format("DD/MM/YYYY 00:00:00"),
        to: moment(endDate).format("DD/MM/YYYY 23:59:59"),
        ptno: ipNumber,
        phar: rmIpNumber,
        ipNoColl,
        group: 0,
        groupIdForPrevious: 0,
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

      const getIpNumberResponse = await axiosinstance.post("/admission/getIpNumberTssh", postData2);
      const {success, data} = getIpNumberResponse.data;
      const ipNumber = success === 1 ? data?.map((e) => e.ip_no) : [];
      const rmIpNumber = success === 1 ? data?.filter((e) => e.tmch_status === "0").map((e) => e.ip_no) : [];

      const postDate = {
        from: moment(startDate).format("DD/MM/YYYY 00:00:00"),
        to: moment(endDate).format("DD/MM/YYYY 23:59:59"),
      };

      const getIpReceiptInfoResponse = await axiosinstance.post("/admission/getIpReceiptInfo", postDate);
      const {success: ipReceiptSuccess, data: ipReceiptData} = getIpReceiptInfoResponse.data;

      let ipNoColl = ipNumber;
      if (ipReceiptSuccess === 1 && ipReceiptData.length > 0) {
        let minDate = ipReceiptData.reduce((min, obj) => {
          const currentDate = new Date(obj.ADMISSION);
          return currentDate < min ? currentDate : min;
        }, new Date(ipReceiptData[0].ADMISSION));

        const post_data0 = {
          from: moment(minDate).format("YYYY-MM-DD 00:00:00"),
          to: moment(endDate).format("YYYY-MM-DD 23:59:59"),
        };

        // console.log(`tssh --------->`, post_data0);

        const dischargeResponse = await axiosinstance.post("/admission/getIpDischargedPatientInfo", post_data0);
        const {success: dischargeSuccess, data: dischargeData} = dischargeResponse.data;

        if (dischargeSuccess === 1 && dischargeData.length > 0) {
          const array1 = dischargeData.map((e) => e.ip_no);
          const array2 = ipReceiptData.map((e) => e.IP_NO);
          const filtedArray = array1.filter((item) => array2.includes(item));
          ipNoColl = ipNumber.concat(filtedArray);
        }
      }
      // console.log(ipNumber);

      navigateToReport(ipNumber, rmIpNumber, ipNoColl);
    } catch (error) {
      console.error("Error fetching report data:", error);
      alert("Failed to fetch report data. Please try again.");
      navigateToReport([], [], []);
    }
    /***
     *
     *
     *
     *
     *
     *
     */
    // const postDataForMysql = {
    //   fromDate: moment(startDate).format("YYYY-MM-DD"),
    //   toDate: moment(endDate).format("YYYY-MM-DD"),
    // };

    // await axiosinstance.post("/admission/getIpNumberTssh", postData2).then((result) => {
    //   console.log(postData2);

    //   const {success, data} = result.data;
    //   if (success === 1) {
    //     const ipNumber = data?.map((e) => e.ip_no);
    //     const rmIpNumber = data?.filter((e) => e.tmch_status === "0").map((e) => e.ip_no);

    //     //GET THE ORACLE RECEIPT
    //     axiosinstance
    //       .post("/admission/getIpReceiptInfo", postDate)
    //       .then((result2) => {
    //         const {success, data} = result2.data;
    //         if (success === 1) {
    //           const ipReceiptData = data;
    //           if (Object.values(ipReceiptData).length > 0) {
    //             //FIND THE MINIMUM DATE (ADMISSION DATE TO THE CORRESPODING IP NUMBER)
    //             let minDate = ipReceiptData.reduce((min, obj) => {
    //               const currentDate = new Date(obj.ADMISSION);
    //               return currentDate < min ? currentDate : min;
    //             }, new Date(ipReceiptData[0].ADMISSION));

    //             //GET THE IP NUMBER BASED ON RECEIPT
    //             const post_data0 = {
    //               from: moment(minDate).format("YYYY-MM-DD 00:00:00"),
    //               to: moment(endDate).format("YYYY-MM-DD 23:59:59"),
    //             };
    //             //GET THE DISCHARGED IP NUMBER LIST FROM MYSQL BASED ON MINIMUM DATE ( ADMISSION DATE)
    //             axiosinstance
    //               .post("/admission/getIpDischargedPatientInfo", post_data0)
    //               .then((result3) => {
    //                 const {success, data} = result3.data;
    //                 if (success === 1) {
    //                   const newIpReceiptBased = data;
    //                   if (Object.values(newIpReceiptBased).length > 0) {
    //                     const array1 = newIpReceiptBased?.map((e) => e.ip_no);
    //                     const array2 = ipReceiptData?.map((e) => e.IP_NO);

    //                     const filtedArray = array1.filter((item) => array2.includes(item));

    //                     navigate("/Menu/income-reports-tssh", {
    //                       state: {
    //                         from: postDate.from,
    //                         to: postDate.to,
    //                         ptno: ipNumber,
    //                         phar: rmIpNumber,
    //                         ipNoColl: ipNumber?.concat(filtedArray),
    //                         group: 0,
    //                         groupIdForPrevious: 0,
    //                       },
    //                     });

    //                     console.log(ipNumber);
    //                   } else {
    //                     navigate("/Menu/income-reports-tssh", {
    //                       state: {
    //                         from: postDate.from,
    //                         to: postDate.to,
    //                         ptno: ipNumber,
    //                         phar: rmIpNumber,
    //                         ipNoColl: ipNumber,
    //                         group: 0,
    //                         groupIdForPrevious: 0,
    //                       },
    //                     });
    //                   }
    //                 } else {
    //                   navigate("/Menu/income-reports-tssh", {
    //                     state: {
    //                       from: postDate.from,
    //                       to: postDate.to,
    //                       ptno: ipNumber,
    //                       phar: rmIpNumber,
    //                       ipNoColl: ipNumber,
    //                       group: 0,
    //                       groupIdForPrevious: 0,
    //                     },
    //                   });
    //                 }
    //               })
    //               .catch(() => {
    //                 navigate("/Menu/income-reports-tssh", {
    //                   state: {
    //                     from: postDate.from,
    //                     to: postDate.to,
    //                     ptno: ipNumber,
    //                     phar: rmIpNumber,
    //                     ipNoColl: ipNumber,
    //                     group: 0,
    //                     groupIdForPrevious: 0,
    //                   },
    //                 });
    //               });
    //           } else {
    //             navigate("/Menu/income-reports-tssh", {
    //               state: {
    //                 from: postDate.from,
    //                 to: postDate.to,
    //                 ptno: ipNumber,
    //                 phar: rmIpNumber,
    //                 ipNoColl: ipNumber,
    //                 group: 0,
    //                 groupIdForPrevious: 0,
    //               },
    //             });
    //           }
    //         } else {
    //           navigate("/Menu/income-reports-tssh", {
    //             state: {
    //               from: postDate.from,
    //               to: postDate.to,
    //               ptno: ipNumber,
    //               phar: rmIpNumber,
    //               ipNoColl: ipNumber,
    //               group: 0,
    //               groupIdForPrevious: 0,
    //             },
    //           });
    //         }
    //       })
    //       .catch((e) => {
    //         navigate("/Menu/income-reports-tssh", {
    //           state: {
    //             from: postDate.from,
    //             to: postDate.to,
    //             ptno: ipNumber,
    //             phar: rmIpNumber,
    //             ipNoColl: ipNumber,
    //             group: 0,
    //             groupIdForPrevious: 0,
    //           },
    //         });
    //       });

    //     navigate("/Menu/income-reports-tssh", {
    //       state: {
    //         from: postDate.from,
    //         to: postDate.to,
    //         ptno: ipNumber,
    //         phar: rmIpNumber,
    //         ipNoColl: ipNumber,
    //         group: 0,
    //         groupIdForPrevious: 0,
    //       },
    //     });
    //   } else {
    //     navigate("/Menu/income-reports", {
    //       state: {
    //         from: postDate.from,
    //         to: postDate.to,
    //         ptno: [],
    //         phar: [],
    //         group: 0,
    //         groupIdForPrevious: 0,
    //       },
    //     });
    //   }
    // });
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
                      <Box sx={{fontSize: "11.5px", fontWeight: "normal"}}>Travancore Medical College Hospital- (TSSH)</Box>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Box>
          </Box>
        </Box>
        <Divider sx={{marginX: "2px", backgroundColor: "#949494"}} />
        <Box sx={{height: "27px"}}></Box>
      </Paper>
    </Paper>
  );
};

export default memo(HospitalncomeReports);
