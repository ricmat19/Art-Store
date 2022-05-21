import { Grid } from "@mui/material";
import Link from "next/link";

interface ICoursesNav {
  courses: string[];
}

const CoursesNav = (props: ICoursesNav) => {
  const coursePageLinks = props.courses.map((course: string) => {
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
