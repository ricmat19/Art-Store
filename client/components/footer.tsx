import { faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const FooterC = () => {
  return (
    <footer>
      <div className="align-center footer-pad">
        <a
          href="https://www.instagram.com/arthouse_19/"
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon className="icon fab fa-instagram ig-logo" icon={faInstagram}/>
        </a>
        <a
          href="https://twitter.com/House19Art"
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon className="icon fab fa-twitter twitter-logo" icon={faTwitter}/>
        </a>
        <a
          href="https://www.youtube.com/channel/UCaem2HqM0PPak4fvf-uxlnQ"
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon className="icon fab fa-youtube youtube-logo" icon={faYoutube}/>
        </a>
      </div>
    </footer>
  );
};

export default FooterC;
