import {Box, Checkbox, FormControlLabel, Paper} from "@mui/material";
import React, {memo} from "react";
import "./Style.css";
// import SearchIcon from "@mui/icons-material/Search";
import {Input} from "@mui/joy";
import SearchIcon from "../../assets/SearchSmall.png";

const ContentMain = (prop) => {
  return (
    <Box flex={1} sx={{padding: "10px 20px 10px 20px"}}>
      {/* <div className="divSearchMenu">
        <input id="checkbox" type="checkbox" name="checkbox" checked className="customCheckbox" />
        <label className="ckhAllMdlue" htmlFor="checkbox">
          All Modules
        </label>
        <input type="text" className="inputSearchMenu" placeholder="Search Menu" />
        <img alt="" src={SearchIcon} class="imgDataLoader" border="0" />
      </div> */}
      <div className="divSearchMenu">
        <input id="checkbox" type="checkbox" name="checkbox" defaultChecked className="customCheckbox" />

        <label className="ckhAllMdlue" htmlFor="checkbox">
          All Modules
        </label>

        <div className="searchInputWrapper">
          <input type="text" className="inputSearchMenu" placeholder="Search Menu" />
          <img alt="Search" src={SearchIcon} className="imgDataLoader" border="0" />
        </div>
      </div>
      <div flex={1}>{prop.children}</div>
    </Box>
  );
};

export default memo(ContentMain);
