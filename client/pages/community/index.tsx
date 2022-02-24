import React, { FC, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import IndexAPI from "../../apis/indexAPI";
import FooterC from "../../components/footer";
import MainNav from "../../components/users/mainNav";
import PagesNav from "../../components/users/pagesNav";
import { Grid } from '@mui/material';

const AdminThreadC: FC = () => {

//   let navigation = useNavigate();

  useEffect((): void => {
    const fetchData = async () => {
      try {
        const eventsResponse = await IndexAPI.get(`/events`);

        for (let i = 0; i < eventsResponse.data.data.product.length; i++) {
          if (eventsResponse.data.data.product[i].imagekey !== null) {
            let imagesResponse = await IndexAPI.get(
              `/images/${eventsResponse.data.data.product[i].imagekey}`,
              {
                responseType: "arraybuffer",
              }
            ).then((response: { data: string; }) =>
              Buffer.from(response.data, "binary").toString("base64")
            );

            eventsResponse.data.data.product[
              i
            ].imageBuffer = `data:image/png;base64,${imagesResponse}`;
          }
        }
        // setCollection(eventsResponse.data.data.product);

      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

//   const displayItem = async (event: string) => {
//     try {
//       navigation(`/admin/events/${event}`);
//     } catch (err) {
//       console.log(err);
//     }
//   };

  return (
    <Grid>
      <MainNav cartQty={cart.length} />
      <PagesNav />
      <Grid className="main-body">
        <Grid className="collection-menu">{}</Grid>
      </Grid>
      <FooterC />
    </Grid>
  );
};

export default AdminThreadC;
