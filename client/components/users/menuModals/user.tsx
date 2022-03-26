import { ListItemIcon, MenuItem } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase, faDollar, faHeart, faSignOutAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import { Grid, Menu } from "@mui/material";

const User = (props: any) => {
  return (
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
        <a href="/profile">
          <MenuItem sx={{ color: "black" }}>
            <ListItemIcon>
              <FontAwesomeIcon icon={faUser} />
            </ListItemIcon>
            Profile
          </MenuItem>
        </a>
        <a href="/purchases">
          <MenuItem sx={{ color: "black" }}>
            <ListItemIcon>
              <FontAwesomeIcon icon={faBriefcase} />
            </ListItemIcon>
            Purchases
          </MenuItem>
        </a>
        <a href="/wishlist">
          <MenuItem sx={{ color: "black" }}>
            <ListItemIcon>
              <FontAwesomeIcon icon={faHeart} />
            </ListItemIcon>
            Wishlist
          </MenuItem>
        </a>
        <a href="/purchaseHistory">
          <MenuItem sx={{ color: "black" }}>
            <ListItemIcon>
            <FontAwesomeIcon icon={faDollar} />
            </ListItemIcon>
            Purchase History
          </MenuItem>
        </a>
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