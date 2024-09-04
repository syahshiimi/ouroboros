import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";

export function useDataHook(topic: string) {
  const { data, error, isLoading } = useSWR(
    `/api/${topic}`,
    (url) => fetcher({ url: url  }),
    {
      refreshInterval: 300000,
      revalidateOnFocus: false,
    },
  );

  return {
    data,
    isLoading,
    isError: error,
  };
}
