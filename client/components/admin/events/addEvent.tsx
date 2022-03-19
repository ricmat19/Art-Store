// /* eslint-disable @next/next/no-img-element */
// import { useState, useRef } from "react";
// import IndexAPI from "../../../apis/indexAPI";
// import { Backdrop, Box, Fade, Modal, Grid } from "@mui/material";

// const AdminCreateEvent = (props: any) => {
//   const [title, setTitle] = useState<string>("");
//   const [image, setImage] = useState<File>();
//   const [date, setDate] = useState<string>("");
//   const [spots, setSpots] = useState<string>("");
//   const [price, setPrice] = useState<string>("");
//   const [info, setInfo] = useState<string>("");

//   const titleInput = useRef(null);
//   const priceInput = useRef(null);
//   const infoInput = useRef(null);

//   const createEvent = async (e: { preventDefault: () => void }) => {
//     e.preventDefault();
//     try {
//       if (image) {
//         let formData = new FormData();

//         formData.append("title", title);
//         formData.append("images", image);
//         formData.append("date", date);
//         formData.append("spots", spots);
//         formData.append("price", price);
//         formData.append("info", info);

//         await IndexAPI.post("/admin/events", formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         })
//           .then((res) => console.log(res))
//           .catch((err) => console.log(err));
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   let displayedImage;
//   if (image !== undefined) {
//     displayedImage = (
//       <img
//         className="big-image"
//         src={URL.createObjectURL(image)}
//         alt="big image"
//       />
//     );
//   }

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
//                   action="/admin/events"
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
//                     <label className="admin-label">Date:</label>
//                     <input
//                       value={date}
//                       onChange={(e) => setDate(e.target.value)}
//                       type="date"
//                       name="date"
//                       className="form-control"
//                       required
//                     />
//                   </Grid>
//                   <Grid className="admin-form-field">
//                     <label className="admin-label">Spots:</label>
//                     <input
//                       value={spots}
//                       onChange={(e) => setSpots(e.target.value)}
//                       type="number"
//                       name="spots"
//                       className="form-control"
//                       required
//                     />
//                   </Grid>
//                   <Grid className="admin-form-field">
//                     <label className="admin-label">Price:</label>
//                     <input
//                       value={price}
//                       ref={priceInput}
//                       onChange={(e) => setPrice(e.target.value)}
//                       type="number"
//                       name="price"
//                       className="form-control"
//                       required
//                     />
//                   </Grid>
//                   <Grid className="admin-form-field">
//                     <label className="admin-label">Info:</label>
//                     <textarea
//                       value={info}
//                       ref={infoInput}
//                       onChange={(e) => setInfo(e.target.value)}
//                       name="message"
//                       rows={5}
//                       required
//                     ></textarea>
//                   </Grid>
//                   <Grid className="admin-form-button">
//                     <Grid className="text-center">
//                       <Grid>
//                         <button
//                           onClick={createEvent}
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

// export default AdminCreateEvent;
