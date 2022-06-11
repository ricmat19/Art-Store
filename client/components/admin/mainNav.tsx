import { FC, useState } from "react";
import { Grid } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import AdminUser from "./menuModals/userModal";
import AdminEllipse from "./menuModals/ellipseModal";

//Admin main navigation functional component
const AdminMainNav: FC = () => {
  //Admin main navigation states
  const [signedIn] = useState<boolean>(true);
  const [userOpen, setUserOpen] = useState<EventTarget & SVGSVGElement>();
  const [ellipseOpen, setEllipseOpen] = useState<EventTarget & SVGSVGElement>();
  const openUser = Boolean(userOpen);
  const openEllipse = Boolean(ellipseOpen);

  //Admin function to open user component
  const handleUserClick = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    setUserOpen(event.currentTarget);
  };
  //Admin function to close user component
  const handleUserClose = () => {
    setUserOpen(undefined);
  };

  //Admin function to open ellipse component
  const handleEllipseClick = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    setEllipseOpen(event.currentTarget);
  };
  //Admin function to close ellipse component
  const handleEllipseClose = () => {
    setEllipseOpen(undefined);
  };

  //Admin main navigation menu
  return (
    <header>
      <nav>
        {/* Admin user component */}
        <AdminUser
          userOpen={userOpen}
          openUser={openUser}
          handleUserClose={handleUserClose}
        />
        {/* Admin ellipse component */}
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
            {/* Button to display the admin user modal */}
            <Grid container sx={{ justifyContent: "right" }}>
              <h1 className="pointer">
                <FontAwesomeIcon
                  icon={faUserCircle}
                  className="account-menu-icon"
                  onClick={(e) => handleUserClick(e)}
                />
              </h1>
            </Grid>
            {/* Button to display the ellipse modal */}
            <Grid
              container
              sx={{ justifyContent: "right", paddingRight: "30px" }}
            >
              <h1 className="pointer">
                <FontAwesomeIcon
                  icon={faEllipsisV}
                  className="account-menu-icon"
                  onClick={(e) => handleEllipseClick(e)}
                />
              </h1>
            </Grid>
          </Grid>
        </Grid>
      </nav>
      <hr />
    </header>
  );
};

export default AdminMainNav;
