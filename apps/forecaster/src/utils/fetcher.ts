export const fetcher = async ({url}: {url: string;}) => {
  const opts = {
    // next: {
    //   revalidate: 300
    // }
    cache: 'no-store',
  };

  const response = await fetch(`${url}`, { cache: "no-store"});
  if (!response.ok) {
    throw new Error("An error occurred while fetching the data.");
  }
  return response.json();
};
