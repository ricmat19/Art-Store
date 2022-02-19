// import { useRef, useEffect } from "react";
// import { Grid } from '@mui/material';

const PaypalC = () => {
//   const paypal = useRef();

//   useEffect(() => {
//     window.paypal
//       .Buttons({
//         style: {
//           layout: "horizontal",
//           color: "black",
//           label: "paypal",
//           shape: "rect",
//         },
//         createOrder: (data, actions) => {
//           return actions.order.create({
//             intent: "CAPTURE",
//             purchase_units: [
//               {
//                 description: "Description",
//                 amount: {
//                   currency_code: "USD",
//                   value: 1.0,
//                 },
//               },
//             ],
//           });
//         },
//       })
//       .render(paypal.current);
//   }, []);

//   return (
//     <Grid>
//       <Grid ref={paypal}></Grid>
//     </Grid>
//   );
};

export default PaypalC;
