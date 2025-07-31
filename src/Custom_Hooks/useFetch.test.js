/* eslint-disable no-unused-vars */
import { renderHook, waitFor } from "@testing-library/react";
import {
  describe,
  it,
  expect,
  afterEach,
  afterAll,
  beforeAll,
  vi,
} from "vitest";
import { server } from "../mocks/server";
import { http, HttpResponse } from "msw";

import useFetch from "./useFetch";

describe("useFetch", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should return initial loading state", () => {
    const { result } = renderHook(() => useFetch("http://test.com/data"));
    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it("should fetch data successfully", async () => {
    const { result } = renderHook(() => useFetch("http://test.com/data"));
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toEqual({ message: "Success!" });
      expect(result.current.error).toBeNull();
    });
  });

  it("should handle fetch error", async () => {
    const { result } = renderHook(() => useFetch("http://test.com/error"));
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toBeNull();
      expect(result.current.error).toBeInstanceOf(Error);
      expect(result.current.error.message).toContain("HTTP error! status: 500");
    });
  });

  it("should abort fetch on unmount", async () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const { result, unmount } = renderHook(() =>
      useFetch("http://test.com/delayed-data")
    );
    expect(result.current.loading).toBe(true);
    unmount();
    await new Promise((resolve) => setTimeout(resolve, 10));
    expect(consoleSpy).toHaveBeenCalledWith("Fetch aborted");
    consoleSpy.mockRestore();
  });
});
