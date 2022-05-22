import { render, screen, waitFor } from "@testing-library/react";
import AdminCalendar from "../../../../components/admin/events/calendar";

describe("testing admin calendar component", () => {
  beforeEach(async () => {
    <AdminCalendar
      events={""}
      handleDayOpen={function (): void {
        throw new Error("Function not implemented.");
      }}
      setDate={function (arg0: string): void {
        throw new Error("Function not implemented.");
      }}
      setDateEvents={function (arg0: any[]): void {
        throw new Error("Function not implemented.");
      }}
    />;
  });
  test("", () => {});
});
