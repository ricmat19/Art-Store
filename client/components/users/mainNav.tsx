import { useRouter } from "next/router";
import { useState } from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faHeart,
  faShoppingCart,
  faUserCircle,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";
import SignUp from "./auth/signup";
import SignIn from "./auth/signin";
import Reset from "./auth/reset";
import Notifications from "./menuModals/notification";
import User from "./menuModals/user";
import Ellipse from "./menuModals/ellipse";

const MainNav = () => {
  const [loginStatus, setLoginStatus] = useState<boolean>(true);

  const router = useRouter();

  const [signUpOpen, setSignUpOpen] = useState(false);
  const handleSignUpOpen = () => setSignUpOpen(true);
  const handleSignUpClose = () => setSignUpOpen(false);

  const [signInOpen, setSignInOpen] = useState(false);
  const handleSignInOpen = () => setSignInOpen(true);
  const handleSignInClose = () => setSignInOpen(false);

  const [resetOpen, setResetOpen] = useState(false);
  const handleResetOpen = () => setResetOpen(true);
  const handleResetClose = () => setResetOpen(false);

  const [notificationOpen, setNotificationOpen] = useState(null);
  const [userOpen, setUserOpen] = useState(null);
  const [ellipseOpen, setEllipseOpen] = useState(null);

  const openNotificaition = Boolean(notificationOpen);
  const openUser = Boolean(userOpen);
  const openEllipse = Boolean(ellipseOpen);

  const handleNotificationClick = (event: any) => {
    setNotificationOpen(event.currentTarget);
  };
  const handleUserClick = (event: any) => {
    setUserOpen(event.currentTarget);
  };
  const handleEllipseClick = (event: any) => {
    setEllipseOpen(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationOpen(null);
  };
  const handleUserClose = () => {
    setUserOpen(null);
  };
  const handleEllipseClose = () => {
    setEllipseOpen(null);
  };

  if (loginStatus) {
    return (
      <header>
        <nav>
          <Notifications
            notificationOpen={notificationOpen}
            openNotificaition={openNotificaition}
            handleNotificationClose={handleNotificationClose}
          />
          <User
            userOpen={userOpen}
            openUser={openUser}
            handleUserClose={handleUserClose}
          />
          <Ellipse
            ellipseOpen={ellipseOpen}
            openEllipse={openEllipse}
            handleEllipseClose={handleEllipseClose}
          />
          <Grid
            xs={12}
            sx={{
              padding: "0 10px",
            }}
            container
          >
            <Grid
              xs={2}
              sx={{
                textAlign: "center",
                alignSelf: "center",
                maxWidth: "fit-content",
              }}
            >
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
            <Grid xs={8} container sx={{ alignContent: "center" }}>
              <Grid
                xs={2}
                sx={{
                  maxWidth: "fit-content",
                  textAlign: "center",
                  alignSelf: "center",
                }}
              >
                <h1>search</h1>
              </Grid>
              <Grid xs={10} container sx={{ pt: "10px", pb: "10px" }}>
                <input type="text" className="search-field" />
              </Grid>
            </Grid>
            <Grid
              container
              xs={2}
              sx={{
                alignContent: "center",
                justifyContent: "center",
                minWidth: "fit-content",
              }}
            >
              <Grid xs={2} container sx={{ justifyContent: "center" }}>
                <h1>
                  <FontAwesomeIcon
                    className="pointer"
                    icon={faBell}
                    onClick={handleNotificationClick}
                  />
                </h1>
              </Grid>
              <Grid xs={2} container sx={{ justifyContent: "center" }}>
                <a href="/collection">
                  <h1>
                    <FontAwesomeIcon className="pointer" icon={faHeart} />
                  </h1>
                </a>
              </Grid>
              <Grid xs={2} container sx={{ justifyContent: "center" }}>
                <a href="/cart">
                  <h1>
                    <FontAwesomeIcon
                      className="pointer"
                      icon={faShoppingCart}
                    />
                  </h1>
                </a>
              </Grid>
              <Grid xs={2} container sx={{ justifyContent: "center" }}>
                <h1>
                  <FontAwesomeIcon
                    className="pointer"
                    icon={faUserCircle}
                    onClick={handleUserClick}
                  />
                </h1>
              </Grid>
              <Grid xs={2} container sx={{ justifyContent: "center" }}>
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
        </nav>
        <hr />
      </header>
    );
  } else {
    return (
      <header>
        <nav>
          <SignUp
            signUpOpen={signUpOpen}
            handleSignUpClose={handleSignUpClose}
            handleSignInOpen={handleSignInOpen}
          />
          <SignIn
            signInOpen={signInOpen}
            handleSignInClose={handleSignInClose}
            handleSignUpOpen={handleSignUpOpen}
            handleResetOpen={handleResetOpen}
            setLoginStatus={setLoginStatus}
          />
          <Reset
            resetOpen={resetOpen}
            handleResetClose={handleResetClose}
            handleSignUpOpen={handleSignUpOpen}
            handleSignInOpen={handleSignInOpen}
          />
          <Grid container>
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
                <a href="/cart">
                  <h1 className="grid">
                    <FontAwesomeIcon icon={faShoppingCart} />
                  </h1>
                </a>
              </Grid>
              <Grid xs={5} container sx={{ justifyContent: "center" }}>
                <h2 className="pointer" onClick={() => handleSignUpOpen()}>
                  sign up
                </h2>
              </Grid>
              <Grid xs={5} container sx={{ justifyContent: "center" }}>
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

MainNav.propTypes = {
  cartQty: PropTypes.number,
  mediasAmount: PropTypes.number,
};

export default MainNav;
