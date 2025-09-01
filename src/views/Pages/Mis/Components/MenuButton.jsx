import React from "react";
import Word from "../../../../assets/Icon_Word.jpg";
import Excel from "../../../../assets/Icon_Excel.jpg";
import Print from "../../../../assets/Icon_Print.jpg";
import Close from "../../../../assets/Icon_Close.jpg";
import {Box} from "@mui/material";
import {useNavigate} from "react-router-dom";

const MenuButton = ({navigateTo}) => {
  const navigate = useNavigate();
  return (
    <Box sx={{display: "flex", height: 62}}>
      <Box sx={{flex: 1}}></Box>
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
          <Box sx={{width: 62, cursor: "pointer"}}>
            <img src={Word} alt="qmt" />
          </Box>
          <Box sx={{width: 62, cursor: "pointer"}}>
            <img src={Excel} alt="qmt" />
          </Box>
          <Box sx={{width: 62, cursor: "pointer"}}>
            <img src={Print} alt="qmt" />
          </Box>
          <Box sx={{width: 62, cursor: "pointer"}} onClick={() => navigate(`/Menu/${navigateTo}`)}>
            <img src={Close} alt="qmt" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default React.memo(MenuButton);
