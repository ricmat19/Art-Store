import { render, screen, waitFor } from "@testing-library/react";
import AdminUpdateEvent from "../../../../components/admin/events/updateEvent";

describe("testing admin update event component", () => {
  beforeEach(async () => {
    <AdminUpdateEvent
      selectedEvent={{
        id: "",
      }}
    />;
  });
  test("", () => {});
});
