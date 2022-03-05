import { FC } from "react";
import {
  faInstagram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid } from "@mui/material";

const Footer: FC = () => {
  return (
    <footer>
      <Grid className="align-center footer-pad">
        <a
          href="https://www.instagram.com/arthouse_19/"
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon
            className="icon fab fa-instagram ig-logo"
            icon={faInstagram}
          />
        </a>
        <a
          href="https://twitter.com/House19Art"
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon
            className="icon fab fa-twitter twitter-logo"
            icon={faTwitter}
          />
        </a>
        <a
          href="https://www.youtube.com/channel/UCaem2HqM0PPak4fvf-uxlnQ"
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon
            className="icon fab fa-youtube youtube-logo"
            icon={faYoutube}
          />
        </a>
      </Grid>
    </footer>
  );
};

export default Footer;
