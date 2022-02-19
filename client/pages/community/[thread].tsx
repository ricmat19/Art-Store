import React, { FC, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import IndexAPI from "../../../apis/indexAPI";
import FooterC from "../../user/standard/footer";
import AdminAccountNavC from "../standard/accountNav";
import AdminMenuNavC from "../standard/menuNav";

const AdminThreadsC: FC = () => {

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
    <div>
      <AdminAccountNavC />
      <AdminMenuNavC />
      <div className="main-body">
        <div className="collection-menu">{}</div>
      </div>
      <FooterC />
    </div>
  );
};

export default AdminThreadsC;
