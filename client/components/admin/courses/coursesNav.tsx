import { Grid } from "@mui/material";
import Link from "next/link";

//Admin course navigation prop interface
interface IAdminCoursesNav {
  activeCourses: string[] | undefined;
}

//Admin course navigation functional component
const AdminCoursesNav = (props: IAdminCoursesNav) => {
  //Creates a course navigation link for each existing course subject
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

  //Admin course navigation component
  return (
    // Maps out the list of course subjects as navigation links
    <Grid container sx={{ justifyContent: "center", gap: "25px", mt: "10px" }}>
      {subjectPageLinks}
    </Grid>
  );
};

export default AdminCoursesNav;
