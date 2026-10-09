import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "./button";

describe("Button", () => {
  it("renders an accessible button", () => {
    render(<Button>Continuar</Button>);

    expect(screen.getByRole("button", { name: "Continuar" })).toBeTruthy();
  });

  it("renders an anchor through asChild", () => {
    render(<Button asChild><a href="/login">Login</a></Button>);

    expect(screen.getByRole("link", { name: "Login" })).toBeTruthy();
  });
});
