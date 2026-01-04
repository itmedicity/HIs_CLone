import {forwardRef} from "react";
import calenderIcon from "../../../../assets/date_pick.png";

export const CustomCalanderComponents = forwardRef(({value, onClick, className, showCalendarIcon = true}, ref) => (
  <div>
    <input
      className={className}
      onClick={onClick}
      ref={ref}
      value={value}
      readOnly
      style={{
        width: "60%",
        fontSize: "12px",
      }}
    />
    {showCalendarIcon && (
      <img
        src={calenderIcon}
        alt="calendar"
        onClick={onClick}
        style={{
          position: "absolute",
          right: "55px",
          top: "50%",
          transform: "translateY(-35%)",
          width: "15px",
          height: "15px",
          cursor: "pointer",
        }}
      />
    )}
  </div>
));
