/* eslint-disable @next/next/no-img-element */
import IndexAPI from "../../apis/indexAPI";
import { useState } from "react";
import MainNav from "../../components/users/mainNav";
import PagesNav from "../../components/users/pagesNav";
import FooterC from "../../components/footer";
import Head from "next/head";
import { Grid } from "@mui/material";

const About = (props: any) => {
  const [content, setContent] = useState<string>("");

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
      <MainNav cartQty={props.cartQty} />
      <PagesNav />
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
                rows={50}
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

// export async function getStaticProps() {
//   const aboutResponse = await IndexAPI.get(`/admin/about`);

//   return {
//     props: {
//       about: aboutResponse.data.data.about,
//     },
//     revalidate: 1,
//   };
// }

export default About;
