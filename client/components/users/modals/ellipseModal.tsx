import React, { FC } from "react";
import { ListItemIcon, MenuItem } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGavel,
  faInfoCircle,
  faLock,
  faPaperPlane,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";

const EllipseModal: FC = () => {
  return (
    <div>
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
    </div>
  );
};

export default EllipseModal;
