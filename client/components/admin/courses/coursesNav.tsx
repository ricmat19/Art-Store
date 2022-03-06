import { Grid } from "@mui/material";
import { useState } from "react";
import Link from "next/link";

const AdminCoursesNav = (props: any) => {
  const [activeSubjects] = useState(props.activeSubjects);

  let subjectPageLinks;
  if (activeSubjects !== undefined) {
    subjectPageLinks = activeSubjects.map((subject: any) => {
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
