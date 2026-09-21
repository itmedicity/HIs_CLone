import React, {useEffect, useMemo, useRef, useState} from "react";
import {Box, Divider, Paper} from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import {useNavigate} from "react-router-dom";
import SearchIcon from "../../../../assets/SearchSmall.png";
import ButtonCmp from "../../../Components/ButtonCmp";
import "../CollectionReports/Style.css";
import {imageIcon} from "../../../../assets/ImageExport";
import {axiosinstance} from "../../../../controllers/AxiosConfig";
import {errorNofity, warningNofity} from "../../../../Constant/Constants";
import {COLLECTION_ONLY_VARIANTS} from "./collectionOnlyVariants";

// The cashier list can run into the thousands, so only the rows on screen are rendered
// (fixed row height lets the visible slice be computed from scrollTop without measuring).
const USER_ROW_HEIGHT = 24;
const USER_LIST_HEIGHT = 150;
const USER_LIST_OVERSCAN = 8;

const toCapitalCase = (value) =>
  (value ?? "")
    .toLowerCase()
    .split(" ")
    .map((word) => (word ? word[0].toUpperCase() + word.slice(1) : word))
    .join(" ");

// Same admission lookup IncomeReportsTmch.jsx uses: POST /admission/getIpNumber. success 2 is
// "No Result" (a legitimately empty list); anything else non-1 is a failure and must not fall
// through to an empty list, which would silently change what the report includes.
const fetchIpNumbers = async (selectIpNumbers, fromDate, toDate) => {
  const {data: body} = await axiosinstance.post("/admission/getIpNumber", {
    from: moment(fromDate).format("YYYY-MM-DD 00:00:00"),
    to: moment(toDate).format("YYYY-MM-DD 23:59:59"),
  });
  if (body?.success === 2) return [];
  if (body?.success !== 1) throw new Error(body?.message || "IP admission lookup failed");
  return selectIpNumbers(body.data ?? []);
};

