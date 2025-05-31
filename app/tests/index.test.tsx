import { render, screen} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import {
  useSearchParams
} from "@remix-run/react";

import Index from "../routes/_index";

describe("Index Component", () => {
  it("should render the Inbox title by default", () => {
    render(
      <MemoryRouter>
        <Index />
      </MemoryRouter>
    );
    expect(screen.getByRole("heading", { name: /Inbox/i })).toBeInTheDocument();
  });

  it("should render Trash title if deleted is true", () => {
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams("deleted=true"),
      vi.fn()
    ]);

    render(
      <MemoryRouter>
        <Index />
      </MemoryRouter>
    );
    expect(screen.getByRole("heading", { name: /Trash/i })).toBeInTheDocument();
  });

  it("should render both All mail and Unread tabs", () => {
    render(
      <MemoryRouter>
        <Index />
      </MemoryRouter>
    );
    expect(screen.getByRole("tab", { name: /All mail/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /Unread/i })).toBeInTheDocument();
  });
});
