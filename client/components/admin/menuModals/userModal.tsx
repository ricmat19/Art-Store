import { ListItemIcon, MenuItem } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { Grid, Menu } from "@mui/material";

//Admin user props interface
interface IAdminUser {
  userOpen: Element | ((element: Element) => Element) | null | undefined;
  openUser: boolean;
  handleUserClose:
    | ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void)
    | undefined;
}

//Admin user functional component
const AdminUserModal = (props: IAdminUser) => {
  //Admin user component
  return (
    //Display the admin user menu
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
        {/* Button to logout the admin */}
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

export default AdminUserModal;
