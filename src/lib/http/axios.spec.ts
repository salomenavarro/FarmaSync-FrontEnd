import { describe, expect, it } from "vitest";
import { apiClient } from "./axios";

describe("apiClient", () => {
  it("uses the versioned local API as its default base URL", () => {
    expect(apiClient.defaults.baseURL).toBe("/api/v1");
    expect(apiClient.defaults.withCredentials).toBe(true);
  });
});
