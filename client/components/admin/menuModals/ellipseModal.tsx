import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGavel,
  faInfoCircle,
  faLock,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { Grid, Menu, ListItemIcon, MenuItem } from "@mui/material";

//Admin ellipse props interface
interface IAdminEllipse {
  ellipseOpen: Element | ((element: Element) => Element) | null | undefined;
  openEllipse: boolean;
  handleEllipseClose:
    | ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void)
    | undefined;
}

//Admin ellipse functional component
const AdminEllipseModal = (props: IAdminEllipse) => {
  //Admin ellipse component
  return (
    // Display the admin ellipse menu
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
        {/* Display the admin about link */}
        <a href="/admin/about">
          <MenuItem sx={{ color: "black" }}>
            <ListItemIcon>
              <FontAwesomeIcon icon={faInfoCircle} />
            </ListItemIcon>
            About
          </MenuItem>
        </a>
        {/* Display the admin help link */}
        <a href="/admin/help">
          <MenuItem sx={{ color: "black" }}>
            <ListItemIcon>
              <FontAwesomeIcon icon={faQuestion} />
            </ListItemIcon>
            Help
          </MenuItem>
        </a>
        {/* Display the admin terms of service link */}
        <a href="/admin/termsOfService">
          <MenuItem sx={{ color: "black" }}>
            <ListItemIcon>
              <FontAwesomeIcon icon={faGavel} />
            </ListItemIcon>
            Terms of Service
          </MenuItem>
        </a>
        {/* Display the admin privacy policy link */}
        <a href="/admin/privacyPolicy">
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

export default AdminEllipseModal;
