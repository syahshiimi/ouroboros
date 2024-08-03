import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";

export function useDataHook(topic: string) {
  // TODO: We want o be able to pass some parameters such as the date+time to get
  // correct fetched data values.
  const { data, error, isLoading } = useSWR(`/api/${topic}`, fetcher, {
    refreshInterval: 300000,
  });

  return {
    data,
    isLoading,
    isError: error,
  };
}
