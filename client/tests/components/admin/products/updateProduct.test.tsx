import { render, screen, waitFor } from "@testing-library/react";
import AdminUpdateProduct from "../../../../components/admin/products/updateProductModal";

describe("testing admin update product component", () => {
  beforeEach(async () => {<AdminUpdateProduct
    updateProduct={{
      title: "",
      product: "",
      price: "",
      info: "",
      image_url: "",
      qty: "",
    }}
    open={undefined}
    handleClose={undefined}
  />;});
  test("", () => {});
});
