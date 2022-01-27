// import React, { useEffect, useState } from "react";
// import OrderSummaryC from "./orderSummary";
// import HeaderC from "./header";
// import FooterC from "./footer";
// import IndexAPI from "../apis/indexAPI";

// const ShippingC = () => {
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

//   return (
//     <div>
//       <HeaderC />
//       <div className="main-body shipping-div">
//         <div className="shipping-selection-div">
//           <div className="shipping-info-div">
//             <div className="shipping-info">
//               <h3 className="align-left">contact</h3>
//               <h3 className="align-left">{shipment.email}</h3>
//               <a className="align-right" href="">
//                 <h3>change</h3>
//               </a>
//             </div>
//             <hr className="shipping-hr" />
//             <div className="shipping-info">
//               <h3 className="align-left">ship to</h3>
//               <h3 className="align-left">
//                 {shipment.address} {shipment.city}, {shipment.state}{" "}
//                 {shipment.zipcode}
//               </h3>
//               <a className="align-right" href="">
//                 <h3>change</h3>
//               </a>
//             </div>
//           </div>

//           {/* <div>
//             <h3>shipping method</h3>
//             <div className="shipping-options-div">
//               <div className="shipping-option">
//                 <input
//                   className="align-left"
//                   type="radio"
//                   name="shipping-method"
//                 />
//                 <label className="align-left">
//                   first class (3-7 business days)
//                 </label>
//                 <h3 className="align-right">$0.00</h3>
//               </div>
//               <hr className="shipping-hr" />
//               <div className="shipping-option">
//                 <input
//                   className="align-left"
//                   type="radio"
//                   name="shipping-method"
//                 />
//                 <label className="align-left">
//                   priority mail (1-3 business days)
//                 </label>
//                 <h3 className="align-right">$0.00</h3>
//               </div>
//             </div>
//           </div>
//           <div className="two-column-div shipping-button">
//             <button>
//               <a href="/payment">continue to payment</a>
//             </button>
//             <a href="/checkout">
//               <h3>return to information</h3>
//             </a>
//           </div>*/}
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

// export default ShippingC;
