import React, {useEffect, useRef, useState} from "react";
import {Box} from "@mui/material";
import moment from "moment";
import {WEEKDAYS, CELL_SIZE, TIME_ROW_HEIGHT, buildCalendarWeeks} from "../utils/dateTimeFieldUtils";

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

export default DateTimeField;
