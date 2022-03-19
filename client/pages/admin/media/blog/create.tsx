/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import IndexAPI from "../../../../apis/indexAPI";
import FooterC from "../../../../components/footer";
import MainNav from "../../../../components/users/mainNav";
import PagesNav from "../../../../components/users/pagesNav";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";

const AdminAddBlogPost = (props: any) => {
  const [loginStatus, setLoginStatus] = useState<boolean>(true);
  const [title, setTitle] = useState<string>("");
  const [image, setImage] = useState<File>();
  const [content, setContent] = useState<string>("");

  const router = useRouter();

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

  const createBlogPost = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      if (image) {
        let formData = new FormData();

        formData.append("title", title);
        formData.append("content", content);
        formData.append("images", image);

        await IndexAPI.post("/admin/blog", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
      }
      router.push("/admin/media/blog");
    } catch (err) {
      console.log(err);
    }
  };

  let displayedImage;
  if (image !== undefined) {
    displayedImage = (
      <img
        className="banner-image"
        src={URL.createObjectURL(image)}
        alt="banner-image"
      />
    );
  }

  if (loginStatus) {
    return (
      <Grid>
        <MainNav cartQty={props.cartQty} />
        <PagesNav />
        <Grid container className="main-body">
          <Grid>
            <Grid xs={12} sx={{ textAlign: "center" }}>
              {displayedImage}
            </Grid>
            <form>
              <Grid sx={{ display: "grid", gap: "10px", margin: "50px 20vw" }}>
                <Grid>
                  <label>Title:</label>
                  <input
                    className="full-width"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    name="title"
                    required
                  />
                </Grid>
                <Grid className="admin-form-field">
                  <label className="admin-label">Image:</label>
                  <input
                    type="file"
                    onChange={(e: any) => setImage(e.target.files[0])}
                    name="images"
                    className="form-control file-input"
                    required
                  />
                </Grid>
                <Grid>
                  <label>Content:</label>
                  <textarea
                    className="full-width"
                    rows={50}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    name="content"
                    required
                  />
                </Grid>
                <Grid sx={{ textAlign: "center" }}>
                  <button type="submit" onClick={createBlogPost}>
                    Submit
                  </button>
                </Grid>
              </Grid>
            </form>
          </Grid>
          <FooterC />
        </Grid>
      </Grid>
    );
  } else {
    return <Grid></Grid>;
  }
};

export default AdminAddBlogPost;

// /* eslint-disable @next/next/no-img-element */
// import { useState, useRef } from "react";
// import IndexAPI from "../../../../apis/indexAPI";
// import { Backdrop, Box, Fade, Modal, Grid } from "@mui/material";

// const AdminAddBlog = (props: any) => {

//   return (
//     <Grid>
//       <Modal
//         aria-labelledby="transition-modal-title"
//         aria-describedby="transition-modal-description"
//         open={props.open}
//         onClose={props.handleClose}
//         closeAfterTransition
//         BackdropComponent={Backdrop}
//         BackdropProps={{
//           timeout: 500,
//         }}
//       >
//         <Fade in={props.open}>
//           <Box
//             sx={{
//               position: "absolute",
//               top: "50%",
//               left: "50%",
//               transform: "translate(-50%, -50%)",
//               bgcolor: "background.paper",
//               border: "2px solid #fff",
//               boxShadow: 24,
//               width: "90vw",
//             }}
//           >
//             <Grid
//               container
//               sx={{
//                 flexDirection: "row",
//                 flexWrap: "nowrap",
//                 alignItems: "center",
//                 color: "#000",
//                 justifyContent: "flex-end",
//                 backgroundColor: "#000",
//                 padding: "30px",
//               }}
//             >
//               <Grid sx={{ padding: "0 30px 0 0", width: "50%" }}>
//                 <Grid className="image">
//                   <Grid className="big-image-div">{displayedImage}</Grid>
//                 </Grid>
//               </Grid>
//               <Grid
//                 sx={{
//                   width: "50%",
//                   padding: "0 0 0 30px",
//                   borderLeft: "1px #fff solid",
//                   height: "100%",
//                 }}
//               >
//                 <form
//                   className="admin-form"
//                   action="/admin/blog"
//                   method="POST"
//                   encType="multipart/form-data"
//                 >
//                   <Grid className="admin-form-title">
//                     <h1 className="align-center">Create</h1>
//                   </Grid>
//                   <Grid className="admin-form-field">
//                     <label className="admin-label">Title:</label>
//                     <input
//                       value={title}
//                       ref={titleInput}
//                       onChange={(e) => setTitle(e.target.value)}
//                       type="text"
//                       name="name"
//                       className="form-control"
//                       required
//                     />
//                   </Grid>
//                   <Grid className="admin-form-field">
//                     <label className="admin-label">Image:</label>
//                     <input
//                       type="file"
//                       onChange={(e: any) => setImage(e.target.files[0])}
//                       name="images"
//                       className="form-control file-input"
//                       required
//                     />
//                   </Grid>
//                   <Grid className="admin-form-field">
//                     <label className="admin-label">Content:</label>
//                     <textarea
//                       value={content}
//                       ref={contentInput}
//                       onChange={(e) => setContent(e.target.value)}
//                       name="content"
//                       rows={19}
//                       required
//                     ></textarea>
//                   </Grid>
//                   <Grid className="admin-form-button">
//                     <Grid className="text-center">
//                       <Grid>
//                         <button

//                           type="submit"
//                           className="btn form-button"
//                         >
//                           Submit
//                         </button>
//                       </Grid>
//                     </Grid>
//                   </Grid>
//                 </form>
//               </Grid>
//             </Grid>
//           </Box>
//         </Fade>
//       </Modal>
//     </Grid>
//   );
// };

// export default AdminAddBlog;
