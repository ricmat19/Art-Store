import FooterC from "../../../components/footer";
import AdminMainNav from "../../../components/admin/mainNav";
import AdminPagesNav from "../../../components/admin//pagesNav";
import Calendar from "../../../components/calendar";

const AdminEvents = () => {
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
      <AdminMainNav />
      <AdminPagesNav />
      <Calendar />
      <FooterC />
    </div>
  );
};

export default AdminEvents;
