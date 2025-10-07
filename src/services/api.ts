const handleResponse = async <T>(response:Response): Promise<T> => {
  // primarly for error handling
  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "Unknown error" }));
    throw new Error(
      `HTTP error! status: ${response.status}, message: ${
        errorData.message || response.statusText
      }`
    );
  }
  return response.json() as Promise<T>;
};

interface CompanyData {
  name: string,
  description: string,
  contactEmail: string,
  contactPhone: string,
}

interface ResponseData {
  id: string,
  title: string,
  type: string,
  location: string,
  description: string,
  salary: string,
  company: CompanyData,
}

type NewJobReq = Omit<ResponseData, "id">

export const addJob = async (newJob: NewJobReq): Promise<ResponseData> => {
  try {
    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newJob),
    });
    return await handleResponse<ResponseData>(res);
  } catch (error) {
    console.error("Failed to add job:", error);
    throw error;
  }
};

// DELETE JOB
export const deleteJob = async (id: string): Promise<void> => {
  try {
    const res = await fetch("/api/jobs/" + id, {
      method: "DELETE",
    });
    return await handleResponse(res);
  } catch (error) {
    console.error("Failed to delete job:", error);
    throw error;
  }
};

// EDIT JOB
export const updateJob = async (job:ResponseData): Promise<ResponseData> => {
  try {
    const res = await fetch("/api/jobs/" + job.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(job),
    });
    return await handleResponse<ResponseData>(res);
  } catch (error) {
    console.error("Failed to update job:", error);
    throw error;
  }
};
