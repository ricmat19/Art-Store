import { useState } from "react";
import IndexAPI from "../../../../apis/indexAPI";
import AdminMainNav from "../../../../components/admin/mainNav";
import AdminPagesNav from "../../../../components/admin/pagesNav";
import AdminAddHelp from "../../../../components/admin/help/createHelpArticle";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FooterC from "../../../../components/footer";
import { Button, Grid } from "@mui/material";
import Head from "next/head";

const HelpCategory = (props: any) => {
  const [addOpen, setAddOpen] = useState(false);
  const handleAddOpen = () => setAddOpen(true);
  const handleAddClose = () => setAddOpen(false);

  return (
    <Grid>
      <Head>
        <title>artHouse19-Admin Products</title>
      </Head>
      <AdminAddHelp
        open={addOpen}
        handleClose={handleAddClose}
        category={props.category}
      />
      <AdminMainNav cartQty={props.cartQty} />
      <AdminPagesNav />
      <Grid>
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
        <Grid>{props.categoryContent.categoryTitle}</Grid>
        <Grid>
          {props.categoryContent.categorySections.map(
            (categorySection: any, sectionIndex: number) => {
              return (
                <Grid key={sectionIndex}>
                  <Grid>{categorySection.sectionTitle}</Grid>
                  <Grid>
                    {props.categoryArticles.map(
                      (article: any, index: number) => {
                        if (article.section === categorySection.section) {
                          return (
                            <Grid key={index}>
                              <Grid>{article.title}</Grid>
                            </Grid>
                          );
                        }
                      }
                    )}
                  </Grid>
                </Grid>
              );
            }
          )}
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
      categorySections: {
        sections: ["site", "product", "course", "payments"],
        sectionTitles: ["Site", "Product", "Course", "Payments"],
      },
    };
  } else if (category === "courseTaking") {
    categoryContent = {
      categoryTitle: "Course Taking",
      categorySections: {
        sections: ["player", "settings"],
        sectionTitles: ["Player", "Settings"],
      },
    };
  } else if (category === "purchasesRefunds") {
    categoryContent = {
      categoryTitle: "Purchases / Refunds",
      categorySections: {
        sections: ["purchasing", "promotions", "refunds"],
        sectionTitles: ["Purchasing", "Promotions", "Refunds"],
      },
    };
  }

  const categoryArticlesResponse = await IndexAPI.get(
    `/admin/help/${category}`
  );

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
