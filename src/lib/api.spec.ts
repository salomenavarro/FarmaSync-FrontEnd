import { describe, expect, it } from "vitest";
import { apiClient } from "./api";

describe("api boundary", () => {
  it("exposes the central Axios client", () => {
    expect(apiClient.defaults.baseURL).toBe("/api/v1");
  });
});
