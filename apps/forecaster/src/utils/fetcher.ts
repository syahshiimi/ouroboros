export const fetcher = async ({url}: {url: string;}) => {
  const options = {
    next: {
      revalidate: 0
    }
  };
  const response = await fetch(`${url}`, options);
  if (!response.ok) {
    throw new Error("An error occurred while fetching the data.");
  }
  return response.json();
};
