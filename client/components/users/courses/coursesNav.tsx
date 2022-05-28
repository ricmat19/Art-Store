import { Grid } from "@mui/material";
import Link from "next/link";

//Cart Products props interface
interface ICoursesNav {
  courses: string[];
}

//Course navigation menu functional component
const CoursesNav = (props: ICoursesNav) => {

  //Loops through the list of course subjects and maps their titles to a next Link component
  const coursePageLinks = props.courses.map((course: string) => {
    return (
      // routes the the specified course subject page
      <Link passHref key={course} href={`/courses/${course}`}>
        <h1 className="main-title pointer">{course}</h1>
      </Link>
    );
  });

  //Course Navigation component
  return (
    // Displays the list of course subjects as navigation links
    <Grid container sx={{ justifyContent: "center", gap: "25px", mt: "10px" }}>
      {coursePageLinks}
    </Grid>
  );
};

export default CoursesNav;
