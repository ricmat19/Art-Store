import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faHeart,
  faShoppingCart,
  faUserCircle,
  faEllipsisV,
  faHamburger,
} from "@fortawesome/free-solid-svg-icons";
import SignUp from "./auth/signupModal";
import SignIn from "./auth/signinModal";
import Reset from "./auth/resetModal";
import Notifications from "./menuModals/notificationModal";
import User from "./menuModals/userModal";
import Ellipse from "./menuModals/ellipseModal";
import { getCartReducer } from "../../reducers/cartReducers";
import { useAppDispatch } from "../../hooks";

//Main navigation functional component
const MainNav = () => {
  //Main navigation states
  const [loginStatus, setLoginStatus] = useState<boolean>(true);

  //Next router function
  const router = useRouter();

  //Redux request function
  const dispatch = useAppDispatch();

  //Get cart content on render
  useEffect(() => {
    const fetchData = async () => {
      try {
        const cartResponse = await dispatch(getCartReducer());
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [dispatch]);

  //Handle signup modal open and close
  const [signUpOpen, setSignUpOpen] = useState(false);
  const handleSignUpOpen = () => setSignUpOpen(true);
  const handleSignUpClose = () => setSignUpOpen(false);

  //Handle signIn modal open and close
  const [signInOpen, setSignInOpen] = useState(false);
  const handleSignInOpen = () => setSignInOpen(true);
  const handleSignInClose = () => setSignInOpen(false);

  //Handle reset modal open and close
  const [resetOpen, setResetOpen] = useState(false);
  const handleResetOpen = () => setResetOpen(true);
  const handleResetClose = () => setResetOpen(false);

  //Handle notification modal open and close
  const [notificationOpen, setNotificationOpen] = useState(null);
  const openNotification = Boolean(notificationOpen);
  const handleNotificationClick = (event: any) => {
    setNotificationOpen(event.currentTarget);
  };
  const handleNotificationClose = () => {
    setNotificationOpen(null);
  };

  //Handle user modal open and close
  const [userOpen, setUserOpen] = useState(null);
  const openUser = Boolean(userOpen);
  const handleUserClick = (event: any) => {
    setUserOpen(event.currentTarget);
  };
  const handleUserClose = () => {
    setUserOpen(null);
  };

  //Handle ellipse modal open and close
  const [ellipseOpen, setEllipseOpen] = useState(null);
  const openEllipse = Boolean(ellipseOpen);
  const handleEllipseClick = (event: any) => {
    setEllipseOpen(event.currentTarget);
  };
  const handleEllipseClose = () => {
    setEllipseOpen(null);
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       console.log(innerWidth);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   fetchData();
  // }, []);

  //Main nav hamburger icon menu open/close state and function
  const [iconMenu, setIconMenu] = useState("iconMenu");
  const displayMenu = () => {
    if (iconMenu === "iconMenu iconMenu-show") {
      setIconMenu("iconMenu");
    } else {
      setIconMenu("iconMenu iconMenu-show");
    }
  };

  //Display main navigation component view depending on login status
  if (loginStatus) {
    return (
      <header>
        <nav>
          {/* Notification modal */}
          <Notifications
            notificationOpen={notificationOpen}
            openNotificaition={openNotification}
            handleNotificationClose={handleNotificationClose}
          />
          {/* User modal */}
          <User
            userOpen={userOpen}
            openUser={openUser}
            handleUserClose={handleUserClose}
          />
          {/* Ellipse modal */}
          <Ellipse
            ellipseOpen={ellipseOpen}
            openEllipse={openEllipse}
            handleEllipseClose={handleEllipseClose}
          />
          <Grid
            xs={12}
            container
            sx={{
              display: "grid",
              margin: "5px 0",
              gridTemplateColumns: "auto 1fr auto",
            }}
          >
            <Grid
              xs={12}
              sx={{
                textAlign: "center",
                alignSelf: "center",
                maxWidth: "fit-content",
                minWidth: "fit-content",
                padding: "0 10px",
              }}
            >
              {/* Route to store print page upon clicking logo */}
              <Grid
                className="nav-link"
                onClick={() => router.push("/products/print")}
              >
                <span className="logo">
                  <span className="logo-first">a</span>rt
                  <span className="logo-first">H</span>ouse
                  <span className="logo-first">19</span>
                </span>
              </Grid>
            </Grid>
            <Grid xs={12} container sx={{ alignContent: "center" }}>
              {/* Search input box */}
              <input
                type="text"
                className="search-field"
                placeholder="Search"
              />
            </Grid>
            <Grid
              container
              xs={12}
              sx={{
                alignContent: "center",
                justifyContent: "center",
                minWidth: "fit-content",
              }}
            >
              {/* Main nav display hamburger menu button */}
              <Grid
                xs={12}
                container
                className="hamburger"
                sx={{ justifyContent: "center", margin: "0 10px" }}
                onClick={() => displayMenu()}
              >
                <h1>
                  <FontAwesomeIcon className="pointer" icon={faHamburger} />
                </h1>
              </Grid>
              <Grid
                xs={12}
                container
                className={iconMenu}
                sx={{
                  display: "grid",
                  margin: "0 10px",
                  gridTemplateColumns: "auto auto auto auto auto",
                  gap: "5px",
                  justifyContent: "center",
                }}
              >
                <Grid xs={12} container sx={{ justifyContent: "center" }}>
                  {/* Main nav notification modal button */}
                  <h1>
                    <FontAwesomeIcon
                      className="pointer"
                      icon={faBell}
                      onClick={handleNotificationClick}
                    />
                  </h1>
                </Grid>
                <Grid xs={12} container sx={{ justifyContent: "center" }}>
                  {/* Main nav route to collection button */}
                  <a href="/collection">
                    <h1>
                      <FontAwesomeIcon className="pointer" icon={faHeart} />
                    </h1>
                  </a>
                </Grid>
                <Grid xs={12} container sx={{ justifyContent: "center" }}>
                  {/* Main nav route to cart button */}
                  <a href="/cart">
                    <h1>
                      {/* {cartAmt} */}
                      <FontAwesomeIcon
                        className="pointer"
                        icon={faShoppingCart}
                      />
                    </h1>
                  </a>
                </Grid>
                <Grid xs={12} container sx={{ justifyContent: "center" }}>
                  {/* Main nav display user menu button */}
                  <h1>
                    <FontAwesomeIcon
                      className="pointer"
                      icon={faUserCircle}
                      onClick={handleUserClick}
                    />
                  </h1>
                </Grid>
                <Grid xs={12} container sx={{ justifyContent: "center" }}>
                  {/* Main nav display ellipses menu button */}
                  <h1>
                    <FontAwesomeIcon
                      className="pointer"
                      icon={faEllipsisV}
                      onClick={handleEllipseClick}
                    />
                  </h1>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </nav>
        <hr />
      </header>
    );
  } else {
    return (
      <header>
        <nav>
          {/* Signup modal */}
          <SignUp
            signUpOpen={signUpOpen}
            handleSignUpClose={handleSignUpClose}
            handleSignInOpen={handleSignInOpen}
          />
          {/* Signin modal */}
          <SignIn
            signInOpen={signInOpen}
            handleSignInClose={handleSignInClose}
            handleSignUpOpen={handleSignUpOpen}
            handleResetOpen={handleResetOpen}
            setLoginStatus={setLoginStatus}
          />
          {/* Reset modal */}
          <Reset
            resetOpen={resetOpen}
            handleResetClose={handleResetClose}
            handleSignUpOpen={handleSignUpOpen}
            handleSignInOpen={handleSignInOpen}
          />
          <Grid container>
            {/* Route to store print page upon clicking logo */}
            <Grid
              xs={2}
              sx={{
                maxWidth: "fit-content",
                textAlign: "center",
                alignSelf: "center",
              }}
              className="nav-link"
              onClick={() => router.push("/products/print")}
            >
              <span className="logo">
                <span className="logo-first">a</span>rt
                <span className="logo-first">H</span>ouse
                <span className="logo-first">19</span>
              </span>
            </Grid>
            <Grid xs={8} container sx={{ alignContent: "center" }}>
              <Grid xs={1} sx={{ textAlign: "center", alignSelf: "center" }}>
                <h1>search</h1>
              </Grid>
              <Grid xs={11} container sx={{ pt: "10px", pb: "10px" }}>
                {/* Search input box */}
                <input
                  type="text"
                  placeholder="test"
                  className="search-field"
                />
              </Grid>
            </Grid>
            <Grid container xs={2} sx={{ alignContent: "center" }}>
              <Grid
                xs={2}
                container
                sx={{ justifyContent: "center", alignSelf: "center" }}
              >
                {/* Main nav route to cart button */}
                <a href="/cart">
                  <h1 className="grid">
                    <FontAwesomeIcon icon={faShoppingCart} />
                  </h1>
                </a>
              </Grid>
              <Grid xs={5} container sx={{ justifyContent: "center" }}>
                {/* Main nav display signup modal button */}
                <h2 className="pointer" onClick={() => handleSignUpOpen()}>
                  sign up
                </h2>
              </Grid>
              <Grid xs={5} container sx={{ justifyContent: "center" }}>
                {/* Main nav display signin modal button */}
                <h2 className="pointer" onClick={() => handleSignInOpen()}>
                  sign in
                </h2>
              </Grid>
            </Grid>
          </Grid>
        </nav>
        <hr />
      </header>
    );
  }
};

// MainNav.propTypes = {
//   cartQty: PropTypes.number,
//   mediasAmount: PropTypes.number,
// };

export default MainNav;
