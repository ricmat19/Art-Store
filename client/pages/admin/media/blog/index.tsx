/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ReactPaginate from "react-paginate";
import IndexAPI from "../../../../apis/indexAPI";
import AdminMainNav from "../../../../components/admin/mainNav";
import AdminPagesNav from "../../../../components/admin/pagesNav";
import Footer from "../../../../components/footer";
import { IBlog } from "../../../../interfaces";
import Head from "next/head";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AdminDeleteBlog from "../../../../components/admin/media/blog/deletePost";
import { Button, Grid } from "@mui/material";
import Link from "next/link";

const AdminBlog = (props: any) => {
  const [loginStatus, setLoginStatus] = useState<boolean>(true);
  const [blog] = useState<IBlog[]>(props.blog);
  const [deleteBlog, setDeleteBlog] = useState<any>();
  const [pageNumber, setPageNumber] = useState<number>(0);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const handleDeleteOpen = () => setDeleteOpen(true);
  const handleDeleteClose = () => setDeleteOpen(false);

  const itemsPerPage: number = 9;
  const pagesVisted: number = pageNumber * itemsPerPage;
  const pageCount = Math.ceil(blog.length / itemsPerPage);
  const changePage = ({ selected }: { selected: number }): void => {
    setPageNumber(selected);
  };

  const router = useRouter();

  const displayBlogPost = async (id: string) => {
    try {
      router.push(`/admin/media/blog/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  const displayDeleteModal = (id: any) => {
    for (let i = 0; i < blog.length; i++) {
      if (blog[i].id === id) {
        setDeleteBlog(blog[i]);
      }
    }
    handleDeleteOpen();
  };

  const displayBlogs = blog
    .slice(pagesVisted, pagesVisted + itemsPerPage)
    .map((post) => {
      return (
        <Grid key={post.id}>
          <Grid className="pointer" onClick={() => displayBlogPost(post.id)}>
            <Grid className="image-container">
              <img
                className="thumbnail"
                src={post.imageBuffer}
                alt="blog-thumbnail"
              />
            </Grid>
            <Grid className="one-column-thumbnail-footer">
              <h3 className="align-center">{post.title}</h3>
            </Grid>
          </Grid>
          <Grid>
            <Grid>
              <Grid>
                <button
                  onClick={() => displayDeleteModal(post.id)}
                  className="delete"
                >
                  Delete
                </button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      );
    });

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

  if (loginStatus) {
    return (
      <Grid>
        <Head>
          <title>artHouse19-Admin Blog</title>
        </Head>
        <AdminDeleteBlog
          deleteBlog={deleteBlog}
          open={deleteOpen}
          handleClose={handleDeleteClose}
        />
        <AdminMainNav />
        <AdminPagesNav />
        <Grid className="main-body">
          <Link passHref href="/admin/blog">
            <h1 className="main-title pointer">blog</h1>
          </Link>
          <Grid className="plus-icon-div">
            <Button
              onClick={() => router.push("/admin/media/blog/create")}
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
          <Grid className="gallery-menu">{displayBlogs}</Grid>
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
        </Grid>
        <Footer />
      </Grid>
    );
  } else {
    return <Grid></Grid>;
  }
};

export async function getStaticProps() {
  const blogResponse = await IndexAPI.get(`/admin/blog`);

  for (let i = 0; i < blogResponse.data.data.blog.length; i++) {
    if (blogResponse.data.data.blog[i].imagekey !== null) {
      let imagesResponse = await IndexAPI.get(
        `/images/${blogResponse.data.data.blog[i].imagekey}`,
        {
          responseType: "arraybuffer",
        }
      ).then((response) =>
        Buffer.from(response.data, "binary").toString("base64")
      );

      blogResponse.data.data.blog[
        i
      ].imageBuffer = `data:image/png;base64,${imagesResponse}`;
    }
  }
  return {
    props: {
      blog: blogResponse.data.data.blog,
    },
    revalidate: 1,
  };
}

export default AdminBlog;
