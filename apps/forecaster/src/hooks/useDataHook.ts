import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";

export function useDataHook(topic: string) {
  const { data, error, isLoading } = useSWR(
    `/api/${topic}`,
    (url) => fetcher({ url: url  }),
    {
      // Revalidates on the user interface level...
      refreshInterval: 300000,
    },
  );

  return {
    data,
    isLoading,
    isError: error,
  };
}
