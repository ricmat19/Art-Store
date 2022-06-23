import { useRouter } from "next/router";
import IndexAPI from "../../../apis/indexAPI";
import MainNav from "../../../components/users/mainNav";
import PagesNav from "../../../components/users/pagesNav";
import Footer from "../../../components/footer";
import { Grid } from "@mui/material";
import Head from "next/head";

//Help category props interface
interface IHelpCategory {
  category: string;
  categoryContent: {
    categoryTitle: string;
    categorySections: {
      sectionTitle: string;
      section: string;
    }[];
  };
  categoryArticles: {
    id: string;
    title: string;
    section: string;
  }[];
  cartQty: number;
}

// Help category functional component
const HelpCategory = (props: IHelpCategory) => {
  // Next router function
  const router = useRouter();

  // Function routing to the selected help article page
  const displayArticle = async (id: string) => {
    try {
      await router.push(`/help/${props.category}/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  //Help category component
  return (
    <Grid>
      <Head>
        <title>artHouse19-Help</title>
      </Head>
      <MainNav cartQty={props.cartQty} />
      <PagesNav />
      <Grid>
        {/* Display the help article category title */}
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
            {/* Route to Getting Started page */}
            <Grid
              className="nav-link"
              onClick={() => router.push("/help/gettingStarted")}
            >
              <p className="pointer">Getting Started</p>
            </Grid>
            {/* Route to Account Profile page */}
            <Grid
              className="nav-link"
              onClick={() => router.push("/help/accountProfile")}
            >
              <p className="pointer">Account Profile</p>
            </Grid>
            {/* Route to Troubleshooting page */}
            <Grid
              className="nav-link"
              onClick={() => router.push("/help/troubleshooting")}
            >
              <p className="pointer">Troubleshooting</p>
            </Grid>
            {/* Route to Course Taking page */}
            <Grid
              className="nav-link"
              onClick={() => router.push("/help/courseTaking")}
            >
              <p className="pointer">Course Taking</p>
            </Grid>
            {/* Route to Purchases/Refunds page */}
            <Grid
              className="nav-link"
              onClick={() => router.push("/help/purchasesRefunds")}
            >
              <p className="pointer">Purchases Refunds</p>
            </Grid>
          </Grid>
          {/* Map through the list of help categories */}
          <Grid>
            {props.categoryContent.categorySections.map(
              (categorySection, sectionIndex: number) => {
                return (
                  <Grid key={sectionIndex}>
                    <Grid sx={{ fontSize: "20px", fontWeight: "500" }}>
                      {/* Display the help category's title */}
                      <p>{categorySection.sectionTitle}</p>
                    </Grid>
                    {/* Map through the list of help articles in the current help category */}
                    <Grid>
                      <ul>
                        {props.categoryArticles.map(
                          (article, index: number) => {
                            if (article.section === categorySection.section) {
                              return (
                                <li key={index}>
                                  <Grid>
                                    {/* Display the title of the help article */}
                                    <Grid
                                      className="pointer"
                                      onClick={() => displayArticle(article.id)}
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
      {/* Footer component */}
      <Footer />
    </Grid>
  );
};

// Create paths for the list of help article categories
export function getStaticPaths() {
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
  const category = context.params.category;

  // Set the category title and section based on the selected help category
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

  // Get the list of help article in the selected help category
  const categoryArticlesResponse = await IndexAPI.get(`/help/${category}`);

  // Get cart content
  const cartResponse = await IndexAPI.get(`/cart`);

  // Provide the selected help category, content, articles, and cart quantity as props to the help category component
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
