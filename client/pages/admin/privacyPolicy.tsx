import IndexAPI from "../../apis/indexAPI";
import { useState } from "react";
import AdminMainNav from "../../components/admin/mainNav";
import AdminPagesNav from "../../components/admin/pagesNav";
import FooterC from "../../components/footer";
import { Grid } from "@mui/material";

interface IPrivacyPolicy {
  privacyPolicyContent: string | (() => string);
}

const PrivacyPolicy = (props: IPrivacyPolicy) => {
  const [content, setContent] = useState<string>(props.privacyPolicyContent);

  const updatePrivacyPolicy = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await IndexAPI.put(`/admin/privacyPolicy`, {
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
          <h1 className="main-title">privacy policy</h1>
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
            <button type="submit" onClick={updatePrivacyPolicy}>
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

  const privacyPolicyResponse = await IndexAPI.get(`/admin/privacyPolicy`);

  return {
    props: {
      cartQty: cartResponse.data.data.cart.length,
      privacyPolicyContent:
        privacyPolicyResponse.data.data.privacyPolicy[0].content,
    },
    revalidate: 1,
  };
}

export default PrivacyPolicy;
