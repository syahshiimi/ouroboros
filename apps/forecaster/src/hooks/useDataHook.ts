import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";

export function useDataHook(topic: string, param: string) {
  const { data, error, isLoading } = useSWR(
    `/api/${topic}`,
    (url) => fetcher({ url: url, dateParam: param }),
    {
      refreshInterval: 300000,
    },
  );

  return {
    data,
    isLoading,
    isError: error,
  };
}
