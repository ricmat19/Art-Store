import React, { FC } from "react";
// import IndexAPI from "../../apis/indexAPI";
import FooterC from "../../components/footer";
import MainNav from "../../components/users/mainNav";
import PagesNav from "../../components/users/pagesNav";
// import { IEvent } from "../../interfaces";
import CalendarC from ".";

const EventsC: FC = () => {

  // const [events] = useState(props.events);

  // const displayEvent = async (event: string) => {
  //   try {
  //     navigation(`/admin/events/${event}`);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <div>
      <MainNav cartQty={cart.length} />
      <PagesNav />
      <div className="main-body">
        <CalendarC/>
      </div>
      <FooterC />
    </div>
  );
};

// export async function getStaticProps() {
//   const cartResponse = await IndexAPI.get(`/cart`);

//   for (let i = 0; i < cartResponse.data.data.cart.length; i++) {
//     if (cartResponse.data.data.cart[i].imagekey !== null) {
//       let imagesResponse = await IndexAPI.get(
//         `/images/${cartResponse.data.data.cart[i].imagekey}`,
//         {
//           responseType: "arraybuffer",
//         }
//       ).then((response) =>
//         Buffer.from(response.data, "binary").toString("base64")
//       );

//       cartResponse.data.data.cart[i].imageBuffer = imagesResponse;
//     }
//   }

//   const eventsResponse = await IndexAPI.get(`/events`);

//   for (let i = 0; i < eventsResponse.data.data.events.length; i++) {
//     if (eventsResponse.data.data.events[i].imagekey !== null) {
//       let imagesResponse = await IndexAPI.get(
//         `/images/${eventsResponse.data.data.events[i].imagekey}`,
//         {
//           responseType: "arraybuffer",
//         }
//       ).then((response: { data: string; }) =>
//         Buffer.from(response.data, "binary").toString("base64")
//       );

//       eventsResponse.data.data.events[
//         i
//       ].imageBuffer = `data:image/png;base64,${imagesResponse}`;
//     }
//   }

//   return {
//     props: {
//       events: eventsResponse.data.data.events,
//       cart: cartResponse.data.data.cart,
//     },
//     revalidate: 1,
//   };
// }

export default EventsC;