const CollectionOnlyFilterPage = ({variant}) => {
  const navigate = useNavigate();
  const config = COLLECTION_ONLY_VARIANTS[variant];

  const [fromDate, setFromDate] = useState(() => moment().startOf("day").toDate());
  const [toDate, setToDate] = useState(() => moment().endOf("day").toDate());
  const [checked, setChecked] = useState(false);
  const [busy, setBusy] = useState(false);
  const [userList, setUserList] = useState([]);
  const [userSearch, setUserSearch] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [userListScrollTop, setUserListScrollTop] = useState(0);
  const userListRef = useRef(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const {data: body} = await axiosinstance.get("/oraUser");
        const users = body?.success ? (body.data ?? []) : [];
        setUserList(users);
        setSelectedUsers(users.map((item) => item.US_CODE));
      } catch (error) {
        setUserList([]);
      }
    };
    fetchUsers();
  }, []);

  const handlePreview = async () => {
    if (busy) return;
    if (fromDate > toDate) {
      warningNofity("From date cannot be after To date.");
      return;
    }
    setBusy(true);
    try {
      const ipNumbers = config.selectIpNumbers ? await fetchIpNumbers(config.selectIpNumbers, fromDate, toDate) : [];
      // Only pass a real filter when the cashier isn't fully selected — undefined for the
      // "everyone checked" case lets the report show every cashier.
      const selectedUserCodes = selectedUsers.length < userList.length ? selectedUsers : undefined;
      navigate(`/Menu/${config.detailRoute}`, {
        state: {from: fromDate.toISOString(), to: toDate.toISOString(), selectedUserCodes, ipNumbers},
      });
    } catch (error) {
      console.error("Error preparing collection report:", error);
      errorNofity("Unable to load the IP admission list. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const filteredUserList = useMemo(() => userList.filter((item) => (item.USC_NAME ?? "").toLowerCase().includes(userSearch.trim().toLowerCase())), [userList, userSearch]);

  // Reset scroll whenever the filtered set changes so the visible slice doesn't point past
  // the end of a shorter, filtered list.
  useEffect(() => {
    setUserListScrollTop(0);
    if (userListRef.current) userListRef.current.scrollTop = 0;
  }, [userSearch]);

  const startIndex = Math.max(0, Math.floor(userListScrollTop / USER_ROW_HEIGHT) - USER_LIST_OVERSCAN);
  const visibleCount = Math.ceil(USER_LIST_HEIGHT / USER_ROW_HEIGHT) + USER_LIST_OVERSCAN * 2;
  const endIndex = Math.min(filteredUserList.length, startIndex + visibleCount);
  const visibleUserList = filteredUserList.slice(startIndex, endIndex);
  const topSpacer = startIndex * USER_ROW_HEIGHT;
  const bottomSpacer = (filteredUserList.length - endIndex) * USER_ROW_HEIGHT;

  // Whole days only: the picker has no time selector, so a picked day always spans
  // 00:00:00 – 23:59:59, matching the "From dd-Mon-yyyy To dd-Mon-yyyy" report header.
  const dateFormat = "dd/MM/yyyy hh:mm:ss aa";

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
              <Box sx={{display: "flex", flex: 1, flexDirection: "column"}}>
                {/*  Date Selection start*/}
                <Box sx={{display: "flex", flex: 1, marginTop: "36px", flexDirection: "column"}}>
                  {/* From Date */}
                  <Box sx={{display: "flex", flexDirection: "row"}}>
                    <Box className="customUserCollectionLabelPaddingCorrection" sx={{width: "73px", textAlign: "end", alignContent: "center", paddingRight: "0px"}}>
                      From Date:
                    </Box>
                    <DatePicker
                      showPopperArrow={false}
                      selected={fromDate}
                      className="customUserCollectionDatePicker customUserCollectionDatePickerReduceLength"
                      dateFormat={dateFormat}
                      onChange={(date) => date && setFromDate(moment(date).startOf("day").toDate())}
                    />
                  </Box>

                  {/* To Date */}
                  <Box sx={{display: "flex", flexDirection: "row"}}>
                    <Box className="customUserCollectionLabelPaddingCorrection" sx={{width: "73px", textAlign: "end", alignContent: "center", paddingRight: "0px"}}>
                      To Date:
                    </Box>
                    <DatePicker
                      showPopperArrow={false}
                      selected={toDate}
                      className="customUserCollectionDatePicker customUserCollectionDatePickerReduceLength"
                      dateFormat={dateFormat}
                      onChange={(date) => date && setToDate(moment(date).endOf("day").toDate())}
                    />
                  </Box>

                  <Box sx={{display: "flex", alignItems: "center", marginTop: "2px", marginLeft: "71px"}}>
                    <input id="checkbox" type="checkbox" name="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} className="customCheckbox" />
                    <label htmlFor="checkbox" style={{fontSize: "12px", fontFamily: "Arial,Tahoma,Verdana,sans-serif", marginTop: 5}}>
                      Include fully advance settled bill
                    </label>
                  </Box>

                  {/* Bottom Menu section  */}
                  <Box sx={{display: "flex", marginLeft: "90px", alignItems: "center", marginTop: "18px"}}>
                    <ButtonCmp name={busy ? "Loading..." : "Preview"} style={{marginRight: "5px"}} onClick={handlePreview} />
                    <ButtonCmp name="Close" style={{}} onClick={() => navigate(-1)} />
                  </Box>
                </Box>
                {/*  Date Selection end */}
              </Box>
            </Box>
            {/* Left section End */}

            {/* Right section start */}
            <Box sx={{display: "flex", flex: 1, flexDirection: "column"}}>
              <Box sx={{display: "flex", flex: 1, flexDirection: "column"}}>
                {/* Search input  */}
                <Box sx={{height: "28px", paddingTop: 0.4, display: "flex", alignItems: "center", justifyContent: "end", paddingRight: "18px"}}>
                  <Box sx={{display: "flex"}}>
                    <input
                      value={userSearch}
                      onChange={(e) => setUserSearch(e.target.value)}
                      placeholder="Search"
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
                  <Box ref={userListRef} onScroll={(e) => setUserListScrollTop(e.target.scrollTop)} sx={{width: "95%", maxHeight: `${USER_LIST_HEIGHT}px`, overflowY: "auto"}}>
                    <table className="grdDetails" cellSpacing={0} style={{width: "100%"}}>
                      <thead>
                        <tr className="grdHeader">
                          <td style={{width: "3%", position: "sticky", top: 0, zIndex: 1, backgroundColor: "#ecebeb"}}>
                            <img src={imageIcon.checkBoxImage} alt="Check" />
                          </td>
                          <td style={{position: "sticky", top: 0, zIndex: 1, backgroundColor: "#ecebeb"}}>Users</td>
                        </tr>
                      </thead>
                      <tbody>
                        {topSpacer > 0 && (
                          <tr style={{height: topSpacer}}>
                            <td colSpan={2} style={{padding: 0, border: "none"}} />
                          </tr>
                        )}
                        {visibleUserList.map((item, index) => {
                          const rowKey = item.US_CODE ?? startIndex + index;
                          return (
                            <tr className="grdItemStyle" key={`row-${rowKey}`} style={{height: USER_ROW_HEIGHT}}>
                              <td style={{border: "1px solid #eaeaea", padding: "0px 3px 4px 0px"}}>
                                <input
                                  id={`checkbox-${rowKey}`}
                                  type="checkbox"
                                  name={`checkbox-${rowKey}`}
                                  value={item.US_CODE}
                                  checked={selectedUsers.includes(item.US_CODE)}
                                  onChange={(e) => {
                                    const {checked: isChecked} = e.target;
                                    setSelectedUsers((prev) => (isChecked ? [...prev, item.US_CODE] : prev.filter((code) => code !== item.US_CODE)));
                                  }}
                                  className="customCheckbox"
                                />
                              </td>
                              <td style={{border: "1px solid #eaeaea", padding: "0px 3px 4px 0px"}}>
                                <Box sx={{fontSize: "11.5px", fontWeight: "normal"}}>{toCapitalCase(item.USC_NAME)}</Box>
                              </td>
                            </tr>
                          );
                        })}
                        {bottomSpacer > 0 && (
                          <tr style={{height: bottomSpacer}}>
                            <td colSpan={2} style={{padding: 0, border: "none"}} />
                          </tr>
                        )}
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

export default CollectionOnlyFilterPage;
