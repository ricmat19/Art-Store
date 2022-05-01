import { useRouter } from "next/router";
import { Grid } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faChalkboardTeacher,
  faStoreAlt,
  faTv,
} from "@fortawesome/free-solid-svg-icons";

const PagesNav = () => {
  const router = useRouter();

  async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      console.log("reset");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header>
      <nav>
        <Grid container sx={{ pt: "5px", pb: "5px", justifyContent: "center" }}>
          <Grid
            container
            xs={3}
            sx={{ justifyContent: "center", display: "grid" }}
          >
            <Grid
              onClick={() => router.push("/products/print")}
              className="pointer"
            >
              <Grid sx={{ textAlign: "center", alignSelf: "center", m: "5px" }}>
                <FontAwesomeIcon icon={faStoreAlt} />
              </Grid>
              <Grid sx={{ textAlign: "center", alignSelf: "center" }}>
                <Grid className="nav-link">
                  <h1>store</h1>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            xs={3}
            sx={{ justifyContent: "center", display: "grid" }}
          >
            <Grid
              onClick={() => router.push("/courses/drawing")}
              className="pointer"
            >
              <Grid sx={{ textAlign: "center", alignSelf: "center", m: "5px" }}>
                <FontAwesomeIcon icon={faChalkboardTeacher} />
              </Grid>
              <Grid sx={{ textAlign: "center", alignSelf: "center" }}>
                <Grid className="nav-link">
                  <h1>courses</h1>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            xs={3}
            sx={{ justifyContent: "center", display: "grid" }}
          >
            <Grid
              onClick={() => router.push("/media/blog")}
              className="pointer"
            >
              <Grid sx={{ textAlign: "center", alignSelf: "center", m: "5px" }}>
                <FontAwesomeIcon icon={faTv} />
              </Grid>
              <Grid className="nav-link">
                <h1>media</h1>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            xs={3}
            sx={{ justifyContent: "center", display: "grid" }}
          >
            <Grid onClick={() => router.push("/events")} className="pointer">
              <Grid sx={{ textAlign: "center", alignSelf: "center", m: "5px" }}>
                <FontAwesomeIcon icon={faCalendarCheck} />
              </Grid>
              <Grid className="nav-link">
                <h1>events</h1>
              </Grid>
            </Grid>
          </Grid>
          {/* <Grid container xs={2} sx={{justifyContent: "center"}}>
            <Grid sx={{textAlign: 'center', alignSelf: "center", m: "5px"}}>
              <FontAwesomeIcon icon={faComments} />
            </Grid>
            <Grid sx={{textAlign: 'center', alignSelf: "center"}}>
              <a href="/threads">
                <h1 className="pointer">community</h1>
              </a>
            </Grid>
          </Grid> */}
        </Grid>
      </nav>
      <hr />
    </header>
  );
};

export default PagesNav;
