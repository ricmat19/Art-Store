/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import IndexAPI from "../../../apis/indexAPI";
import { Backdrop, Box, Fade, Modal, Grid } from "@mui/material";

const AdminCreateVideoLecture = (props: any) => {
  const [video, setVideo] = useState();
  const [description, setDescription] = useState<string>("");

  const createVideoLecture = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      if (video) {
        let formData = new FormData();

        formData.append("video", video);
        formData.append("description", description);

        await IndexAPI.put(
          `/admin/courses/lecture/${props.lecture}/${props.section}/${props.id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        )
          .then((res) => console.log(res))
          .catch((err) => console.log(err));

        props.handleClose();
      }
    } catch (err) {
      console.log(err);
    }
  };

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
              border: "2px solid #fff",
              boxShadow: 24,
              width: "90vw",
              maxWidth: "600px",
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
              <Grid
                sx={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <form
                  className="admin-form"
                  action="/admin/products"
                  method="POST"
                  encType="multipart/form-data"
                >
                  <Grid className="admin-form-title">
                    <h1 className="align-center">Video Lecture: {props.lecture}</h1>
                  </Grid>
                  <Grid className="admin-form-field">
                    <label className="admin-label">Video:</label>
                    <input
                      type="file"
                      onChange={(e: any) => setVideo(e.target.files[0])}
                      name="video"
                      className="form-control file-input"
                      required
                    />
                  </Grid>
                  <Grid className="admin-form-field">
                    <label className="admin-label">Description:</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      name="description"
                      rows={5}
                      className="form-control"
                      required
                    />
                  </Grid>
                  <Grid className="admin-form-button">
                    <Grid className="text-center">
                      <Grid>
                        <button
                          onClick={createVideoLecture}
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

export default AdminCreateVideoLecture;
