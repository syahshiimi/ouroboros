export const fetcher = async ({url}: {url: string;}) => {
  const response = await fetch(`${url}`, { next: { revalidate: 300 } });
  if (!response.ok) {
    throw new Error("An error occurred while fetching the data.");
  }
  return response.json();
};
