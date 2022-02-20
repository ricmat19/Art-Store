import { FC, useEffect } from "react";
// import { useRouter } from "next/router";
// import ReactPaginate from "react-paginate";
// import IndexAPI from "../../../apis/indexAPI";
import FooterC from "../../../components/footer";
import MainNav from "../../../components/users/mainNav";
import PagesNav from "../../../components/users/pagesNav";
import MediaNav from "../../../components/users/medias/mediaNav";
import { Grid } from '@mui/material';

const PodcastsC: FC = () => {

//   const { media } = useRouter();

//   const [ , setChannel ] = useState<string[]>();
  // const [, setPageNumber] = useState<number>(0);

//   let mediaResponse;
  useEffect((): void => {
    const fetchData = async () => {
      try {

        // if(media === "channel"){
        //   mediaResponse = await IndexAPI.get(`/medias/${media}`);
        //   // console.log(mediaResponse.data.data.videos.items[0].id.videoId);
          
        //   const videoList: string[] = [];
        //   for(let i = 0; i < mediaResponse.data.data.videos.items.length; i++){
        //     videoList.push(mediaResponse.data.data.videos.items[i].id.videoId)
        //   }
        //   console.log(videoList)
        //   setChannel(videoList);
        // }

      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  // const itemsPerPage: number = 9;
  // const pagesVisted: number = pageNumber * itemsPerPage;
  // const pageCount = Math.ceil(channel.length / itemsPerPage);

  // const changePage = ({selected}: {selected:number}): void => {
  //   setPageNumber(selected);
  // };

  // const displayMedias = channel
  //   .slice(pagesVisted, pagesVisted + itemsPerPage)
  //   .map((video) => {
  //     return (
  //       <Grid
  //         className="collection-item-div"
  //         key={media.id}
  //         onClick={() => displayItem(media.media, media.id)}
  //       >
  //         <Grid className="collection-item">
  //           <img className="collection-thumbnail" src={media.imageBuffer} />
  //         </Grid>
  //         <Grid>
  //           <Grid>{media.title}</Grid>
  //         </Grid>
  //       </Grid>
  //     );
  //   });

  // let navigation = useNavigate();

  // const displayItem = async (media: string, id: string) => {
  //   try {
  //     navigation(`/medias/${media}/${id}`);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <Grid>
      <MainNav />
      <PagesNav cartQty={cartQty} />
      <Grid className="main-body">
        <MediaNav />
        <Grid className="collection-menu">{}</Grid>
        {/* <Grid className="thumbnail-display">{displayMedias}</Grid> */}
        {/* <ReactPaginate
          previousLabel={"prev"}
          nextLabel={"next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationButtons"}
          previousLinkClassName={"prevButton"}
          nextLinkClassName={"nextButton"}
          disabledClassName={"disabledButton"}
          activeClassName={"activeButton"} pageRangeDisplayed={5} marginPagesDisplayed={5}/> */}
      </Grid>
      <FooterC />
    </Grid>
  );
};

export default PodcastsC;
