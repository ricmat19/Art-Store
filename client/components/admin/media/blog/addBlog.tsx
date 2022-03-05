/* eslint-disable @next/next/no-img-element */
import { useState, useRef } from "react";
import IndexAPI from "../../../../apis/indexAPI";
import { Backdrop, Box, Fade, Modal, Grid } from "@mui/material";

const AdminAddBlog = (props: any) => {
  const [title, setTitle] = useState<string>("");
  const [images, setImages] = useState<File>();
  const [content, setContent] = useState<string>("");

  const titleInput = useRef(null);
  const contentInput = useRef(null);

  if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
  }

  const createMedia = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      if (images) {
        let formData = new FormData();

        formData.append("title", title);
        formData.append("content", content);
        formData.append("images", images);

        await IndexAPI.post("/admin/media/blog/create", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
      }
    } catch (err) {
      console.log(err);
    }
  };

  let displayedImage = "";
  if (images !== undefined) {
    displayedImage = URL.createObjectURL(images);
  }

  return (
    <Grid>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.open}
        onClose={props.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
              width: "90vw",
            }}
          >
            <Grid
              container
              sx={{
                flexDirection: "row",
                flexWrap: "nowrap",
                alignItems: "center",
                color: "#000",
                justifyContent: "flex-end",
                backgroundColor: "#000",
                padding: "30px",
              }}
            >
              <Grid sx={{ padding: "0 30px 0 0", width: "50%" }}>
                <Grid className="image">
                  <Grid className="big-image-div">
                    <img
                      className="big-image"
                      src={displayedImage}
                      alt="big image"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                sx={{
                  width: "50%",
                  padding: "0 0 0 30px",
                  borderLeft: "1px #fff solid",
                  height: "100%",
                }}
              >
                <form
                  className="admin-form"
                  action="/admin/media/create"
                  method="POST"
                  encType="multipart/form-data"
                >
                  <Grid className="admin-form-title">
                    <h1 className="align-center">Create</h1>
                  </Grid>
                  <Grid className="admin-form-field">
                    <label className="admin-label">Title:</label>
                    <input
                      value={title}
                      ref={titleInput}
                      onChange={(e) => setTitle(e.target.value)}
                      type="text"
                      name="name"
                      className="form-control"
                      required
                    />
                  </Grid>
                  <Grid className="admin-form-field">
                    <label className="admin-label">Image:</label>
                    <input
                      type="file"
                      onChange={(e: any) => setImages(e.target.files[0])}
                      name="images"
                      className="form-control file-input"
                      required
                    />
                  </Grid>
                  <Grid className="admin-form-field">
                    <label className="admin-label">Content:</label>
                    <textarea
                      value={content}
                      ref={contentInput}
                      onChange={(e) => setContent(e.target.value)}
                      name="content"
                      rows={19}
                      required
                    ></textarea>
                  </Grid>
                  <Grid className="admin-form-button">
                    <Grid className="text-center">
                      <Grid>
                        <button
                          onClick={createMedia}
                          type="submit"
                          className="btn form-button"
                        >
                          Submit
                        </button>
                      </Grid>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </Grid>
  );
};

export default AdminAddBlog;
