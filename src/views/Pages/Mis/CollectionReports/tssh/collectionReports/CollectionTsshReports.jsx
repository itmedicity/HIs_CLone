import React, {useEffect, useMemo, useRef, useState} from "react";
import {Box, Divider, Paper} from "@mui/material";
import moment from "moment";
import ButtonCmp from "../../../../../Components/ButtonCmp";
import {imageIcon} from "../../../../../../assets/ImageExport";
import SearchIcon from "../../../../../../assets/SearchSmall.png";
import "../../Style.css";
import {useNavigate} from "react-router-dom";
import DateTimeField from "../components/DateTimeField";
import {GET_TSSH_OraUsers} from "../actions/collectionTsshReportsActions";

// Fixed row height (px) matching the rendered checkbox row, so the visible
// slice can be computed from scrollTop without measuring the DOM. The user
// list can run into the thousands, so rendering every <tr> at once is what
// made scrolling hang — this virtualizes it down to only what's on screen.
const USER_ROW_HEIGHT = 24;
const USER_LIST_HEIGHT = 150;
const USER_LIST_OVERSCAN = 8;

const toCapitalCase = (value) =>
  (value ?? "")
    .toLowerCase()
    .split(" ")
    .map((word) => (word ? word[0].toUpperCase() + word.slice(1) : word))
    .join(" ");

const CollectionTsshReports = () => {
  const navigate = useNavigate();

  const [checked, setChecked] = useState(false);
  const [fromDate, setFromDate] = useState(moment().startOf("day").toDate());
  const [toDate, setToDate] = useState(moment().endOf("day").toDate());
  const [userList, setUserList] = useState([]);
  const [userSearch, setUserSearch] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [userListScrollTop, setUserListScrollTop] = useState(0);
  const userListRef = useRef(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const {success, data} = await GET_TSSH_OraUsers();
        const users = success ? (data ?? []) : [];
        setUserList(users);
        setSelectedUsers(users.map((item) => item.US_CODE));
      } catch (error) {
        setUserList([]);
      }
    };
    fetchUsers();
  }, []);

  const handleNavigateToDetlPage = () => {
    // Only pass a real filter when the cashier isn't fully selected — leaving it
    // undefined for the "everyone checked" case lets the detail page show every
    // cashier, including ones added after this list was fetched.
    const selectedUserCodes = selectedUsers.length < userList.length ? selectedUsers : undefined;
    // Opened as its own popup window (matching TopOfficials' Modal reports) rather than an
    // in-SPA navigation, so router `state` can't cross the window boundary — dates go on the
    // URL, the (possibly long) user-code filter goes through sessionStorage, which a
    // window.open'd popup inherits a snapshot of at creation time.
    if (selectedUserCodes) {
      sessionStorage.setItem("CollectionReportTsshSelectedUserCodes", JSON.stringify(selectedUserCodes));
    } else {
      sessionStorage.removeItem("CollectionReportTsshSelectedUserCodes");
    }
    const params = new URLSearchParams({from: fromDate.toISOString(), to: toDate.toISOString()});
    window.open(`/MenuBare/CollectionReportTsshDetls?${params.toString()}`, "_blank", "toolbar=no,scrollbars=yes,resizable=yes,top=0,left=100,right=300,bottom=0");
  };

  const filteredUserList = useMemo(() => userList.filter((item) => (item.USC_NAME ?? "").toLowerCase().includes(userSearch.trim().toLowerCase())), [userList, userSearch]);

  // Reset scroll position whenever the filtered set changes so the visible
  // slice below doesn't point past the end of a shorter, filtered list.
  useEffect(() => {
    setUserListScrollTop(0);
    if (userListRef.current) userListRef.current.scrollTop = 0;
  }, [userSearch]);

  const userListStartIndex = Math.max(0, Math.floor(userListScrollTop / USER_ROW_HEIGHT) - USER_LIST_OVERSCAN);
  const userListVisibleCount = Math.ceil(USER_LIST_HEIGHT / USER_ROW_HEIGHT) + USER_LIST_OVERSCAN * 2;
  const userListEndIndex = Math.min(filteredUserList.length, userListStartIndex + userListVisibleCount);
  const visibleUserList = filteredUserList.slice(userListStartIndex, userListEndIndex);
  const userListTopSpacer = userListStartIndex * USER_ROW_HEIGHT;
  const userListBottomSpacer = (filteredUserList.length - userListEndIndex) * USER_ROW_HEIGHT;

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
          <DateTimeField label="From Date:" value={fromDate} onChange={setFromDate} paddingLeft="12px" />
          {/* To Date */}
          <DateTimeField label="To Date:" value={toDate} onChange={setToDate} paddingLeft="20px" />
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
                          <input id="checkbox" type="checkbox" name="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} className="customCheckbox" />
                        </td>
                        <td>
                          <Box sx={{fontSize: "11.5px", fontWeight: "normal", color: "#525252"}}>Travancore Super Speciality Hospital- (TSSH)</Box>
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
                <Box sx={{display: "flex", flex: 1, overflow: "hidden"}}>
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
                        {userListTopSpacer > 0 && (
                          <tr style={{height: userListTopSpacer}}>
                            <td colSpan={2} style={{padding: 0, border: "none"}} />
                          </tr>
                        )}
                        {visibleUserList.map((item, index) => {
                          return (
                            <tr className="grdItemStyle" key={`row-${item.US_CODE ?? userListStartIndex + index}`} style={{height: USER_ROW_HEIGHT}}>
                              <td style={{borderRight: "1px solid #dadbdcff", padding: "0px 3px 4px 0px"}}>
                                <input
                                  id={`checkbox-${item.US_CODE ?? userListStartIndex + index}`}
                                  type="checkbox"
                                  name={`checkbox-${item.US_CODE ?? userListStartIndex + index}`}
                                  value={item.US_CODE}
                                  checked={selectedUsers.includes(item.US_CODE)}
                                  onChange={(e) => {
                                    const {checked: isChecked} = e.target;
                                    setSelectedUsers((prev) => (isChecked ? [...prev, item.US_CODE] : prev.filter((code) => code !== item.US_CODE)));
                                  }}
                                  className="customCheckbox"
                                />
                              </td>
                              <td>
                                <Box sx={{fontSize: "11.5px", fontWeight: "normal", color: "#525252", paddingLeft: "4px"}}>{toCapitalCase(item.USC_NAME)}</Box>
                              </td>
                            </tr>
                          );
                        })}
                        {userListBottomSpacer > 0 && (
                          <tr style={{height: userListBottomSpacer}}>
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
        {/* Bottom Menu section  */}
        <Box sx={{display: "flex", justifyContent: "center", paddingBottom: "3px"}}>
          <ButtonCmp name="Preview" style={{marginRight: "5px"}} onClick={handleNavigateToDetlPage} />
          <ButtonCmp name="Close" style={{}} onClick={() => navigate("/Menu/Mis")} />
        </Box>
        <Divider sx={{marginX: "2px", backgroundColor: "#949494"}} />
        <Box sx={{height: "27px"}}></Box>
      </Paper>
    </Paper>
  );
};

export default CollectionTsshReports;
