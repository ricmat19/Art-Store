/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
// import { useRouter } from "next/router";
import IndexAPI from "../../../apis/indexAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {
  Backdrop,
  Box,
  Fade,
  Modal,
  Grid,
  MenuItem,
  Select,
  Button,
} from "@mui/material";

const AddToCollection = (props: any) => {
  const [collection, setCollection] = useState("");
  const [newCollection, setNewCollection] = useState<string>("");

  // const router = useRouter();

  const addToCollections = async (e: { preventDefault: () => void }) => {
    try {
      e.preventDefault();
      await IndexAPI.post("/collections", {
        user: "ric19mat@gmail.com",
        collectionName: collection,
        item: props.product.id,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const createCollection = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await IndexAPI.post(`/collections`, {
        user: "ric19mat@gmail.com",
        collectionName: newCollection,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e: any) => {
    setCollection(e.target.value);
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
              <form>
                <Grid sx={{ gap: "10px" }} className="grid">
                  <h1 className="header">Add to Collection</h1>
                  <Grid sx={{ display: "grid", gap: "10px" }}>
                    <Grid
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "min-content 1fr",
                      }}
                    >
                      <input
                        placeholder="Create new collection..."
                        onChange={(e) => setNewCollection(e.target.value)}
                      />
                      <Button
                        onClick={createCollection}
                        sx={{
                          fontFamily: "Rajdhani",
                          fontSize: "20px",
                          color: "white",
                          textTransform: "none",
                        }}
                      >
                        <FontAwesomeIcon className="plus-icon" icon={faPlus} />
                      </Button>
                    </Grid>
                    <Grid
                      sx={{
                        display: "grid",
                      }}
                    >
                      <Select
                        value={collection}
                        onChange={handleChange}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        className="type-selector"
                      >
                        <MenuItem value="">
                          <em>Select Collection...</em>
                        </MenuItem>
                        {props.collections.map((collection: any) => {
                          return (
                            <MenuItem
                              key={collection.collection_name}
                              value={collection.collection_name}
                            >
                              {collection.collection_name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </Grid>
                  </Grid>
                  <Grid sx={{ display: "grid", justifyContent: "center" }}>
                    <button className="added-button" onClick={addToCollections}>
                      Add to Collection
                    </button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </Grid>
  );
};

export default AddToCollection;
