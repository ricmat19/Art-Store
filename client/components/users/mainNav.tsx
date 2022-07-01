import IndexAPI from "../../apis/indexAPI";
import { useRouter } from "next/router";
import { ChangeEvent, SetStateAction, useEffect, useState } from "react";
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
  faSearch,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch } from "../../hooks";
import Notifications from "./menuModals/notificationModal";
import User from "./menuModals/userModal";
import Ellipse from "./menuModals/ellipseModal";
import SignUp from "./auth/signupModal";
import SignIn from "./auth/signInModal";
import Reset from "./auth/resetModal";
import { borderTop } from "@mui/system";
// import { getSearchDataReducer } from "../../reducers/searchReducers";

interface ICartQty {
  cartQty: number;
}

interface ISearchData {
  id: string;
  title: string;
  subject: string;
  product: string;
  price: string;
  info: string;
  imagekey: string;
  description: string;
  category: string;
  article: string;
  section: string;
  createDate: string;
  content: string;
  url: string;
  type: string;
}

//Main navigation functional component
const MainNav = (props: ICartQty) => {
  //Main navigation states
  const [loginStatus, setLoginStatus] = useState<boolean>(true);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(null);
  const [notificationOpen, setNotificationOpen] = useState(null);
  const [ellipseOpen, setEllipseOpen] = useState(null);
  const [iconMenu, setIconMenu] = useState("iconMenu");
  const [searchData, setSearchData] = useState<ISearchData[]>([]);

  //Next router function
  const router = useRouter();

  //Redux request function
  const dispatch = useAppDispatch();

  const collectionOfAllData: ISearchData[] = [];
  //Get cart content on render
  useEffect(() => {
    const fetchData = async () => {
      try {
        // let allSearchData: = await dispatch(getSearchDataReducer());
        // console.log(allSearchData.payload);
        // setSearchData(allSearchData.payload);

        //Query all data for search
        const allCommunity = await IndexAPI.get(`/community`);
        const allCourses = await IndexAPI.get(`/courses`);
        const allHelp = await IndexAPI.get(`/help`);
        const allBlog = await IndexAPI.get(`/media/blog`);
        // const allChannel = await IndexAPI.get(`/media/channel`);
        // const allPodcast = await IndexAPI.get(`/media/podcast`);
        const allProducts = await IndexAPI.get(`/products`);

        //Add all queried data to an array
        const collectionOfQueries = [
          allCommunity.data.data.community,
          allCourses.data.data.courses,
          allHelp.data.data.helpArticles,
          allBlog.data.data.posts,
          allProducts.data.data.products,
        ];

        //Create an array with all searchable data and set state
        for (let i = 0; i < collectionOfQueries.length; i++) {
          for (let j = 0; j < collectionOfQueries[i].length; j++) {
            collectionOfAllData.push(collectionOfQueries[i][j]);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [dispatch, searchData]);

  //Handle signup modal open and close
  const handleSignUpOpen = () => setSignUpOpen(true);
  const handleSignUpClose = () => setSignUpOpen(false);

  //Handle sign in modal open and close
  const handleSignInOpen = () => setSignInOpen(true);
  const handleSignInClose = () => setSignInOpen(false);

  //Handle reset modal open and close
  const handleResetOpen = () => setResetOpen(true);
  const handleResetClose = () => setResetOpen(false);

  //Handle notification modal open and close
  const openNotification = Boolean(notificationOpen);
  const handleNotificationClick = (e: any) => {
    setNotificationOpen(e.currentTarget);
  };
  const handleNotificationClose = () => {
    setNotificationOpen(null);
  };

  //Handle user modal open and close
  const openUser = Boolean(userOpen);
  const handleUserClick = (e: any) => {
    setUserOpen(e.currentTarget);
  };
  const handleUserClose = () => {
    setUserOpen(null);
  };

  //Handle ellipse modal open and close
  const openEllipse = Boolean(ellipseOpen);
  const handleEllipseClick = (e: any) => {
    setEllipseOpen(e.currentTarget);
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
  const displayMenu = () => {
    if (iconMenu === "iconMenu iconMenu-show") {
      setIconMenu("iconMenu");
    } else {
      setIconMenu("iconMenu iconMenu-show");
    }
  };

  const filterSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchInput = e.target.value;
    const newFilter = collectionOfAllData.filter((value) => {
      if (searchInput) {
        if (
          value.title &&
          value.title.toLowerCase().includes(searchInput.toLowerCase())
        ) {
          return value.title.toLowerCase().includes(searchInput.toLowerCase());
        }
        if (
          value.type &&
          value.type.toLowerCase().includes(searchInput.toLowerCase())
        ) {
          return value.type.toLowerCase().includes(searchInput.toLowerCase());
        }
        if (
          value.subject &&
          value.subject.toLowerCase().includes(searchInput.toLowerCase())
        ) {
          return value.subject
            .toLowerCase()
            .includes(searchInput.toLowerCase());
        }
        if (
          value.product &&
          value.product.toLowerCase().includes(searchInput.toLowerCase())
        ) {
          return value.product
            .toLowerCase()
            .includes(searchInput.toLowerCase());
        }
        if (
          value.info &&
          value.info.toLowerCase().includes(searchInput.toLowerCase())
        ) {
          return value.info.toLowerCase().includes(searchInput.toLowerCase());
        }
        if (
          value.description &&
          value.description.toLowerCase().includes(searchInput.toLowerCase())
        ) {
          return value.description
            .toLowerCase()
            .includes(searchInput.toLowerCase());
        }
        if (
          value.category &&
          value.category.toLowerCase().includes(searchInput.toLowerCase())
        ) {
          return value.category
            .toLowerCase()
            .includes(searchInput.toLowerCase());
        }
        if (
          value.article &&
          value.article.toLowerCase().includes(searchInput.toLowerCase())
        ) {
          return value.article
            .toLowerCase()
            .includes(searchInput.toLowerCase());
        }
        if (
          value.section &&
          value.section.toLowerCase().includes(searchInput.toLowerCase())
        ) {
          return value.section
            .toLowerCase()
            .includes(searchInput.toLowerCase());
        }
        if (
          value.content &&
          value.content.toLowerCase().includes(searchInput.toLowerCase())
        ) {
          return value.content
            .toLowerCase()
            .includes(searchInput.toLowerCase());
        }
      }
    });
    console.log(newFilter);
    setSearchData(newFilter);
  };

  //Display main navigation component view depending on login status
  if (loginStatus) {
    return (
      <header>
        <nav>
          {/* Notification modal */}
          <Notifications
            notificationOpen={notificationOpen}
            openNotification={openNotification}
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
            <Grid>
              <Grid
                xs={12}
                container
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  alignContent: "center",
                }}
              >
                {/* Search input box */}
                <input
                  type="text"
                  className="search-field"
                  placeholder="Search"
                  onChange={(e) => filterSearch(e)}
                />
                <Grid className="search-button">
                  <FontAwesomeIcon className="magnifier" icon={faSearch} />
                </Grid>
              </Grid>
              {searchData.length !== 0 ? (
                <Grid
                  sx={{
                    position: "relative",
                  }}
                >
                  <Grid
                    sx={{
                      display: "grid",
                      gap: "5px",
                      backgroundColor: "white",
                      borderTop: "black solid 2px",
                      maxHeight: "200px",
                      overflowY: "scroll",
                      position: "absolute",
                      width: "100%",
                    }}
                    className="search-data-container"
                  >
                    {searchData
                      .slice(0, 10)
                      .map((data: ISearchData, index: any) => (
                        <a
                          href={data.url}
                          key={index}
                          className="search-row pointer"
                        >
                          <Grid>
                            {/* {data.imagekey ? (
                        <Grid>
                          <img
                          // src={imageBuffer}
                          />
                        </Grid>
                      ) : ( */}
                            <Grid>
                              <FontAwesomeIcon
                                className="search-icon"
                                icon={faMagnifyingGlass}
                              />
                            </Grid>
                            {/* )} */}
                          </Grid>
                          <Grid
                            sx={{
                              display: "grid",
                              alignContent: "center",
                              color: "black",
                              gridTemplateColumns: "1fr 200px",
                            }}
                          >
                            <Grid sx={{ textTransform: "capitalize" }}>
                              {data.type
                                ? `${data.type}`
                                : data.category
                                ? "Help"
                                : ""}
                              : {data.title}
                            </Grid>
                            <Grid
                              sx={{
                                display: "grid",
                                justifyContent: "right",
                                paddingRight: "5px",
                              }}
                            >
                              {data.product || data.subject ? (
                                <Grid sx={{ textTransform: "capitalize" }}>
                                  Type: {data.product} {data.subject}
                                </Grid>
                              ) : null}
                            </Grid>
                          </Grid>
                        </a>
                      ))}
                  </Grid>
                </Grid>
              ) : (
                <Grid></Grid>
              )}
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
                <Grid
                  xs={12}
                  container
                  sx={{ justifyContent: "center", position: "relative" }}
                >
                  {/* Main nav route to cart button */}
                  <a href="/cart">
                    <Grid
                      sx={{
                        color: "black",
                        fontSize: "12px",
                        fontWeight: "800",
                        position: "absolute",
                        top: "8px",
                        left: "2px",
                        width: "100%",
                        textAlign: "center",
                        justifyContent: "center",
                      }}
                    >
                      {props.cartQty}
                    </Grid>
                    <Grid>
                      <h1>
                        <FontAwesomeIcon
                          className="pointer"
                          icon={faShoppingCart}
                        />
                      </h1>
                    </Grid>
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
            firstName={""}
            lastName={""}
            email={""}
            password={""}
            passwordCopy={""}
          />
          {/* Sign in modal */}
          <SignIn
            signInOpen={signInOpen}
            handleSignInClose={handleSignInClose}
            handleSignUpOpen={handleSignUpOpen}
            handleResetOpen={handleResetOpen}
            email={""}
            password={""}
            // setLoginStatus={setLoginStatus}
          />
          {/* Reset modal */}
          <Reset
            resetOpen={resetOpen}
            handleResetClose={handleResetClose}
            handleSignInOpen={handleSignInOpen}
            // handleSignUpOpen={handleSignUpOpen}
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
                {/* Main nav display sign in modal button */}
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
