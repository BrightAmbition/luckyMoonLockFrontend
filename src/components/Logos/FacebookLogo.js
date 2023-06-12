import React from "react";

const FacebookLogo = ({ width, height }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.98093 28.623V15.7817H14.2679L14.9111 10.7757H9.98093V7.58009C9.98093 6.13119 10.3796 5.14379 12.4493 5.14379L15.0846 5.1427V0.66517C14.6289 0.605646 13.0644 0.469177 11.2436 0.469177C7.44146 0.469177 4.83843 2.80167 4.83843 7.0843V10.7757H0.538452V15.7817H4.83843V28.623H9.98093Z"
        fill="white"
      />
    </svg>
  );
};

export default FacebookLogo;
