import React from "react";
import Word from "../../../../assets/Icon_Word.jpg";
import Excel from "../../../../assets/Icon_Excel.jpg";
import Print from "../../../../assets/Icon_Print.jpg";
import Close from "../../../../assets/Icon_Close.jpg";
import {Box} from "@mui/material";
import {useNavigate} from "react-router-dom";

const MenuButton = ({navigateTo, layOutClose, onExportExcel, onExportWord, onPrint}) => {
  const navigate = useNavigate();

  // Print has no per-report content to know about — window.print() just prints whatever the
  // browser currently has rendered, so it works for every existing caller with no changes on
  // their end. A page can still override it (e.g. to open a dedicated print-preview view)
  // by passing its own onPrint.
  const handlePrint = onPrint ?? (() => window.print());

  const handleClose = () => {
    if (typeof layOutClose === "function") {
      layOutClose(undefined);
      return;
    }
    if (navigateTo) {
      navigate(`/Menu/${navigateTo}`);
      return;
    }
    window.close();
  };

  return (
    <Box sx={{display: "flex", justifyContent: "flex-end", margin: "12px"}}>
      <Box sx={{width: 266.25, backgroundColor: "lightgray"}}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            width: 266,
            height: 36,
            flexDirection: "row",
            border: "1px solid #D1D1D2",
            backgroundColor: "#F6F7F0",
            borderRadius: "5px",
            padding: "2px",
            boxShadow: "0 1px 2px #c1c1c1",
            filter: "grayscale(100%)",
            ":hover": {
              filter: "grayscale(0%)",
            },
          }}
        >
          <Box sx={{width: 62, cursor: "pointer"}} onClick={onExportWord}>
            <img src={Word} alt="qmt" />
          </Box>
          <Box sx={{width: 62, cursor: "pointer"}} onClick={onExportExcel}>
            <img src={Excel} alt="qmt" />
          </Box>
          <Box sx={{width: 62, cursor: "pointer"}} onClick={handlePrint}>
            <img src={Print} alt="qmt" />
          </Box>
          <Box sx={{width: 62, cursor: "pointer"}} onClick={handleClose}>
            <img src={Close} alt="qmt" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default React.memo(MenuButton);
