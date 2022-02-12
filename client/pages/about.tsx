import HeaderC from "../components/header";
import FooterC from "../components/footer";
import Head from "next/head";

const AboutC = () => {
  return (
    <div>
      <Head>
        <title>artHouse19-About</title>
        <meta name="description" content="About the artHouse19 and its creator."></meta>
      </Head>
      <HeaderC />
      <div className="main-body">
        <div>
          <div className="align-center">
            <h1>about</h1>
          </div>
          <div className="profile-info">
            {/* <div> */}
            {/* <div className="profile-image-div">
              <div className="justify-center">
                <img
                  className="big-image"
                  src="images/profile-image.jpg"
                  alt="profile"
                />
              </div>
              <div></div>
              <div></div>
            </div> */}
            <div className="about-info">
              <h3>&emsp; &emsp; {process.env.REACT_APP_INFO_PARAGRAPH_1}</h3>
              <h3>&emsp; &emsp; {process.env.REACT_APP_INFO_PARAGRAPH_2}</h3>
            </div>
          </div>
        </div>
        <FooterC />
      </div>
    </div>
  );
};

export default AboutC;
