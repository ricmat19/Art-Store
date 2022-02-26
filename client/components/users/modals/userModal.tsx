import React, { FC } from "react";
import { ListItemIcon, MenuItem } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faUser } from "@fortawesome/free-solid-svg-icons";

const UserModal: FC = () => {
  return (
    <div>
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
    </div>
  );
};

export default UserModal;
