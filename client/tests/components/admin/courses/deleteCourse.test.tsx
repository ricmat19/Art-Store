import { render, screen, waitFor } from "@testing-library/react";
import AdminDeleteCourse from "../../../../components/admin/courses/deleteCourseModal";

describe("testing admin delete course component", () => {
  beforeEach(async () => {<AdminDeleteCourse deleteCourse={{
    id: "",
    title: undefined
  }} open={undefined} handleClose={undefined}/>});
  test("", () => {});
});
