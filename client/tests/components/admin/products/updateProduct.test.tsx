import { render, screen, waitFor } from "@testing-library/react";
import AdminUpdateProduct from "../../../../components/admin/products/updateProduct";

describe("testing admin update product component", () => {
  beforeEach(async () => {<AdminUpdateProduct updateProduct={{
    title: "",
    product: "",
    price: "",
    info: "",
    imagekey: "",
    imageBuffer: "",
    qty: ""
  }} open={undefined} handleClose={undefined}/>});
  test("", () => {});
});
