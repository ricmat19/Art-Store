import IndexAPI from "../../apis/indexAPI";
import { useEffect, useState } from "react";
import AdminMainNav from "../../components/admin/mainNav";
import AdminPagesNav from "../../components/admin/pagesNav";
import Footer from "../../components/footer";
import { Grid } from "@mui/material";

//Admin privacy policy page props interface
interface IPrivacyPolicy {
  privacyPolicyContent: string | (() => string);
}

//Admin privacy policy page functional component
const PrivacyPolicy = (props: IPrivacyPolicy) => {
  //Admin privacy policy states
  const [loginStatus, setLoginStatus] = useState<boolean>(true);
  const [content, setContent] = useState<string>(props.privacyPolicyContent);

  // Get the current login status and set it as the login state
  useEffect(() => {
    const fetchData = () => {
      try {
        const loginResponse = IndexAPI.get(`/login`);
        setLoginStatus(loginResponse.data.data.loggedIn);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  //Function to update the privacy policy's content
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

  // Render based on the current login status
  if (loginStatus) {
    return (
      <Grid>
        {/* Admin main navigation component */}
        <AdminMainNav />
        {/* Admin pages navigation component */}
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
          {/* Footer component */}
          <Footer />
        </Grid>
      </Grid>
    );
  } else {
    return <Grid></Grid>;
  }
};

export async function getStaticProps() {
  // Get the cart's current content
  const cartResponse = await IndexAPI.get(`/cart`);

  // Get the privacy policy's current content
  const privacyPolicyResponse = await IndexAPI.get(`/admin/privacyPolicy`);

  //Provide the privacy policy's current content as a prop to the privacy policy page component
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
