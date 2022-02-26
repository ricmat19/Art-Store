/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import IndexAPI from "../../../apis/indexAPI";
import Footer from "../../../components/footer";
import { IBlog } from "../../../interfaces";
import AdminMainNav from "../../../components/admin/mainNav";
import AdminPagesNav from "../../../components/admin/pagesNav";
import AddBlog from "../../../components/admin/media/blog/addBlog";
import { Button, Grid } from "@mui/material";
import AdminMediaNav from "../../../components/admin/media/mediaNav";
// import { useNavigate } from "react-router-dom";

const AdminBlogPostsC = (props: any) => {
  // const [type, setType] = useState<string>("");
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let blogResponse;
  useEffect((): void => {
    const fetchData = async () => {
      try {
        blogResponse = await IndexAPI.get(`/admin/medias/blog`);

        for (let i = 0; i < blogResponse.data.data.blogs.length; i++) {
          if (blogResponse.data.data.blogs[i].imagekey !== null) {
            let imagesResponse = await IndexAPI.get(
              `/images/${blogResponse.data.data.blogs[i].imagekey}`,
              {
                responseType: "arraybuffer",
              }
            ).then((response) =>
              Buffer.from(response.data, "binary").toString("base64")
            );

            blogResponse.data.data.blogs[
              i
            ].imageBuffer = `data:image/png;base64,${imagesResponse}`;
          }
        }
        setBlogs(blogResponse.data.data.blogs);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const itemsPerPage: number = 9;
  const pagesVisted: number = pageNumber * itemsPerPage;
  const pageCount = Math.ceil(blogs.length / itemsPerPage);

  const changePage = ({ selected }: { selected: number }): void => {
    setPageNumber(selected);
  };

  const displayBlogs = blogs
    .slice(pagesVisted, pagesVisted + itemsPerPage)
    .map((blog) => {
      return (
        <Grid className="collection-item-div" key={blog.id}>
          <Grid
            className="collection-item"
            // onClick={() => displayBlog(blog.id)}
          >
            <img
              className="collection-thumbnail"
              src={blog.imageBuffer}
              alt="collection-thumbnail"
            />
          </Grid>
          <Grid container>
            <Grid xs={6} sx={{ textAlign: "left" }}>
              {blog.title}
            </Grid>
            <Grid xs={6} sx={{ textAlign: "right" }}>
              <button
                className="delete-button"
                onClick={() => deleteBlog(blog.id)}
              >
                Delete
              </button>
            </Grid>
          </Grid>
        </Grid>
      );
    });

  // let navigation = useNavigate();

  // const displayBlog = async (id: string) => {
  //   try {
  //     navigation(`/admin/medias/blog/${id}`);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const deleteBlog = async (id: string) => {
    try {
      await IndexAPI.delete(`/admin/medias/blog/delete/${id}`);
      setBlogs(
        blogs.filter((blog) => {
          return blog.id !== id;
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <AddBlog open={open} handleClose={handleClose} />
      <AdminMainNav />
      <AdminPagesNav />
      <div className="main-body">
        <AdminMediaNav medias={props.media} />
        <Grid sx={{ textAlign: "right", paddingRight: "50px" }}>
          <Button
            onClick={handleOpen}
            sx={{
              fontFamily: "Rajdhani",
              fontSize: "20px",
              color: "white",
              textTransform: "none",
            }}
          >
            <a>add blog</a>
          </Button>
        </Grid>
        <div className="thumbnail-display">{displayBlogs}</div>
        <ReactPaginate
          previousLabel={"prev"}
          nextLabel={"next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationButtons"}
          previousLinkClassName={"prevButton"}
          nextLinkClassName={"nextButton"}
          disabledClassName={"disabledButton"}
          activeClassName={"activeButton"}
          pageRangeDisplayed={5}
          marginPagesDisplayed={5}
        />
      </div>
      <Footer />
    </div>
  );
};

export async function getStaticPaths() {
  const mediaResponse = await IndexAPI.get(`/media`);

  const media: string[] = [];
  for (let i = 0; i < mediaResponse.data.data.medias.length; i++) {
    if (!media.includes(mediaResponse.data.data.medias.type)) {
      media.push(mediaResponse.data.data.medias[i].type);
    }
  }

  return {
    fallback: false,
    paths: media.map((media: any) => ({
      params: {
        media: media,
      },
    })),
  };
}

export async function getStaticProps(context: { params: { media: any } }) {
  const media = context.params.media;
  const mediaResponse = await IndexAPI.get(`/media/${media}`);

  for (let i = 0; i < mediaResponse.data.data.posts.length; i++) {
    if (mediaResponse.data.data.posts[i].imagekey !== null) {
      let imagesResponse = await IndexAPI.get(
        `/images/${mediaResponse.data.data.posts[i].imagekey}`,
        {
          responseType: "arraybuffer",
        }
      ).then((response) =>
        Buffer.from(response.data, "binary").toString("base64")
      );

      mediaResponse.data.data.posts[
        i
      ].imageBuffer = `data:image/png;base64,${imagesResponse}`;
    }
  }
  return {
    props: {
      media: mediaResponse.data.data.posts,
    },
    revalidate: 1,
  };
}

export default AdminBlogPostsC;
