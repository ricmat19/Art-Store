import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGavel,
  faInfoCircle,
  faLock,
  faPaperPlane,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { Grid, Menu, ListItemIcon, MenuItem } from "@mui/material";

const Ellipse = (props: any) => {
  return (
    <Menu
      anchorEl={props.ellipseOpen}
      open={props.openEllipse}
      onClose={props.handleEllipseClose}
      onClick={props.handleEllipseClose}
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
        <a href="/about">
          <MenuItem sx={{ color: "black" }}>
            <ListItemIcon>
              <FontAwesomeIcon icon={faInfoCircle} />
            </ListItemIcon>
            About
          </MenuItem>
        </a>
        <a href="/contact">
          <MenuItem sx={{ color: "black" }}>
            <ListItemIcon>
              <FontAwesomeIcon icon={faPaperPlane} />
            </ListItemIcon>
            Contact
          </MenuItem>
        </a>
        <a href="/help">
          <MenuItem sx={{ color: "black" }}>
            <ListItemIcon>
              <FontAwesomeIcon icon={faQuestion} />
            </ListItemIcon>
            Help
          </MenuItem>
        </a>
        <a href="/termsOfService">
          <MenuItem sx={{ color: "black" }}>
            <ListItemIcon>
              <FontAwesomeIcon icon={faGavel} />
            </ListItemIcon>
            Terms of Service
          </MenuItem>
        </a>
        <a href="/privacyPolicy">
          <MenuItem sx={{ color: "black" }}>
            <ListItemIcon>
              <FontAwesomeIcon icon={faLock} />
            </ListItemIcon>
            Privacy Policy
          </MenuItem>
        </a>
      </Grid>
    </Menu>
  );
};

export default Ellipse;
