import { ListItemIcon, MenuItem } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faDollar,
  faHeart,
  faMoneyBill,
  faSignOutAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Grid, Menu } from "@mui/material";

//User props interface
interface IUser {
  userOpen: Element | ((element: Element) => Element) | null | undefined;
  openUser: boolean;
  handleUserClose: () => void;
}

//User functional component
const User = (props: IUser) => {
  //User component
  return (
    //Display the User menu
    <Menu
      anchorEl={props.userOpen}
      open={props.openUser}
      onClose={props.handleUserClose}
      onClick={props.handleUserClose}
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
      <Grid>
        {/* Display the Profile link */}
        <a href="/user/profile">
          <MenuItem sx={{ color: "black" }}>
            <ListItemIcon>
              <FontAwesomeIcon icon={faUser} />
            </ListItemIcon>
            Profile
          </MenuItem>
        </a>
        {/* Display the Purchase History link */}
        <a href="/user/purchases">
          <MenuItem sx={{ color: "black" }}>
            <ListItemIcon>
              <FontAwesomeIcon icon={faMoneyBill} />
            </ListItemIcon>
            PurchaseHistory
          </MenuItem>
        </a>
        {/* Display the Wishlist link */}
        {/* <a href="/wishlist">
          <MenuItem sx={{ color: "black" }}>
            <ListItemIcon>
              <FontAwesomeIcon icon={faHeart} />
            </ListItemIcon>
            Wishlist
          </MenuItem>
        </a> */}
        {/* Display the Logout link */}
        <MenuItem sx={{ color: "black" }}>
          <ListItemIcon>
            <FontAwesomeIcon icon={faSignOutAlt} />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Grid>
    </Menu>
  );
};

export default User;
