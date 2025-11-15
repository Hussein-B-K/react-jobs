import { supabase } from "./supabase-client";

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
   const {data, error} = await supabase.from("jobs-dev").insert(newJob).select().single()

   if(error) {
    throw new Error(`Failed to add job: ${error.message}`)
   }
   return data as ResponseData
  } catch (error) {
    console.error("Failed to add job:", error);
    throw error;
  }
};

// DELETE JOB
export const deleteJob = async (id: string): Promise<void> => {
  const {error} = await supabase
  .from("jobs-dev")
  .delete()
  .eq("id", id)
  .select()
  if (error) {
     throw new Error("Failed to delete job:" + error.message);
  }
};

// EDIT JOB
export const updateJob = async (job:ResponseData) => {
  const {data,error} = await supabase
  .from("jobs-dev")
  .update(job)
  .eq("id", job.id)
  .select()
  .single()
  if (error) {
     throw new Error("Failed to edit job:" + error.message);
  }
  return data
};