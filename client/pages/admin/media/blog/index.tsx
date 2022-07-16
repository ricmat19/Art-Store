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
import AdminDeleteBlog from "../../../../components/admin/media/blog/deleteBlogPostModal";
import { Button, Grid } from "@mui/material";
import Link from "next/link";

//Admin blog prop interface
interface IAdminBlog {
  blog: IBlog[];
}

//Admin blog functional component
const AdminBlog = (props: IAdminBlog) => {
  //Admin blog states
  const [loginStatus, setLoginStatus] = useState<boolean>(true);
  const [blogPosts, setBlogPosts] = useState<IBlog[]>(props.blog);
  const [deleteBlog, setDeleteBlog] = useState<IBlog>({
    id: "",
    title: "",
    imagekey: "",
    content: "",
    info: "",
  });
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [deleteOpen, setDeleteOpen] = useState(false);

  //Handle opening/closing blog post delete modal
  const handleDeleteOpen = () => setDeleteOpen(true);
  const handleDeleteClose = () => setDeleteOpen(false);

  // Setup pagination and number of items per page
  const itemsPerPage = 9;
  const pagesVisited: number = pageNumber * itemsPerPage;
  const pageCount = Math.ceil(blogPosts.length / itemsPerPage);
  const changePage = ({ selected }: { selected: number }): void => {
    setPageNumber(selected);
  };

  //Next router function
  const router = useRouter();

  // Route to the selected blog post
  const displayBlogPost = async (id: string) => {
    try {
      await router.push(`/admin/media/blog/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  //Set the selected item and display the delete blog post modal
  const displayDeleteModal = (id: string) => {
    for (let i = 0; i < blogPosts.length; i++) {
      if (blogPosts[i].id === id) {
        setDeleteBlog(blogPosts[i]);
      }
    }
    handleDeleteOpen();
  };

  //Map through the list of blog posts and setup their templates
  const displayBlogs = blogPosts
    .slice(pagesVisited, pagesVisited + itemsPerPage)
    .map((post) => {
      return (
        <Grid key={post.id}>
          {/* Display blog post page on click */}
          <Grid className="pointer" onClick={() => displayBlogPost(post.id)}>
            {/* Display blog post image */}
            <Grid className="admin-image-container">
              <img
                className="thumbnail"
                src={post.imagekey}
                alt="blog-thumbnail"
              />
            </Grid>
            {/* Display blog post title */}
            <Grid className="one-column-thumbnail-footer">
              <h3 className="align-center">{post.title}</h3>
            </Grid>
          </Grid>
          <Grid>
            <Grid>
              <Grid>
                {/* Button to select blog post for deletion and display deletion modal */}
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

  // Get the current login status and set its state
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

  // Render based on the current login status
  if (loginStatus) {
    return (
      <Grid>
        <Head>
          <title>artHouse19-Admin Blog</title>
        </Head>
        {/* Admin delete blog post modal component */}
        <AdminDeleteBlog
          deleteBlog={deleteBlog}
          open={deleteOpen}
          handleClose={handleDeleteClose}
          setBlogPosts={setBlogPosts}
          blogs={[]}
        />
        {/* Admin main nav component */}
        <AdminMainNav />
        {/* Admin pages nav component */}
        <AdminPagesNav />
        <Grid className="main-body">
          <Grid>
            <Grid>
              {/* Route to blog index page */}
              <Link passHref href="/admin/blog">
                <h1 className="main-title pointer">blog</h1>
              </Link>
            </Grid>
            <Grid className="plus-icon-div">
              {/* Button to create a new blog post */}
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
            {/* Display the list of mapped blog posts */}
            <Grid className="gallery-menu">{displayBlogs}</Grid>
            {/* Pagination component */}
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
          {/* Footer component */}
          <Footer />
        </Grid>
      </Grid>
    );
  } else {
    return <Grid></Grid>;
  }
};

export async function getStaticProps() {
  //Get list of blog posts
  const blogResponse = await IndexAPI.get(`/admin/blog`);

  //Provide the selected blog content as a prop to the course component
  return {
    props: {
      blog: blogResponse.data.data.blog,
    },
    revalidate: 1,
  };
}

export default AdminBlog;
