/* eslint-disable prettier/prettier */
// Pra mais icones acessar... https://heroicons.com/
/* eslint-disable react/self-closing-comp */

export const SliderArrowLeft = ({ ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    fill="none"
    viewBox="0 0 48 48"
    {...props}
  >
    <path
      stroke="#fff"
      strokeWidth="2"
      d="M1 24C1 11.297 11.297 1 24 1s23 10.297 23 23-10.297 23-23 23S1 36.703 1 24z"
    ></path>
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M27 32l-8-8 8-8"
    ></path>
  </svg>
)

export const SliderArrowRight = ({ ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    fill="none"
    viewBox="0 0 48 48"
    {...props}
  >
    <path
      stroke="#fff"
      strokeWidth="2"
      d="M1 24C1 11.297 11.297 1 24 1s23 10.297 23 23-10.297 23-23 23S1 36.703 1 24z"
    ></path>
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M21 32l8-8-8-8"
    ></path>
  </svg>
)
