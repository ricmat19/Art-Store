import { FC, useState } from "react";
// import SignInModalC from "../auth/signinModal";
import { Grid, Menu, MenuItem, ListItemIcon } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faUserCircle } from "@fortawesome/free-solid-svg-icons";

// interface IModalState {
//   open: boolean,
//   onClose: boolean,
//   show: boolean,
//   onHide: () => void,
//   email: string,
//   password: string,
// }

const AdminMainNav: FC = () => {
  // const [, setDisplaySignInModal] = useState<boolean>(false);
  const [signedIn] = useState<boolean>(true);
  // const [email, ] = useState<string>("");
  // const [password, ] = useState<string>("");

  // const handleOpen = () => setDisplaySignInModal(true);
  // const handleClose = () => setDisplaySignInModal(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleAccountMenuClose = () => {
    setAnchorEl(null);
  };

  if (signedIn) {
    return (
      <header>
        <nav>
          <Grid container>
            <Grid
              container
              xs={11}
              sx={{
                textAlign: "center",
                alignSelf: "center",
              }}
            >
              <div className="logo-div">
                <div className="logo">
                  <span className="logo-first">a</span>rt
                  <span className="logo-first">H</span>ouse
                  <span className="logo-first">19</span>
                </div>
              </div>
            </Grid>
            <Grid container xs={1} sx={{ alignContent: "center" }}>
              <Grid container sx={{ justifyContent: "center" }}>
                <h1>
                  <FontAwesomeIcon
                    icon={faUserCircle}
                    className="account-menu-icon"
                    onClick={handleClick}
                  />
                </h1>
              </Grid>
            </Grid>
          </Grid>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleAccountMenuClose}
            onClick={handleAccountMenuClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem>
              <ListItemIcon>
                <FontAwesomeIcon
                  className="account-menu-icon"
                  icon={faSignOutAlt}
                />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </nav>
        <hr />
      </header>
    );
  } else {
    return <div></div>;
  }
};

export default AdminMainNav;
