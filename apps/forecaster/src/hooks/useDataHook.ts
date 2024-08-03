import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";

export function useDataHook(topic: string) {
  const { data, error, isLoading } = useSWR(`/api/${topic}`, fetcher, {
    refreshInterval: 300000,
  });

  return {
    data,
    isLoading,
    isError: error,
  };
}
