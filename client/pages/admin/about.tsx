/* eslint-disable @next/next/no-img-element */
import IndexAPI from "../../apis/indexAPI";
import { useState } from "react";
import AdminMainNav from "../../components/admin/mainNav";
import AdminPagesNav from "../../components/admin/pagesNav";
import FooterC from "../../components/footer";
import Head from "next/head";
import { Grid } from "@mui/material";

interface IAbout {
  aboutContent: string | (() => string);
}

const About = (props: IAbout) => {
  const [content, setContent] = useState<string>(props.aboutContent);

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

  return (
    <Grid>
      <Head>
        <title>artHouse19-About</title>
        <meta
          name="description"
          content="About the artHouse19 and its creator."
        ></meta>
      </Head>
      <AdminMainNav />
      <AdminPagesNav />
      <Grid className="main-body">
        <Grid>
          <Grid className="align-center">
            <h1 className="main-title">about</h1>
          </Grid>
          <Grid>
            <Grid sx={{ margin: "50px 20vw" }}>
              <textarea
                className="full-width"
                onChange={(e) => setContent(e.target.value)}
                value={content}
                rows={10}
              />
            </Grid>
            <Grid sx={{ textAlign: "center" }}>
              <button type="submit" onClick={updateAbout}>
                Submit
              </button>
            </Grid>
          </Grid>
          <FooterC />
        </Grid>
      </Grid>
    </Grid>
  );
};

export async function getStaticProps() {
  const aboutResponse = await IndexAPI.get(`/admin/about`);

  return {
    props: {
      aboutContent: aboutResponse.data.data.about[0].content,
    },
    revalidate: 1,
  };
}

export default About;
