/* eslint-disable no-unused-vars */

// ADD JOB
export const addJob = async (newJob) => {
  const res = await fetch("/api/jobs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newJob),
  });
};

//  DELETE JOB

export const deleteJob = async (id) => {
  const res = await fetch("/api/jobs/" + id, {
    method: "DELETE",
  });
};

//  EDIT JOB

export const updateJob = async (job) => {
  const res = await fetch("/api/jobs/" + job.id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(job),
  });
};
