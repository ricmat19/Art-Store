import { useState } from "react";
import { Grid } from '@mui/material';
import Link from "next/link";

const CoursesNav = (props: any) => {

  const [courses] = useState(props.courses);

  const courseTypes: any[] = [];
  for (let i = 0; i < courses.length; i++) {
    if (!courseTypes.includes(courses[i].subject)) {
      courseTypes.push(courses[i].subject);
    }
  }

  const coursePageLinks = courseTypes.map((course: any) => {
    return (
      <Link
        passHref
        key={course}
        href={`/products/${course}`}
      >
        <h1>{course}s</h1>
      </Link>
    );
  });

  return (
    <Grid container sx={{justifyContent: "center", gap: "25px", mt: "10px"}}>
        {/* <a href="/courses/drawing">
          <h1>drawing</h1>
        </a>
        <a href="/courses/painting">
          <h1>painting</h1>
        </a>
        <a href="/courses/sculpting">
          <h1>sculpting</h1>
        </a>
        <a href="/courses/writing">
          <h1>writing</h1>
        </a> */}
        {coursePageLinks}
    </Grid>
  );
};

export default CoursesNav;
