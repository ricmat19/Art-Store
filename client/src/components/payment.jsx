// import React, { useEffect, useState } from "react";
// import OrderSummaryC from "./orderSummary";
// import HeaderC from "./header";
// import FooterC from "./footer";
// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import IndexAPI from "../apis/indexAPI";
// // import Paypal from "./paypalComponent";

// const PaymentC = () => {
//   const stripe = useStripe();
//   const elements = useElements();

//   const [cart, setCart] = useState([]);
//   const [cartPrices, setCartPrices] = useState([]);
//   const [subtotal, setSubtotal] = useState(0);
//   const [shipment, setShipment] = useState([]);

//   let cartPriceArray = [];
//   let sub = 0;
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const cartResponse = await IndexAPI.get(`/cart`);

//         for (let i = 0; i < cartResponse.data.data.cart.length; i++) {
//           let itemSummaryPrice =
//             cartResponse.data.data.cart[i].price *
//             cartResponse.data.data.qty[i];
//           cartPriceArray.push(parseInt(itemSummaryPrice));
//         }

//         for (let i = 0; i < cartResponse.data.data.cart.length; i++) {
//           if (cartResponse.data.data.cart[i].imagekey !== null) {
//             let imagesResponse = await IndexAPI.get(
//               `/images/${cartResponse.data.data.cart[i].imagekey}`,
//               {
//                 responseType: "arraybuffer",
//               }
//             ).then((response) =>
//               Buffer.from(response.data, "binary").toString("base64")
//             );

//             cartResponse.data.data.cart[i].imageBuffer = imagesResponse;
//           }
//         }

//         const shipmentResponse = await IndexAPI.get(`/shipment`);

//         setCartPrices(cartPriceArray);

//         sub = cartPriceArray.reduce(function (a, b) {
//           return a + b;
//         }, 0);
//         setSubtotal(sub);

//         setCart(cartResponse.data.data.cart);
//         setShipment(shipmentResponse.data.data.shipment.rows[0]);
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     fetchData();
//   }, []);

//   const handlePayment = async (e) => {
//     e.preventDefault();
//     const { err, paymentMethod } = await stripe.createPaymentMethod({
//       type: "card",
//       card: elements.getElement(CardElement),
//     });

//     if (!err) {
//       try {
//         const { id } = paymentMethod;
//         const response = await IndexAPI.post(`/payment`, {
//           amount: 1000,
//           id: id,
//         });

//         if (response.data.success) {
//           console.log("Successful payment!");
//         }
//       } catch (err) {
//         console.log(err);
//       }
//     } else {
//       console.log(err);
//     }
//   };

//   const cardElementOptions = {
//     style: {
//       base: {
//         fontFamily: "Rajdhani",
//       },
//     },
//     hidePostalCode: true,
//   };

//   return (
//     <div>
//       <HeaderC />
//       <div className="main-body payment-div">
//         <div className="payment-selection-div">
//           <div className="payment-info-div">
//             <div className="payment-info">
//               <h3 className="align-left">contact</h3>
//               <h3 className="align-left">{shipment.email}</h3>
//               <a className="align-right" href="/checkout">
//                 <h3>change</h3>
//               </a>
//             </div>
//             <hr className="payment-hr" />
//             <div className="payment-info">
//               <h3 className="align-left">ship to</h3>
//               <h3 className="align-left">
//                 {shipment.address} {shipment.city}, {shipment.state}{" "}
//                 {shipment.zipcode}
//               </h3>
//               <a className="align-right" href="/checkout">
//                 <h3>change</h3>
//               </a>
//             </div>
//             {/* <hr className="payment-hr" />
//             <div className="payment-info">
//               <h3 className="align-left">method</h3>
//               <h3 className="align-left">first class (3-7 days) - $0.00</h3>
//               <a className="align-right" href="/shipping">
//                 <h3>change</h3>
//               </a>
//             </div> */}
//           </div>

//           <div>
//             <h1>payment method</h1>
//             <div>
//               <div className="payment-option">
//                 {/* <input
//                   className="align-left"
//                   type="radio"
//                   name="payment-method"
//                 /> */}
//                 <label className="align-left">Credit Card</label>
//               </div>
//               <div>
//                 <form
//                   method="POST"
//                   onSubmit={handlePayment}
//                 >
//                   <div className="grid payment-input">
//                     <CardElement
//                       className="card-element"
//                       options={cardElementOptions}
//                     />
//                   </div>
//                   <div className="grid payment-input">
//                     <input type="text" placeholder="name on card" />
//                   </div>
//                   <div className="credit-card-option">
//                     <button className="payment-button" type="submit">
//                       process payment
//                     </button>
//                   </div>
//                 </form>
//                 {/* <hr className="payment-hr" />
//                 <div className="payment-option">
//                   <input
//                     className="align-left"
//                     type="radio"
//                     name="payment-method"
//                   />
//                   <label className="align-left">PayPal</label>
//                   <Paypal className="payment-button" />
//                 </div>
//                 <hr className="payment-hr" />
//                 <div className="payment-option">
//                     <input className="align-left" type="radio" name="payment-method"/>
//                     <label className="align-left">Amazon Pay</label>
//                 </div> */}
//               </div>
//             </div>
//           </div>
//         </div>
//         <div>
//           <div>
//             <OrderSummaryC
//               cartProducts={cart}
//               cartPrices={cartPrices}
//               subtotal={subtotal}
//             />
//           </div>
//           {/* <div className="two-column-div checkout-discount">
//             <input type="text" placeholder="discount code" />
//             <button>apply</button>
//           </div> */}
//         </div>
//       </div>
//       <FooterC />
//     </div>
//   );
// };

// export default PaymentC;
