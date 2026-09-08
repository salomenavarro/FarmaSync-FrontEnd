import { describe, expect, it } from "vitest";
import { useUiStore } from "./ui.store";

describe("useUiStore", () => {
  it("toggles the sidebar state", () => {
    useUiStore.setState({ sidebarOpen: true });

    useUiStore.getState().toggleSidebar();

    expect(useUiStore.getState().sidebarOpen).toBe(false);
  });
});
