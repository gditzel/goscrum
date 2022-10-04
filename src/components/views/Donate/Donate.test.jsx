import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Donate from "./Donate";

describe("renderizado en Donate", () => {
  it("renderiza un h1", () => {
    render(<Donate />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Colaborá con el proyecto",
      })
    ).toBeInTheDocument();
  });

  it("renderiza un a con href", () => {
    render(<Donate />);

    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "https://mpago.la/1v2931B"
    );
  });

  it("renderiza un a con target _blank", () => {
    render(<Donate />);

    expect(screen.getByRole("link")).toHaveAttribute("target", "_blank");
  });
});
