import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

import { addJob, deleteJob, updateJob } from "./api";

beforeEach(() => {
  vi.spyOn(globalThis, "fetch");
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("Job API Service", () => {
  describe("addJob", () => {
    it("should add a new job successfully", async () => {
      const newJob = {
        title: "Software Engineer",
        company: "Tech Solutions",
        location: "Remote",
      };

      globalThis.fetch.mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({ message: "Job added successfully", id: 1 }),
        status: 201,
        statusText: "Created",
      });

      await addJob(newJob);

      expect(globalThis.fetch).toHaveBeenCalledTimes(1);

      expect(globalThis.fetch).toHaveBeenCalledWith("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newJob),
      });
    });

    it("should handle network errors when adding a job", async () => {
      globalThis.fetch.mockRejectedValueOnce(
        new Error("Network connection lost")
      );

      await expect(addJob({})).rejects.toThrow("Network connection lost");

      expect(globalThis.fetch).toHaveBeenCalledTimes(1);
    });

    it("should handle HTTP error responses when adding a job (e.g., 400 Bad Request)", async () => {
      globalThis.fetch.mockResolvedValueOnce({
        ok: false,
        json: () => Promise.resolve({ message: "Invalid job data" }),
        status: 400,
        statusText: "Bad Request",
      });

      await expect(addJob({})).rejects.toThrow(
        "HTTP error! status: 400, message: Invalid job data"
      );

      expect(globalThis.fetch).toHaveBeenCalledTimes(1);
    });
  });

  describe("deleteJob", () => {
    it("should delete a job successfully", async () => {
      const jobId = "123";

      globalThis.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ message: "Job deleted" }),
        status: 200,
        statusText: "OK",
      });

      await deleteJob(jobId);

      expect(globalThis.fetch).toHaveBeenCalledTimes(1);
      expect(globalThis.fetch).toHaveBeenCalledWith(`/api/jobs/${jobId}`, {
        method: "DELETE",
      });
    });
  });

  describe("updateJob", () => {
    it("should update an existing job successfully", async () => {
      const updatedJob = {
        id: "456",
        title: "Senior Software Engineer",
        company: "Updated Tech Solutions",
      };

      globalThis.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ message: "Job updated successfully" }),
        status: 200,
        statusText: "OK",
      });

      await updateJob(updatedJob);

      expect(globalThis.fetch).toHaveBeenCalledTimes(1);
      expect(globalThis.fetch).toHaveBeenCalledWith(
        `/api/jobs/${updatedJob.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedJob),
        }
      );
    });

    it("should handle error when updating a non-existent job", async () => {
      const updatedJob = {
        id: "nonExistentId",
        title: "Senior Software Engineer",
      };

      globalThis.fetch.mockResolvedValueOnce({
        ok: false,
        json: () => Promise.resolve({ message: "Job not found for update" }),
        status: 404,
        statusText: "Not Found",
      });

      await expect(updateJob(updatedJob)).rejects.toThrow(
        "HTTP error! status: 404, message: Job not found for update"
      );
      expect(globalThis.fetch).toHaveBeenCalledTimes(1);
    });
  });
});
