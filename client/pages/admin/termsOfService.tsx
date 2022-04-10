import IndexAPI from "../../apis/indexAPI";
import { useState } from "react";
import AdminMainNav from "../../components/admin/mainNav";
import AdminPagesNav from "../../components/admin/pagesNav";
import FooterC from "../../components/footer";
import { Grid } from "@mui/material";

const TermsOfService = (props: any) => {
  const [content, setContent] = useState<string>(props.termsOfServiceContent);

  const updateTermsOfService = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await IndexAPI.put(`/admin/termsOfService`, {
        content,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Grid>
      <AdminMainNav />
      <AdminPagesNav />
      <Grid>
        <Grid>
          <h1 className="main-title">terms of service</h1>
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
            <button type="submit" onClick={updateTermsOfService}>
              Submit
            </button>
          </Grid>
        </Grid>
        <FooterC />
      </Grid>
    </Grid>
  );
};

export async function getStaticProps() {
  const cartResponse = await IndexAPI.get(`/cart`);

  const termsOfServiceResponse = await IndexAPI.get(`/admin/termsOfService`);

  return {
    props: {
      cartQty: cartResponse.data.data.cart.length,
      termsOfServiceContent:
        termsOfServiceResponse.data.data.termsOfService[0].content,
    },
    revalidate: 1,
  };
}

export default TermsOfService;
