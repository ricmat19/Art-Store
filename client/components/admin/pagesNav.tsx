import { FC } from "react";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faChalkboardTeacher,
  faStoreAlt,
  faTv,
} from "@fortawesome/free-solid-svg-icons";
// import IndexAPI from "../../apis/indexAPI";

const AdminPagesNav: FC = () => {
  // const [signinModal, setSigninModal] = useState("modal-bg");
  // const [signupModal, setSignupModal] = useState("modal-bg");
  // const [resetModal, setResetModal] = useState("modal-bg");

  // const displaySignin = () => {
  //   setSigninModal("modal-bg active");
  //   setSignupModal("modal-bg");
  //   setResetModal("modal-bg");
  // };

  // const displaySignup = () => {
  //   setSignupModal("modal-bg active");
  //   setSigninModal("modal-bg");
  //   setResetModal("modal-bg");
  // };

  // const displayReset = () => {
  //   setResetModal("modal-bg active");
  //   setSignupModal("modal-bg");
  //   setSigninModal("modal-bg");
  // };

  // const signinRef = useRef();
  // const signupRef = useRef();
  // const resetRef = useRef();

  // useEffect(() => {
  //   document.addEventListener("mousedown", (event) => {
  //     if (event.target !== null) {
  //       if (!signinRef.current.contains(event.target)) {
  //         setSigninModal("modal-bg");
  //       }
  //       if (!signupRef.current.contains(event.target)) {
  //         setSignupModal("modal-bg");
  //       }
  //       if (!resetRef.current.contains(event.target)) {
  //         setResetModal("modal-bg");
  //       }
  //     }
  //   });
  // }, []);

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [rePassword, setRePassword] = useState("");
  // const [firstname, setFirstName] = useState("");
  // const [lastname, setLastName] = useState("");

  // const emailInput = useRef(null);
  // const passwordInput = useRef(null);
  // const firstNameInput = useRef(null);
  // const lastNameInput = useRef(null);
  // const rePasswordInput = useRef(null);

  // async (e) => {
  //   e.preventDefault();
  //   try {
  //     await IndexAPI.get("/signin", {
  //       email: email,
  //       password: password,
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const handleSignup = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await IndexAPI.post("/signup", {
  //       firstname: firstname,
  //       lastname: lastname,
  //       email: email,
  //       password: password,
  //     });

  //     firstNameInput.current.value = "";
  //     lastNameInput.current.value = "";
  //     emailInput.current.value = "";
  //     passwordInput.current.value = "";
  //     rePasswordInput.current.value = "";
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // async (e) => {
  //   e.preventDefault();
  //   try {
  //     console.log(e);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const router = useRouter();

  return (
    <header>
      <nav>
        <input type="checkbox" id="nav-toggle" className="nav-toggle" />
        {/* <label htmlFor="nav-toggle" className="nav-toggle-label">
          <a className="menu-toggle">
            <nav>
              <h1>
                <div className="logo">
                  <span className="logo-first">a</span>rt
                  <span className="logo-first">H</span>ouse
                </div>
              </h1>
            </nav>
          </a>
        </label> */}
        <Grid container sx={{ pt: "5px", pb: "5px", justifyContent: "center" }}>
          <Grid container xs={3} sx={{ justifyContent: "center" }}>
            <Grid sx={{ textAlign: "center", alignSelf: "center", m: "5px" }}>
              {/* <i className="fas fa-store-alt"></i> */}
              <FontAwesomeIcon icon={faStoreAlt} />
            </Grid>
            <Grid sx={{ textAlign: "center", alignSelf: "center" }}>
              <Grid
                className="nav-link"
                onClick={() => router.push("/admin/products/print")}
              >
                <h1 className="pointer">store</h1>
              </Grid>
            </Grid>
          </Grid>
          <Grid container xs={3} sx={{ justifyContent: "center" }}>
            <Grid sx={{ textAlign: "center", alignSelf: "center", m: "5px" }}>
              {/* <i className="fas fa-chalkboard-teacher"></i> */}
              <FontAwesomeIcon icon={faChalkboardTeacher} />
            </Grid>
            <Grid sx={{ textAlign: "center", alignSelf: "center" }}>
              <Grid
                className="nav-link"
                onClick={() => router.push("/admin/courses/drawing")}
              >
                <h1 className="pointer">courses</h1>
              </Grid>
            </Grid>
          </Grid>
          <Grid container xs={3} sx={{ justifyContent: "center" }}>
            <Grid sx={{ textAlign: "center", alignSelf: "center", m: "5px" }}>
              {/* <i className="fas fa-tv"></i> */}
              <FontAwesomeIcon icon={faTv} />
            </Grid>
            <Grid
              className="nav-link"
              onClick={() => router.push("/admin/media/blog")}
            >
              <h1 className="pointer">media</h1>
            </Grid>
          </Grid>
          {/* <Grid container xs={2} sx={{justifyContent: "center"}}>
            <Grid sx={{textAlign: 'center', alignSelf: "center", m: "5px"}}>
              <i className="fas fa-paint-brush"></i>
              <FontAwesomeIcon icon={faPaintBrush} />
            </Grid>
            <Grid sx={{textAlign: 'center', alignSelf: "center"}}>
              <a href="/admin/projects">
                <h1 className="pointer">projects</h1>
              </a>
            </Grid>
          </Grid> */}
          <Grid container xs={3} sx={{ justifyContent: "center" }}>
            <Grid sx={{ textAlign: "center", alignSelf: "center", m: "5px" }}>
              {/* <i className="fas fa-calendar-check"></i> */}
              <FontAwesomeIcon icon={faCalendarCheck} />
            </Grid>
            <Grid className="nav-link" onClick={() => router.push("/admin/events")}>
              <h1 className="pointer">events</h1>
            </Grid>
          </Grid>
          {/* <Grid container xs={2} sx={{justifyContent: "center"}}>
            <Grid sx={{textAlign: 'center', alignSelf: "center", m: "5px"}}>
              <i className="fas fa-comments"></i>
              <FontAwesomeIcon icon={faComments} />
            </Grid>
            <Grid sx={{textAlign: 'center', alignSelf: "center"}}>
              <a href="/admin/community">
                <h1 className="pointer">community</h1>
              </a>
            </Grid>
          </Grid> */}
        </Grid>
      </nav>
      <hr />
    </header>
  );
};

export default AdminPagesNav;
