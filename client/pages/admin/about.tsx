/* eslint-disable @next/next/no-img-element */
import IndexAPI from "../../apis/indexAPI";
import { useEffect, useState } from "react";
import AdminMainNav from "../../components/admin/mainNav";
import AdminPagesNav from "../../components/admin/pagesNav";
import Footer from "../../components/footer";
import Head from "next/head";
import { Grid } from "@mui/material";

//Admin about page props interface
interface IAbout {
  aboutContent: string | (() => string);
}

//Admin about page functional component
const About = (props: IAbout) => {
  //Admin about states
  const [loginStatus, setLoginStatus] = useState<boolean>(true);
  const [content, setContent] = useState<string>(props.aboutContent);

  // Get the current login status and set it as the login state
  useEffect(() => {
    const fetchData = async () => {
      try {
        const loginResponse = await IndexAPI.get(`/login`);
        setLoginStatus(loginResponse.data.data.loggedIn);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  //Function to update the about's content
  const updateAbout = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await IndexAPI.put(`/admin/about`, {
        content,
      });
    } catch (err) {
      console.log(err);
    }
  };

  // Render based on the current login status
  if (loginStatus) {
    return (
      <Grid>
        <Head>
          <title>artHouse19-About</title>
          <meta
            name="description"
            content="About the artHouse19 and its creator."
          ></meta>
        </Head>
        {/* Admin main navigation component */}
        <AdminMainNav />
        {/* Admin pages navigation component */}
        <AdminPagesNav />
        <Grid className="main-body">
          <Grid>
            <Grid className="align-center">
              <h1 className="main-title">about</h1>
            </Grid>
            <Grid>
              {/* About content input field */}
              <Grid sx={{ margin: "50px 20vw" }}>
                <textarea
                  className="full-width"
                  onChange={(e) => setContent(e.target.value)}
                  value={content}
                  rows={10}
                />
              </Grid>
              {/* About form submit button */}
              <Grid sx={{ textAlign: "center" }}>
                <button type="submit" onClick={updateAbout}>
                  Submit
                </button>
              </Grid>
            </Grid>
            {/* Footer component */}
            <Footer />
          </Grid>
        </Grid>
      </Grid>
    );
  } else {
    return <Grid></Grid>;
  }
};

export async function getStaticProps() {
  // Get the about's current content
  const aboutResponse = await IndexAPI.get(`/admin/about`);

  //Provide the about's current content as a prop to the about page component
  return {
    props: {
      aboutContent: aboutResponse.data.data.about[0].content,
    },
    revalidate: 1,
  };
}

export default About;
