import { render, screen, waitFor } from "@testing-library/react";
import AdminEvents from "../../../../components/admin/events/events";

describe("testing admin events component", () => {
  beforeEach(async () => {<AdminEvents setSelectedEvent={function (arg0: any): void {
    throw new Error("Function not implemented.");
  } } setView={function (arg0: string): void {
    throw new Error("Function not implemented.");
  } } dateEvents={undefined} displayDeleteModal={function (arg0: any): void {
    throw new Error("Function not implemented.");
  } }/>});
  test("", () => {});
});
