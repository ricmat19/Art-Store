import { render, screen, waitFor } from "@testing-library/react";
import AdminDeleteCourse from "../../../../components/admin/courses/deleteCourse";

describe("testing admin delete course component", () => {
  beforeEach(async () => {<AdminDeleteCourse deleteCourse={{
    id: "",
    imageBuffer: undefined,
    title: undefined
  }} open={undefined} handleClose={undefined}/>});
  test("", () => {});
});
