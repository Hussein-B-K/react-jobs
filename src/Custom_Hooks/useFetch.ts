import { useEffect, useState } from "react";

/**
 * @description A custom hook that fetches data from a specified URL.
 * It manages the loading, error, and data states, and provides a mechanism
 * to abort the fetch request when the component unmounts.
 * @param {string} url - The URL to fetch data from. This is a dependency
 * for the `useEffect` hook, meaning the fetch will re-run if the URL changes.
 * @returns {object} An object containing the fetch state and data.
 * @returns {data} - The fetched data, initially `null`.
 * @returns {laoding} A boolean indicating whether the fetch
 * request is currently in progress (true) or has completed (false).
 * @returns {error} Any error that occurred during the fetch,
 * or `null` if the fetch was successful.
 */

const useFetch =<T> (url:string): {data: T | null, loading:boolean, error: Error | null} => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      try {
        let resp = await fetch(url, { signal: abortController.signal });
        if (!resp.ok) {
          throw new Error(`HTTP error! status: ${resp.status}`);
        } else {
          let data = await resp.json();
          setData(data);
        }
      } catch (e) {
        const error = e as Error
        if (error.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          setError(error);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    return () => {
      abortController.abort();
    };
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
