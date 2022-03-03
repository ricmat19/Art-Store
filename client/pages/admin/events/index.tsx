import FooterC from "../../../components/footer";
import AdminMainNav from "../../../components/admin/mainNav";
import AdminPagesNav from "../../../components/admin//pagesNav";
import Calendar from "../../../components/calendar";
import { Redirect } from "react-router";

const AdminEvents = () => {
  const [loginStatus, setLoginStatus] = useState<boolean>(true);
  // const [events] = useState(props.events);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loginResponse = await IndexAPI.get(`/login`);
        setLoginStatus(loginResponse.data.data.loggedIn);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  // const displayEvent = async (event: string) => {
  //   try {
  //     navigation(`/admin/events/${event}`);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  if (loginStatus) {
    return (
      <div>
        <AdminMainNav />
        <AdminPagesNav />
        <Calendar />
        <FooterC />
      </div>
    );
  } else {
    return <Redirect to="/admin/login" />;
  }
};

export default AdminEvents;
