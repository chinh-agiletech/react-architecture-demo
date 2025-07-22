import { useState, useEffect, useCallback } from 'react';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

interface UseFetchOptions {
  headers?: HeadersInit;
  skip?: boolean;
}

/**
 * Hook for fetching data from an API
 * @param url URL to fetch data from
 * @param options Additional options for the fetch request
 * @returns Object containing loading state, data, error, and refetch function
 */
const useFetch = <T>(url: string, options: UseFetchOptions = {}) => {
  const { headers = {}, skip = false } = options;
  
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: !skip,
    error: null,
  });

  const fetchData = useCallback(async () => {
    if (skip) return;
    
    setState(prev => ({ ...prev, loading: true }));
    
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();
      setState({ data, loading: false, error: null });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error : new Error('Unknown error occurred'),
      });
    }
  }, [url, headers, skip]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return {
    ...state,
    refetch,
  };
};

export default useFetch;
