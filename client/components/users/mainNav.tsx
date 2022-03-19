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
import Notifications from "./menuModals/notification";
import User from "./menuModals/user";
import Ellipse from "./menuModals/ellipse";

const MainNav = () => {
  // const [, setDisplaySignInModal] = useState<boolean>(false);
  const [signedIn] = useState<boolean>(false);

  const router = useRouter();

  // const handleOpen = () => setDisplaySignInModal(true);

  const [signUpOpen, setSignUpOpen] = useState(false);
  const handleSignUpOpen = () => setSignUpOpen(true);
  const handleSignUpClose = () => setSignUpOpen(false);

  const [signInOpen, setSignInOpen] = useState(false);
  const handleSignInOpen = () => setSignInOpen(true);
  const handleSignInClose = () => setSignInOpen(false);

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

  if (signedIn) {
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
                  textAlign: "right",
                  alignSelf: "right",
                  maxWidth: "fit-content",
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
          />
          <SignIn
            signInOpen={signInOpen}
            handleSignUpClose={handleSignInClose}
          />
          <Grid container>
            <Grid xs={1} sx={{ textAlign: "center", alignSelf: "center" }}>
              <h1>logo</h1>
            </Grid>
            <Grid xs={9} container sx={{ alignContent: "center" }}>
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
                  <FontAwesomeIcon icon={faShoppingCart} />
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
