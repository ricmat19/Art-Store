import { FC, useEffect } from "react";
import IndexAPI from "../../../apis/indexAPI";
import FooterC from "../../../components/footer";
import MainNav from "../../../components/users/mainNav";
import PagesNav from "../../../components/users/pagesNav";
import MediaNav from "../../../components/users/medias/mediaNav";
import { Grid } from '@mui/material';
// import { IVideos } from "../../../../interfaces";
// import { useNavigate } from "react-router-dom";
// import ReactPaginate from "react-paginate";

const BlogPostsC: FC = () => {

  // const [ videos , setVideos ] = useState<IVideos[]>([]);
  // const [ pageNumber, setPageNumber] = useState<number>(0);

  let channelResponse;
  useEffect((): void => {
    const fetchData = async () => {
      try {

        channelResponse = await IndexAPI.get(`/medias/channel`);
        console.log(channelResponse.data.data.videos.items);
        
        // setVideos(channelResponse.data.data.videos.items);

      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  // const itemsPerPage: number = 9;
  // const pagesVisted: number = pageNumber * itemsPerPage;
  // const pageCount = Math.ceil(videos.length / itemsPerPage);

  // const changePage = ({selected}: {selected:number}): void => {
  //   setPageNumber(selected);
  // };

  // const displayChannel = videos
  //   .slice(pagesVisted, pagesVisted + itemsPerPage)
  //   .map((video) => {
  //     return (
  //       <Grid
  //         className="collection-item-div"
  //         key={video.etag}
  //         // onClick={() => displayVideo(video.id)}
  //       >
  //         {/* <Grid className="collection-item">
  //           <img className="collection-thumbnail" src={post.imageBuffer} />
  //         </Grid> */}
  //         <Grid>
  //           {/* <Grid>{video.title}</Grid> */}
  //         </Grid>
  //       </Grid>
  //     );
  //   });

  // let navigation = useNavigate();

  // const displayVideo = async (id: string) => {
  //   try {
  //     navigation(`/medias/channel/${id}`);
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
        <Grid className="thumbnail-display">{}</Grid>
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

export default BlogPostsC;
