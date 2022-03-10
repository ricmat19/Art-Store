import React, { FC } from "react";
import { ListItemIcon, MenuItem } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import { Grid } from "@mui/material";

const UserModal: FC = () => {
  return (
    <Grid>
      <a href="/profile">
        <MenuItem sx={{ color: "black" }}>
          <ListItemIcon>
            <FontAwesomeIcon icon={faUser} />
          </ListItemIcon>
          Profile
        </MenuItem>
      </a>
      <MenuItem sx={{ color: "black" }}>
        <ListItemIcon>
          <FontAwesomeIcon icon={faSignOutAlt} />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Grid>
  );
};

export default UserModal;
