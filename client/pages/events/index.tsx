import IndexAPI from "../../apis/indexAPI";
import FooterC from "../../components/footer";
import MainNav from "../../components/users/mainNav";
import PagesNav from "../../components/users/pagesNav";
// import { IEvent } from "../../interfaces";
import Calendar from "../../components/users/events/calendar";

const EventsC = (props: any) => {

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
      <MainNav cartQty={props.cartQty} />
      <PagesNav />
      <Calendar />
      <FooterC />
    </div>
  );
};

export async function getStaticProps() {
  const cartResponse = await IndexAPI.get(`/cart`);

  return {
    props: {
      cartQty: cartResponse.data.data.cart.length,
    },
    revalidate: 1,
  };
}

export default EventsC;
