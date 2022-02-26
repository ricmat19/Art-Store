import { useState } from "react";
import { Grid } from "@mui/material";
import Link from "next/link";

const AdminCoursesNav = (props: any) => {
  const [courses] = useState(props.courses);

  const courseTypes: any[] = [];
  for (let i = 0; i < courses.length; i++) {
    if (!courseTypes.includes(courses[i].subject)) {
      courseTypes.push(courses[i].subject);
    }
  }

  const coursePageLinks = courseTypes.map((course: any) => {
    return (
      <Link passHref key={course} href={`/admin/products/${course}`}>
        <h1 className="main-title pointer">{course}s</h1>
      </Link>
    );
  });

  return (
    <Grid container sx={{ justifyContent: "center", gap: "25px", mt: "10px" }}>
      {coursePageLinks}
    </Grid>
  );
};

export default AdminCoursesNav;
