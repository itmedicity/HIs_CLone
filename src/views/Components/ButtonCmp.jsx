import {Button} from "@mui/joy";
import React, {memo} from "react";

const ButtonCmp = ({name, style, onClick}) => {
  return (
    <button
      onClick={onClick}
      style={{
        ...style,
        background: "-webkit-gradient( linear, left top, left bottom, from(#ffffff), color-stop(0.50, #ebebeb), color-stop(0.50, #dbdbdb), to(#ECEBEB))",
        borderRadius: "3px",
        border: "1px solid #FFF",
        boxShadow: "0px 1px 3px rgba(000,000,000,0.5),inset 0px 0px 1px rgba(255,255,255,1)",
        position: "relative",
        lineHeight: "16px",
        fontSize: "12px",
        fontWeight: "bold",
        padding: "4px",
        marginTop: "-4px",
        cursor: "pointer",
        minWidth: "60px",
      }}
    >
      {name}
    </button>
  );
};

export default memo(ButtonCmp);
