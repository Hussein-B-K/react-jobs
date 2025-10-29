import { useEffect, useState, useRef } from "react";
import { supabase } from "../services/supabase-client";

/**
 * @description A custom hook that fetches data from a specified Supabase table
 * with optional limiting of results.
 * to abort the fetch request when the component unmounts.
 * @param {string} tableName - The URL to fetch data from.
 * for the `useEffect` hook, meaning the fetch will re-run if the URL changes.
 * * @param {number | undefined} [limit] - Optional: the maximum number of rows to return.
 * @returns {object} An object containing the fetch state and data.
 * @returns {data} - The fetched data, initially `null`.
 * @returns {laoding} A boolean indicating whether the fetch
 * request is currently in progress (true) or has completed (false).
 * @returns {error} Any error that occurred during the fetch,
 * or `null` if the fetch was successful.
 */

const useFetch =<T> (tableName:string, limit?: number): {data: T | null, loading:boolean, error: Error | null} => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const isMounted = useRef(true)
  useEffect(() => {

    isMounted.current = true;

    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        let tabel = supabase.from(tableName).select().order('created_at', { ascending: false });;
        if (limit !== undefined) {
          tabel = tabel.limit(limit)
        }
      const {data:fetchedData, error: fetchedError} = await tabel;
      
      if(fetchedError) {
        throw new Error(fetchedError.message)
      }

      if (isMounted.current) {
        setData(fetchedData as T)
      }
      } catch (e) {
        const error = e as Error
        if (isMounted.current) {
          setError(error)
          setData(null)
        }
        console.error("Fetch failed:", error.message);
      } finally {
        if(isMounted.current) {
          setLoading(false);
        }
      }
    };
    fetchData();

    return () => {
      isMounted.current = false;
    }

  }, [tableName, limit]);

  return { data, loading, error };
};

export default useFetch;
