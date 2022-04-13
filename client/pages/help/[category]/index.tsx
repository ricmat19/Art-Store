import { useRouter } from "next/router";
import IndexAPI from "../../../apis/indexAPI";
import MainNav from "../../../components/users/mainNav";
import PagesNav from "../../../components/users/pagesNav";
import FooterC from "../../../components/footer";
import { Grid } from "@mui/material";
import Head from "next/head";

const HelpCategory = (props: any) => {
  const router = useRouter();

  const displayArticle = async (id: string) => {
    try {
      router.push(`/help/${props.category}/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Grid>
      <Head>
        <title>artHouse19-Help</title>
      </Head>
      <MainNav />
      <PagesNav />
      <Grid>
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
            <Grid
              className="nav-link"
              onClick={() => router.push("/help/gettingStarted")}
            >
              <p className="pointer">Getting Started</p>
            </Grid>
            <Grid
              className="nav-link"
              onClick={() => router.push("/help/accountProfile")}
            >
              <p className="pointer">Account Profile</p>
            </Grid>
            <Grid
              className="nav-link"
              onClick={() => router.push("/help/troubleshooting")}
            >
              <p className="pointer">Troubleshooting</p>
            </Grid>
            <Grid
              className="nav-link"
              onClick={() => router.push("/help/courseTaking")}
            >
              <p className="pointer">Course Taking</p>
            </Grid>
            <Grid
              className="nav-link"
              onClick={() => router.push("/help/purchasesRefunds")}
            >
              <p className="pointer">Purchases Refunds</p>
            </Grid>
          </Grid>
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
      <FooterC />
    </Grid>
  );
};

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

export async function getStaticProps(context: { params: { category: any } }) {
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

  const categoryArticlesResponse = await IndexAPI.get(`/help/${category}`);

  const cartResponse = await IndexAPI.get(`/cart`);

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