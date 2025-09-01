import {Box} from "@mui/material";
import React from "react";

const ReportBottomMenu = ({ClinicName, UserName}) => {
  return (
    <Box sx={{display: "flex", justifyContent: "flex-end", mt: 2, height: 77, flexDirection: "column"}}>
      <Box sx={{flex: 1, height: 28, borderBottomWidth: 1, borderBottomColor: "black", borderBottomStyle: "solid", display: "flex", alignItems: "flex-end"}}>
        <Box
          sx={{
            height: 18,
            display: "flex",
            color: "#005B9A",
            fontFamily: "Calibri,arial",
            fontWeight: "bold",
            paddingLeft: "20px",
            fontSize: "15px",
          }}
        >
          <div>Clinic-{`${ClinicName || "Travancore Medical College & Hospital"}`}</div>
        </Box>
      </Box>
      <Box
        sx={{
          height: 49,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Box
          sx={{
            height: 15,
            display: "flex",
            color: "#999999",
            fontFamily: "Calibri,arial",
            fontWeight: "normal",
            paddingRight: 10,
            fontSize: "15px",
          }}
        >
          <div>User : {`${UserName || "Accounts"}`}</div>
        </Box>
      </Box>
    </Box>
  );
};

export default React.memo(ReportBottomMenu);
