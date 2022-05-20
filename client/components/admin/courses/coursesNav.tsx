import { Grid } from "@mui/material";
import Link from "next/link";

const AdminCoursesNav = (props: any) => {

  let subjectPageLinks;
  if (props.activeCourses !== undefined) {
    subjectPageLinks = props.activeCourses.map((subject: string) => {
      return (
        <Link passHref key={subject} href={`/admin/courses/${subject}`}>
          <h1 className="main-title pointer">{subject}</h1>
        </Link>
      );
    });
  } else {
    return <Grid></Grid>;
  }

  return (
    <Grid container sx={{ justifyContent: "center", gap: "25px", mt: "10px" }}>
      {subjectPageLinks}
    </Grid>
  );
};

export default AdminCoursesNav;
