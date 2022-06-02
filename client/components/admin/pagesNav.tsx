import { FC } from "react";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faChalkboardTeacher,
  faStoreAlt,
  faTv,
} from "@fortawesome/free-solid-svg-icons";

//Admin pages navigation function component
const AdminPagesNav: FC = () => {
  //Next router function
  const router = useRouter();

  //Admin pages navigation menu
  return (
    <header>
      <nav>
        {/* <input type="checkbox" id="nav-toggle" className="nav-toggle" /> */}
        <Grid container sx={{ pt: "5px", pb: "5px", justifyContent: "center" }}>
          {/* Admin store navigation button */}
          <Grid container xs={3} sx={{ justifyContent: "center" }}>
            <Grid sx={{ textAlign: "center", alignSelf: "center", m: "5px" }}>
              <FontAwesomeIcon icon={faStoreAlt} />
            </Grid>
            <Grid sx={{ textAlign: "center", alignSelf: "center" }}>
              <Grid
                className="nav-link"
                onClick={() => router.push("/admin/products/print")}
              >
                <h1 className="pointer">store</h1>
              </Grid>
            </Grid>
          </Grid>
          {/* Admin course navigation button */}
          <Grid container xs={3} sx={{ justifyContent: "center" }}>
            <Grid sx={{ textAlign: "center", alignSelf: "center", m: "5px" }}>
              <FontAwesomeIcon icon={faChalkboardTeacher} />
            </Grid>
            <Grid sx={{ textAlign: "center", alignSelf: "center" }}>
              <Grid
                className="nav-link"
                onClick={() => router.push("/admin/courses/drawing")}
              >
                <h1 className="pointer">courses</h1>
              </Grid>
            </Grid>
          </Grid>
          {/* Admin media navigation button */}
          <Grid container xs={3} sx={{ justifyContent: "center" }}>
            <Grid sx={{ textAlign: "center", alignSelf: "center", m: "5px" }}>
              <FontAwesomeIcon icon={faTv} />
            </Grid>
            <Grid
              className="nav-link"
              onClick={() => router.push("/admin/media/blog")}
            >
              <h1 className="pointer">media</h1>
            </Grid>
          </Grid>
          {/* Admin calendar navigation button */}
          <Grid container xs={3} sx={{ justifyContent: "center" }}>
            <Grid sx={{ textAlign: "center", alignSelf: "center", m: "5px" }}>
              <FontAwesomeIcon icon={faCalendarCheck} />
            </Grid>
            <Grid
              className="nav-link"
              onClick={() => router.push("/admin/events")}
            >
              <h1 className="pointer">events</h1>
            </Grid>
          </Grid>
          {/* Admin community navigation button */}
          {/* <Grid container xs={2} sx={{justifyContent: "center"}}>
            <Grid sx={{textAlign: 'center', alignSelf: "center", m: "5px"}}>
              <FontAwesomeIcon icon={faComments} />
            </Grid>
            <Grid sx={{textAlign: 'center', alignSelf: "center"}}>
              <a href="/admin/community">
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

export default AdminPagesNav;
