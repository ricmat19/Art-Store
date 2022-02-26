import React, { FC } from "react";
import { ListItemIcon, MenuItem } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGavel, faInfoCircle, faLock, faPaperPlane, faQuestion } from "@fortawesome/free-solid-svg-icons";

const EllipseModal: FC = () => {
  return (
    <div>
      <a href="/about">
        <MenuItem>
          <ListItemIcon>
            <i className="fas fa-info-circle"></i>
            <FontAwesomeIcon
              icon={faInfoCircle}
            />
          </ListItemIcon>
          About
        </MenuItem>
      </a>
      <a href="/contact">
        <MenuItem>
          <ListItemIcon>
            <i className="far fa-paper-plane"></i>
            <FontAwesomeIcon
              icon={faPaperPlane}
            />
          </ListItemIcon>
          Contact
        </MenuItem>
      </a>
      <a href="/help">
        <MenuItem>
          <ListItemIcon>
            <i className="fas fa-question"></i>
            <FontAwesomeIcon
              icon={faQuestion}
            />
          </ListItemIcon>
          Help
        </MenuItem>
      </a>
      <a href="/termsOfService">
        <MenuItem>
          <ListItemIcon>
            <i className="fas fa-gavel"></i>
            <FontAwesomeIcon
              icon={faGavel}
            />
          </ListItemIcon>
          Terms of Service
        </MenuItem>
      </a>
      <a href="/privacyPolicy">
        <MenuItem>
          <ListItemIcon>
            <i className="fas fa-lock"></i>
            <FontAwesomeIcon
              icon={faLock}
            />
          </ListItemIcon>
          Privacy Policy
        </MenuItem>
      </a>
    </div>
  );
};

export default EllipseModal;
