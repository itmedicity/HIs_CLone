import React, {useEffect, useRef, useState} from "react";
import {Box, Divider, Paper} from "@mui/material";
import moment from "moment";
import ButtonCmp from "../../../../../Components/ButtonCmp";
import {imageIcon} from "../../../../../../assets/ImageExport";
import SearchIcon from "../../../../../../assets/SearchSmall.png";
import "../../Style.css";
import {useNavigate} from "react-router-dom";

const user = [100, 1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 10008, 10009, 10008, 10010, 10011, 10022];

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const CELL_SIZE = 34;
const TIME_ROW_HEIGHT = 26;

const buildCalendarWeeks = (viewMonth) => {
  const start = moment(viewMonth).startOf("month").startOf("week");
  const end = moment(viewMonth).endOf("month").endOf("week");
  const weeks = [];
  const cursor = start.clone();
  while (cursor.isSameOrBefore(end, "day")) {
    const week = [];
    for (let i = 0; i < 7; i++) {
      week.push(cursor.clone());
      cursor.add(1, "day");
    }
    weeks.push(week);
  }
  return weeks;
};

// Fully custom calendar + time-list popup (no react-datepicker). The time list keeps the
// seconds it was opened with and steps by 1 minute, matching the design's "01:29:55 am,
// 01:30:55 am, ..." pattern.
const DateTimeField = ({label, value, onChange, paddingLeft}) => {
  const [open, setOpen] = useState(false);
  const [viewMonth, setViewMonth] = useState(() => moment(value));
  const [refSeconds, setRefSeconds] = useState(value.getSeconds());
  const containerRef = useRef(null);
  const timeListRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [open]);

  const openPicker = () => {
    setRefSeconds(value.getSeconds());
    setViewMonth(moment(value));
    setOpen(true);
  };

  const selectDay = (day) => {
    const merged = day
      .clone()
      .hour(value.getHours())
      .minute(value.getMinutes())
      .second(value.getSeconds())
      .millisecond(0);
    onChange(merged.toDate());
    setViewMonth(day.clone());
  };

  const goToday = () => selectDay(moment());

  const handleTimeClick = (time) => {
    const merged = new Date(value);
    merged.setHours(time.getHours(), time.getMinutes(), time.getSeconds(), 0);
    onChange(merged);
    setOpen(false);
  };

  const scrollTimeList = (dir) => {
    if (timeListRef.current) {
      timeListRef.current.scrollTop += dir * TIME_ROW_HEIGHT;
    }
  };

  const weeks = buildCalendarWeeks(viewMonth);

  const timeRows = [];
  for (let i = 0; i < 60; i++) {
    const t = new Date(value);
    t.setSeconds(refSeconds, 0);
    t.setMinutes(t.getMinutes() + i);
    timeRows.push(t);
  }

  const navBtnSx = {cursor: "pointer", color: "#7a7a7a", fontSize: "11px", px: "3px", userSelect: "none"};

  return (
    <Box className="customUserCollectionBoxFrom" sx={{paddingLeft, position: "relative"}} ref={containerRef}>
      <Box className="customUserCollectionLabel">{label}</Box>
      <input
        readOnly
        className="customUserCollectionDatePicker"
        value={moment(value).format("DD/MM/YYYY hh:mm:ss A")}
        onClick={openPicker}
        style={open ? {borderColor: "#f7941d", outline: "none"} : undefined}
      />
      {open && (
        <Box
          sx={{
            position: "absolute",
            top: "100%",
            left: 0,
            zIndex: 50,
            display: "flex",
            background: "#fff",
            border: "1px solid #b0b0b0",
            boxShadow: "1px 2px 6px rgba(0,0,0,0.25)",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          {/* Calendar panel */}
          <Box sx={{width: CELL_SIZE * 7}}>
            <Box sx={{display: "flex", alignItems: "center", padding: "4px 6px", borderBottom: "1px solid #e0e0e0"}}>
              <Box onClick={() => setViewMonth((m) => moment(m).subtract(1, "month"))} sx={navBtnSx}>
                &#9664;
              </Box>
              <Box onClick={goToday} sx={{...navBtnSx, fontSize: "13px"}} title="Today">
                &#8962;
              </Box>
              <Box sx={{flex: 1, textAlign: "center", fontSize: "13px", color: "#333"}}>
                <b>{viewMonth.format("MMMM")}</b> {viewMonth.format("YYYY")}
              </Box>
              <Box onClick={() => setViewMonth((m) => moment(m).add(1, "month"))} sx={navBtnSx}>
                &#9654;
              </Box>
            </Box>
            <Box sx={{display: "flex", backgroundColor: "#f2f2f2"}}>
              {WEEKDAYS.map((d) => (
                <Box key={d} sx={{width: CELL_SIZE, textAlign: "center", fontSize: "11px", fontWeight: "bold", color: "#6b6b6b", padding: "4px 0"}}>
                  {d}
                </Box>
              ))}
            </Box>
            {weeks.map((week) => (
              <Box key={week[0].format("YYYY-MM-DD")} sx={{display: "flex"}}>
                {week.map((day) => {
                  const isCurrentMonth = day.month() === viewMonth.month();
                  const isSelected = day.isSame(moment(value), "day");
                  return (
                    <Box
                      key={day.format("YYYY-MM-DD")}
                      onClick={() => selectDay(day)}
                      sx={{
                        width: CELL_SIZE,
                        height: "24px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "12px",
                        cursor: "pointer",
                        color: isSelected ? "#fff" : isCurrentMonth ? "#333" : "#bbb",
                        backgroundColor: isSelected ? "#1565c0" : "transparent",
                        "&:hover": {backgroundColor: isSelected ? "#1565c0" : "#eef4fb"},
                      }}
                    >
                      {day.date()}
                    </Box>
                  );
                })}
              </Box>
            ))}
          </Box>

          {/* Time panel */}
          <Box sx={{width: "108px", borderLeft: "1px solid #e0e0e0", display: "flex", flexDirection: "column"}}>
            <Box onClick={() => scrollTimeList(-1)} sx={{textAlign: "center", padding: "3px 0", cursor: "pointer", color: "#9a9a9a", borderBottom: "1px solid #e0e0e0", fontSize: "10px", userSelect: "none"}}>
              &#9650;
            </Box>
            <Box ref={timeListRef} sx={{flex: 1, maxHeight: `${TIME_ROW_HEIGHT * 6}px`, overflowY: "auto"}}>
              {timeRows.map((t, idx) => (
                <Box
                  key={idx}
                  onClick={() => handleTimeClick(t)}
                  sx={{
                    height: `${TIME_ROW_HEIGHT}px`,
                    display: "flex",
                    alignItems: "center",
                    padding: "0 8px",
                    fontSize: "12px",
                    cursor: "pointer",
                    backgroundColor: idx === 0 ? "#1565c0" : "transparent",
                    color: idx === 0 ? "#fff" : "#333",
                    fontWeight: idx === 0 ? "bold" : "normal",
                    "&:hover": {backgroundColor: idx === 0 ? "#1565c0" : "#f0f0f0"},
                  }}
                >
                  {moment(t).format("hh:mm:ss a")}
                </Box>
              ))}
            </Box>
            <Box onClick={() => scrollTimeList(1)} sx={{textAlign: "center", padding: "3px 0", cursor: "pointer", color: "#9a9a9a", borderTop: "1px solid #e0e0e0", fontSize: "10px", userSelect: "none"}}>
              &#9660;
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

const CollectionTmchReports = () => {
  const navigate = useNavigate();

  const [checked, setChecked] = useState(false);
  const [fromDate, setFromDate] = useState(moment().startOf("day").toDate());
  const [toDate, setToDate] = useState(moment().endOf("day").toDate());

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
                          <Box sx={{fontSize: "11.5px", fontWeight: "normal", color: "#0000EE"}}>Travancore Medical College Hospital- (TMCH)</Box>
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
                                <Box sx={{fontSize: "11.5px", fontWeight: "normal", color: "#a0522d"}}>{item}</Box>
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
