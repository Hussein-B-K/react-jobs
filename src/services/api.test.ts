import { describe, it, expect,type Mock, vi, beforeEach, afterEach } from "vitest";

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
    id: "1",
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

      (globalThis.fetch as Mock).mockResolvedValueOnce({
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
      (globalThis.fetch as Mock).mockRejectedValueOnce(
        new Error("Network connection lost")
      );

      await expect(addJob({
        location: "",
        title: "",
        type: "",
        description: "",
        salary: "",
        company: {
          name: '',
             description: '',
             contactEmail: '',
             contactPhone: '',
        }
      })).rejects.toThrow("Network connection lost");

      expect(globalThis.fetch).toHaveBeenCalledTimes(1);
    });

    it("should handle HTTP error responses when adding a job (e.g., 400 Bad Request)", async () => {
      (globalThis.fetch as Mock).mockResolvedValueOnce({
        ok: false,
        json: () => Promise.resolve({ message: "Invalid job data" }),
        status: 400,
        statusText: "Bad Request",
      });

      await expect(addJob({    
        location: "",
        title: "",
        type: "",
        description: "",
        salary: "",
        company: {
          name: '',
             description: '',
             contactEmail: '',
             contactPhone: '',
        }})).rejects.toThrow(
        "HTTP error! status: 400, message: Invalid job data"
      );

      expect(globalThis.fetch).toHaveBeenCalledTimes(1);
    });
  });

  describe("deleteJob", () => {
    it("should delete a job successfully", async () => {
      const jobId = "123";

      (globalThis.fetch as Mock).mockResolvedValueOnce({
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
        type: "Full-Time",
        location: "Remote",
        description: "Test description for update.",
        salary: "$150K+",
        company: {
            name: 'Tech Solutions',
             description: 'A leading tech company.',
             contactEmail: 'contact@techsolutions.com',
             contactPhone: '111-222-3333',
        }
      };

      (globalThis.fetch as Mock).mockResolvedValueOnce({
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
        id: "456",
        title: "Senior Software Engineer",
        type: "Full-Time",
        location: "Remote",
        description: "Test description for update.",
        salary: "$150K+",
        company: {
            name: 'Tech Solutions',
             description: 'A leading tech company.',
             contactEmail: 'contact@techsolutions.com',
             contactPhone: '111-222-3333',
        }};

      (globalThis.fetch as Mock).mockResolvedValueOnce({
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
