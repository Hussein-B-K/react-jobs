import { describe, it, expect, vi, beforeEach } from "vitest";
import { addJob, deleteJob, updateJob } from "./api";
import { supabase } from "./supabase-client";

// Mock Supabase client
vi.mock("./supabase-client", () => ({
  supabase: {
    from: vi.fn(),
  },
}));

const mockFrom = () => {
  const select = vi.fn().mockReturnThis();
  const single = vi.fn().mockReturnThis();
  const insert = vi.fn().mockReturnThis();
  const update = vi.fn().mockReturnThis();
  const deleteFn = vi.fn().mockReturnThis();
  const eq = vi.fn().mockReturnThis();

  return { select, single, insert, update, delete: deleteFn, eq };
};

describe("Job API Service (Supabase)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("addJob", () => {
    it("should add a new job successfully", async () => {
      const job = {
        type: "Full-Time",
        title: "Software Engineer",
        description: "Develop amazing software.",
        salary: "$100K - 125K",
        location: "San Francisco, CA",
        company: {
          name: "Tech Solutions",
          description: "A leading tech company.",
          contactEmail: "contact@techsolutions.com",
          contactPhone: "111-222-3333",
        },
      };

      const fromMock = mockFrom();
      (supabase.from as any).mockReturnValue(fromMock);

      fromMock.insert.mockReturnValue({
        select: vi.fn().mockReturnValue({
          single: vi.fn().mockResolvedValue({
            data: { id: "123", ...job },
            error: null,
          }),
        }),
      });

      const result = await addJob(job);

      expect(supabase.from).toHaveBeenCalledWith("jobs");
      expect(result).toEqual({ id: "123", ...job });
    });

    it("should throw error if supabase returns an error", async () => {
      const job = {
        type: "Full-Time",
        title: "Software Engineer",
        description: "Develop amazing software.",
        salary: "$100K - 125K",
        location: "SF",
        company: {
          name: "Tech Solutions",
          description: "A leading tech company.",
          contactEmail: "contact@techsolutions.com",
          contactPhone: "111-222-3333",
        },
      };

      const fromMock = mockFrom();
      (supabase.from as any).mockReturnValue(fromMock);

      fromMock.insert.mockReturnValue({
        select: vi.fn().mockReturnValue({
          single: vi.fn().mockResolvedValue({
            data: null,
            error: { message: "Insert failed" },
          }),
        }),
      });

      await expect(addJob(job)).rejects.toThrow("Failed to add job: Insert failed");
    });
  });

  describe("deleteJob", () => {
    it("should delete job successfully", async () => {
      const fromMock = mockFrom();
      (supabase.from as any).mockReturnValue(fromMock);

      fromMock.delete.mockReturnValue({
        eq: vi.fn().mockReturnValue({
          select: vi.fn().mockResolvedValue({ error: null }),
        }),
      });

      await expect(deleteJob("123")).resolves.not.toThrow();
      expect(supabase.from).toHaveBeenCalledWith("jobs");
    });

    it("should throw if delete fails", async () => {
      const fromMock = mockFrom();
      (supabase.from as any).mockReturnValue(fromMock);

      fromMock.delete.mockReturnValue({
        eq: vi.fn().mockReturnValue({
          select: vi.fn().mockResolvedValue({
            error: { message: "Delete failed" },
          }),
        }),
      });

      await expect(deleteJob("123")).rejects.toThrow("Failed to delete job:Delete failed");
    });
  });

  describe("updateJob", () => {
    it("should update job successfully (returns single object)", async () => {
      const job = {
        id: "1",
        title: "Senior Engineer",
        type: "Full-Time",
        location: "Remote",
        description: "Updated description",
        salary: "$150K",
        company: {
          name: "Tech Solutions",
          description: "A leading tech company.",
          contactEmail: "contact@techsolutions.com",
          contactPhone: "111-222-3333",
        },
      };

      const fromMock = mockFrom();
      (supabase.from as any).mockReturnValue(fromMock);

      fromMock.update.mockReturnValue({
        eq: vi.fn().mockReturnValue({
          select: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({
              data: job,
              error: null,
            }),
          }),
        }),
      });

      const result = await updateJob(job);
      expect(result).toEqual(job);
      expect(supabase.from).toHaveBeenCalledWith("jobs");
    });

    it("should throw error if update fails", async () => {
      const job = {
        id: "1",
        title: "Senior Engineer",
        type: "Full-Time",
        location: "Remote",
        description: "Updated description",
        salary: "$150K",
        company: {
          name: "Tech Solutions",
          description: "A leading tech company.",
          contactEmail: "contact@techsolutions.com",
          contactPhone: "111-222-3333",
        },
      };

      const fromMock = mockFrom();
      (supabase.from as any).mockReturnValue(fromMock);

      fromMock.update.mockReturnValue({
        eq: vi.fn().mockReturnValue({
          select: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({
              data: null,
              error: { message: "Update failed" },
            }),
          }),
        }),
      });

      await expect(updateJob(job)).rejects.toThrow("Failed to edit job:Update failed");
    });
  });
});
