import { Grid } from "@mui/material";
import Link from "next/link";

const CoursesNav = (props: any) => {

  const coursePageLinks = props.courses.map((course: any) => {
    return (
      <Link passHref key={course} href={`/courses/${course}`}>
        <h1 className="main-title pointer">{course}</h1>
      </Link>
    );
  });

  return (
    <Grid container sx={{ justifyContent: "center", gap: "25px", mt: "10px" }}>
      {coursePageLinks}
    </Grid>
  );
};

export default CoursesNav;
