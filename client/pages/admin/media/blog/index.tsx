/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import IndexAPI from "../../../../apis/indexAPI";
import AdminMainNav from "../../../../components/admin/mainNav";
import AdminPagesNav from "../../../../components/admin/pagesNav";
import Footer from "../../../../components/footer";
import { IBlog } from "../../../../interfaces";
import Head from "next/head";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AdminAddBlog from "../../../../components/admin/media/blog/addBlog";
import AdminDeleteBlog from "../../../../components/admin/media/blog/deleteBlog";
import { Button, Grid } from "@mui/material";
import router from "next/router";
import Link from "next/link";

const AdminBlogPostsC = (props: any) => {
  const [loginStatus, setLoginStatus] = useState<boolean>(true);
  const [blogs, setBlogs] = useState<IBlog[]>(props.blogs);
  const [deleteBlog, setDeleteBlog] = useState<any>();
  const [pageNumber, setPageNumber] = useState<number>(0);

  const [addOpen, setAddOpen] = useState(false);
  const handleAddOpen = () => setAddOpen(true);
  const handleAddClose = () => setAddOpen(false);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const handleDeleteOpen = () => setDeleteOpen(true);
  const handleDeleteClose = () => setDeleteOpen(false);

  const itemsPerPage: number = 9;
  const pagesVisted: number = pageNumber * itemsPerPage;
  const pageCount = Math.ceil(blogs.length / itemsPerPage);
  const changePage = ({ selected }: { selected: number }): void => {
    setPageNumber(selected);
  };

  const displayDeleteModal = (id: any) => {
    for (let i = 0; i < blogs.length; i++) {
      if (blogs[i].id === id) {
        setDeleteBlog(blogs[i]);
      }
    }
    handleDeleteOpen();
  };

  const displayBlog = async (id: string) => {
    try {
      router.push(`/admin/medias/blog/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  const displayBlogs = blogs
    .slice(pagesVisted, pagesVisted + itemsPerPage)
    .map((blog) => {
      return (
        <Grid className="blog-post-div" key={blog.id}>
          <Grid className="pointer" onClick={() => displayBlog(blog.id)}>
            <Grid className="blog-thumbnail-div">
              <img
                className="blog-thumbnail"
                src={blog.imageBuffer}
                alt="blog-thumbnail"
              />
            </Grid>
            <Grid sx={{ textAlign: "left" }}>{blog.title}</Grid>
          </Grid>
          <Grid>
            <Grid className="admin-products-button-div">
              <Grid>
                <button
                  onClick={() => displayDeleteModal(blog.id)}
                  className="delete"
                >
                  Delete
                </button>
              </Grid>
              <Grid>
                <button
                  // onClick={() => displayUpdateProductModal(item.id)}
                  type="submit"
                >
                  Update
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
      <div>
        <Head>
          <title>artHouse19-Admin Blog</title>
        </Head>
        <AdminAddBlog open={addOpen} handleClose={handleAddClose} />
        <AdminDeleteBlog
          deleteBlog={deleteBlog}
          blogs={blogs}
          setBlogs={setBlogs}
          open={deleteOpen}
          handleClose={handleDeleteClose}
        />
        <AdminMainNav />
        <AdminPagesNav />
        <div className="main-body">
          <Link passHref href="/admin/products/blog">
            <h1 className="main-title pointer">blog</h1>
          </Link>
          <Grid className="plus-icon-div">
            <Button
              onClick={handleAddOpen}
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
  } else {
    return <div></div>;
  }
};

export async function getStaticProps() {
  const blogResponse = await IndexAPI.get(`/admin/media/blog`);

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

export default AdminBlogPostsC;
