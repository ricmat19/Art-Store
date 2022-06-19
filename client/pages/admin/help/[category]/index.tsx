import {
  ReactChild,
  ReactFragment,
  ReactPortal,
  useState,
  useEffect,
} from "react";
import { useRouter } from "next/router";
import IndexAPI from "../../../../apis/indexAPI";
import AdminMainNav from "../../../../components/admin/mainNav";
import AdminPagesNav from "../../../../components/admin/pagesNav";
import AdminAddHelpModal from "../../../../components/admin/help/createHelpArticleModal";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FooterC from "../../../../components/footer";
import { Button, Grid } from "@mui/material";
import Head from "next/head";

//Admin help category prop interface
interface ICategoryContent {
  categoryTitle:
    | boolean
    | ReactChild
    | ReactFragment
    | ReactPortal
    | null
    | undefined;
  categorySections: string[];
}
interface IHelpCategory {
  category: string;
  categoryContent: ICategoryContent;
  categoryArticles: string[];
}

//Admin help category functional component
const HelpCategory = (props: IHelpCategory) => {
  //Admin help category states
  const [loginStatus, setLoginStatus] = useState<boolean>(true);
  const [addOpen, setAddOpen] = useState(false);

  //Next router function
  const router = useRouter();

  useEffect(() => {
    const fetchData = () => {
      try {
        //Get and set login status on render
        const loginResponse = IndexAPI.get(`/login`);
        setLoginStatus(loginResponse.data.data.loggedIn);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
    // Re-render if change to date events state
  }, []);

  //Handle opening/closing create help article modal
  const handleAddOpen = () => setAddOpen(true);
  const handleAddClose = () => setAddOpen(false);

  // Route to the selected help article
  const displayArticle = async (id: string) => {
    try {
      router.push(`/admin/help/${props.category}/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  //Display component depending on login status
  if (loginStatus) {
    return (
      <Grid>
        <Head>
          <title>artHouse19-Admin Help</title>
        </Head>
        {/* Admin add help article modal component */}
        <AdminAddHelpModal
          open={addOpen}
          handleClose={handleAddClose}
          category={props.category}
          lecture={undefined}
        />
        {/* Admin main navigation component */}
        <AdminMainNav />
        {/* Admin pages navigation component */}
        <AdminPagesNav />
        <Grid>
          <Grid className="plus-icon-div">
            {/* Button to display add help article modal */}
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
          {/* Display the help article's category title */}
          <Grid>
            <h1>{props.categoryContent.categoryTitle}</h1>
          </Grid>
          <Grid
            sx={{
              display: "grid",
              gridTemplateColumns: "200px 1fr",
              margin: "50px 10vw",
              gap: "0 100px",
            }}
          >
            <Grid>
              {/* Route to the "getting started" help page */}
              <Grid
                className="nav-link"
                onClick={() => router.push("/admin/help/gettingStarted")}
              >
                <p className="pointer">Getting Started</p>
              </Grid>
              {/* Route to the "account profile" help page */}
              <Grid
                className="nav-link"
                onClick={() => router.push("/admin/help/accountProfile")}
              >
                <p className="pointer">Account Profile</p>
              </Grid>
              {/* Route to the "troubleshooting" help page */}
              <Grid
                className="nav-link"
                onClick={() => router.push("/admin/help/troubleshooting")}
              >
                <p className="pointer">Troubleshooting</p>
              </Grid>
              {/* Route to the "course taking" help page */}
              <Grid
                className="nav-link"
                onClick={() => router.push("/admin/help/courseTaking")}
              >
                <p className="pointer">Course Taking</p>
              </Grid>
              {/* Route to the "purchases/refunds" help page */}
              <Grid
                className="nav-link"
                onClick={() => router.push("/admin/help/purchasesRefunds")}
              >
                <p className="pointer">Purchases/Refunds</p>
              </Grid>
            </Grid>
            {/* Map out list of sections in the current help category */}
            <Grid>
              {props.categoryContent.categorySections.map(
                (categorySection: any, sectionIndex: number) => {
                  return (
                    <Grid key={sectionIndex}>
                      <Grid sx={{ fontSize: "20px", fontWeight: "500" }}>
                        <p>{categorySection.sectionTitle}</p>
                      </Grid>
                      <Grid>
                        <ul>
                          {props.categoryArticles.map(
                            (article: any, index: number) => {
                              if (article.section === categorySection.section) {
                                return (
                                  <li key={index}>
                                    <Grid>
                                      <Grid
                                        className="pointer"
                                        onClick={() =>
                                          displayArticle(article.id)
                                        }
                                      >
                                        <p>{article.title}</p>
                                      </Grid>
                                    </Grid>
                                  </li>
                                );
                              }
                            }
                          )}
                        </ul>
                      </Grid>
                    </Grid>
                  );
                }
              )}
            </Grid>
          </Grid>
        </Grid>
        <FooterC />
      </Grid>
    );
  } else {
    return <Grid></Grid>;
  }
};

//Create routes for the list help categories
export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          category: "gettingStarted",
        },
      },
      {
        params: {
          category: "accountProfile",
        },
      },
      {
        params: {
          category: "troubleshooting",
        },
      },
      {
        params: {
          category: "courseTaking",
        },
      },
      {
        params: {
          category: "purchasesRefunds",
        },
      },
    ],
    fallback: false,
  };
}

export async function getStaticProps(context: {
  params: { category: string };
}) {
  // Set the list of sections depending on the provided category
  const category = context.params.category;
  let categoryContent = {};
  if (category === "gettingStarted") {
    categoryContent = {
      categoryTitle: "Getting Started",
      categorySections: [
        {
          section: "gettingStarted",
          sectionTitle: "Get Started",
        },
        {
          section: "learnMore",
          sectionTitle: "Learn More",
        },
      ],
    };
  } else if (category === "accountProfile") {
    categoryContent = {
      categoryTitle: "Account / Profile",
      categorySections: [
        {
          section: "settings",
          sectionTitle: "Settings",
        },
        {
          section: "security",
          sectionTitle: "Security",
        },
      ],
    };
  } else if (category === "troubleshooting") {
    categoryContent = {
      categoryTitle: "Troubleshooting",
      categorySections: [
        {
          section: "site",
          sectionTitle: "Site",
        },
        {
          section: "product",
          sectionTitle: "Product",
        },
        {
          section: "course",
          sectionTitle: "Course",
        },
        {
          section: "payments",
          sectionTitle: "Payments",
        },
      ],
    };
  } else if (category === "courseTaking") {
    categoryContent = {
      categoryTitle: "Course Taking",
      categorySections: [
        {
          section: "player",
          sectionTitle: "Player",
        },
        {
          section: "settings",
          sectionTitle: "Settings",
        },
      ],
    };
  } else if (category === "purchasesRefunds") {
    categoryContent = {
      categoryTitle: "Purchases / Refunds",
      categorySections: [
        {
          section: "purchasing",
          sectionTitle: "Purchasing",
        },
        {
          section: "promotions",
          sectionTitle: "Promotions",
        },
        {
          section: "refunds",
          sectionTitle: "Refunds",
        },
      ],
    };
  }

  //Get the list of article in the specified category
  const categoryArticlesResponse = await IndexAPI.get(
    `/admin/help/${category}`
  );

  //Get the cart's current content
  const cartResponse = await IndexAPI.get(`/cart`);

  //Provide the help category's information and cart quantity as props the the help category component
  return {
    props: {
      category: category,
      categoryContent: categoryContent,
      categoryArticles: categoryArticlesResponse.data.data.categoryArticles,
      cartQty: cartResponse.data.data.cart.length,
    },
    revalidate: 1,
  };
}

export default HelpCategory;
