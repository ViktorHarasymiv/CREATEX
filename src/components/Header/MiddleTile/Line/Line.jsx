import css from "./Line.module.css";

function Line() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1"
      height="22"
      viewBox="0 0 1 22"
      fill="none"
      className={css.line_style}
    >
      <line
        x1="0.5"
        y1="-1.98688e-08"
        x2="0.500001"
        y2="22"
        stroke="url(#paint0_linear_34499_4500)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_34499_4500"
          x1="-0.999994"
          y1="22"
          x2="-0.951591"
          y2="-0.00209345"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#DADBDD" stopOpacity="0" />
          <stop offset="0.123257" stopColor="#DADBDD" stopOpacity="0.5" />
          <stop offset="0.519097" stopColor="#DADBDD" />
          <stop offset="0.878479" stopColor="#DADBDD" stopOpacity="0.5" />
          <stop offset="1" stopColor="#DADBDD" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default Line;
