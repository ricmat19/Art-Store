import React, { FC } from "react";
import { ListItemIcon, MenuItem } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faUser } from "@fortawesome/free-solid-svg-icons";

const UserModal: FC = () => {
  return (
    <div>
      <a href="/profile">
        <MenuItem>
          <ListItemIcon>
            <i className="fas fa-user"></i>
            <FontAwesomeIcon icon={faUser} />
          </ListItemIcon>
          Profile
        </MenuItem>
      </a>
      <MenuItem>
        <ListItemIcon>
          <i className="fas fa-sign-out-alt"></i>
          <FontAwesomeIcon icon={faSignOutAlt} />
        </ListItemIcon>
        Logout
      </MenuItem>
    </div>
  );
};

export default UserModal;
