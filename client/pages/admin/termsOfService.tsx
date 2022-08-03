import IndexAPI from "../../apis/indexAPI";
import { useEffect, useState } from "react";
import AdminMainNav from "../../components/admin/mainNav";
import AdminPagesNav from "../../components/admin/pagesNav";
import Footer from "../../components/footer";
import { Grid } from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";

//Admin terms of service page props interface
interface ITermsOfService {
  termsOfServiceContent: string | (() => string);
}

//Admin terms of service page functional component
const TermsOfService = (props: ITermsOfService) => {
  //Admin terms of service states
  const [loginStatus, setLoginStatus] = useState<boolean>(true);
  const [content, setContent] = useState<string>(props.termsOfServiceContent);

  const editorRef = useRef(null);

  //Get the current login status and set it as the login state
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

  //Function to update the terms of service content
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
            <h1 className="main-title">terms of service</h1>
          </Grid>
          <Grid>
            {/* Terms of service content input field */}
            <Grid sx={{ margin: "50px 20vw" }}>
              <Editor
                // onChange={(e) => setContent(e.target.value)}
                apiKey={process.env.NEXT_PUBLIC_TINYMCE}
                onInit={(e, editor) => (editorRef.current = editor)}
                initialValue={content}
                init={{
                  height: 350,
                  menubar: false,
                  plugins: [
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "preview",
                    "help",
                    "wordcount",
                  ],
                  toolbar:
                    "undo redo | blocks | " +
                    "bold italic forecolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | " +
                    "removeformat | help",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:12px }",
                }}
              />
              {/* <textarea
                className="full-width"
                onChange={(e) => setContent(e.target.value)}
                value={content}
                rows={50}
              /> */}
            </Grid>
            {/* Terms of service form submit button */}
            <Grid sx={{ textAlign: "center" }}>
              <button type="submit" onClick={updateTermsOfService}>
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

  // Get the terms of service current content
  const termsOfServiceResponse = await IndexAPI.get(`/admin/termsOfService`);

  //Provide the terms of service current content  and cart quantity as a prop to the terms of service page component
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
