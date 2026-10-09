import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FeaturePlaceholder } from "./feature-placeholder";

describe("FeaturePlaceholder", () => {
  it("communicates the feature state", () => {
    render(<FeaturePlaceholder title="Medicamentos" description="Pendiente" />);

    expect(screen.getByRole("heading", { name: "Medicamentos" })).toBeTruthy();
    expect(screen.getByText("Pendiente")).toBeTruthy();
  });
});
