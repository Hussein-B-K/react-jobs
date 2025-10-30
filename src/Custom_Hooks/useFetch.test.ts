/* eslint-disable no-unused-vars */
import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import { supabase } from "../services/supabase-client";
import useFetch from "./useFetch";

vi.mock("../services/supabase-client", () => {
  const fromMock = vi.fn();
  return { supabase: { from: fromMock } };
});

describe("useFetch", () => {
  const mockFrom = supabase.from as Mock;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return initial loading state", () => {
    mockFrom.mockReturnValue({
      select: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis(),
      limit: vi.fn().mockReturnThis(),
      then: vi.fn(),
    });

    const { result } = renderHook(() => useFetch("test_table"));

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it("should fetch data successfully and call Supabase chain correctly", async () => {
    const mockSelect = vi.fn().mockReturnThis();
    const mockOrder = vi.fn().mockReturnThis();
    const mockLimit = vi.fn().mockReturnThis();

    mockFrom.mockReturnValue({
      select: mockSelect,
      order: mockOrder,
      limit: mockLimit,
      then: (resolve: any) => resolve({ data: [{ id: 1, name: "name" }], error: null }),
    });

    const { result } = renderHook(() =>
      useFetch<{ id: number; name: string }[]>("table")
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toEqual([{ id: 1, name: "name" }]);
      expect(result.current.error).toBeNull();
    });

    expect(mockFrom).toHaveBeenCalledWith("table");
    expect(mockSelect).toHaveBeenCalled();
    expect(mockOrder).toHaveBeenCalledWith("created_at", { ascending: false });
    expect(mockLimit).not.toHaveBeenCalled(); // since no limit param passed
  });

  it("should call .limit() when a limit value is provided", async () => {
    const mockSelect = vi.fn().mockReturnThis();
    const mockOrder = vi.fn().mockReturnThis();
    const mockLimit = vi.fn().mockReturnThis();

    mockFrom.mockReturnValue({
      select: mockSelect,
      order: mockOrder,
      limit: mockLimit,
      then: (resolve: any) => resolve({ data: [], error: null }),
    });

    renderHook(() => useFetch("jobs", 5));

    await waitFor(() => {
      expect(mockFrom).toHaveBeenCalledWith("jobs");
      expect(mockSelect).toHaveBeenCalled();
      expect(mockOrder).toHaveBeenCalledWith("created_at", { ascending: false });
      expect(mockLimit).toHaveBeenCalledWith(5);
    });
  });

  it("should handle fetch error and log correctly", async () => {
    const mockSelect = vi.fn().mockReturnThis();
    const mockOrder = vi.fn().mockReturnThis();
    const mockLimit = vi.fn().mockReturnThis();
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    mockFrom.mockReturnValue({
      select: mockSelect,
      order: mockOrder,
      limit: mockLimit,
      // since we are testing what`s being represented which is a promise and not testing the actual database interaction
      then: (resolve: any) => resolve({ data: null, error: { message: "Database error" } }),
    });

    const { result } = renderHook(() => useFetch("test_table"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toBeNull();
      expect(result.current.error).toBeInstanceOf(Error);
      expect(result.current.error?.message).toContain("Database error");
    });

    expect(mockFrom).toHaveBeenCalledWith("test_table");
    expect(mockSelect).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith("Fetch failed:", "Database error");

    consoleSpy.mockRestore();
  });

  it("should not update state after unmount", async () => {
    const mockSelect = vi.fn().mockReturnThis();
    const mockOrder = vi.fn().mockReturnThis();
    const mockLimit = vi.fn().mockReturnThis();

    mockFrom.mockReturnValue({
      select: mockSelect,
      order: mockOrder,
      limit: mockLimit,
      then: (resolve: any) =>
        setTimeout(() => resolve({ data: [{ id: 1 }], error: null }), 20),
    });

    const { unmount } = renderHook(() => useFetch("test_table"));
    unmount();

    await new Promise((r) => setTimeout(r, 40));

    // should have called Supabase, but not updated React state
    expect(mockFrom).toHaveBeenCalledWith("test_table");
  });
});
