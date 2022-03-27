import { FC, useState } from "react";
import { Grid } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import AdminUser from "./menuModals/user";
import AdminEllipse from "./menuModals/ellipse";

const AdminMainNav: FC = () => {
  const [signedIn] = useState<boolean>(true);

  const [userOpen, setUserOpen] = useState(null);
  const [ellipseOpen, setEllipseOpen] = useState(null);
  const openUser = Boolean(userOpen);
  const openEllipse = Boolean(ellipseOpen);

  const handleUserClick = (event: any) => {
    setUserOpen(event.currentTarget);
  };
  const handleEllipseClick = (event: any) => {
    setEllipseOpen(event.currentTarget);
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
          <AdminUser
            userOpen={userOpen}
            openUser={openUser}
            handleUserClose={handleUserClose}
          />
          <AdminEllipse
            ellipseOpen={ellipseOpen}
            openEllipse={openEllipse}
            handleEllipseClose={handleEllipseClose}
          />
          <Grid container xs={12}>
            <Grid
              xs={11}
              sx={{
                textAlign: "left",
                alignSelf: "center",
                maxWidth: "fit-content",
                paddingLeft: "30px",
              }}
            >
              <span className="logo">
                <span className="logo-first">a</span>rt
                <span className="logo-first">H</span>ouse
                <span className="logo-first">19</span>
              </span>
            </Grid>
            <Grid
              container
              xs={1}
              className="two-column-div"
              sx={{ display: "grid" }}
            >
              <Grid container sx={{ justifyContent: "right" }}>
                <h1 className="pointer">
                  <FontAwesomeIcon
                    icon={faUserCircle}
                    className="account-menu-icon"
                    onClick={handleUserClick}
                  />
                </h1>
              </Grid>
              <Grid
                container
                sx={{ justifyContent: "right", paddingRight: "30px" }}
              >
                <h1 className="pointer">
                  <FontAwesomeIcon
                    icon={faEllipsisV}
                    className="account-menu-icon"
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
    return <Grid></Grid>;
  }
};

export default AdminMainNav;
