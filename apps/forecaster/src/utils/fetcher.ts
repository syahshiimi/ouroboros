export const fetcher = async ({url}: {url: string;}) => {
  const options = {
    next: {
      // We can let nextjs wrapper implementation of fetch to force a revalidation based on a given value. 
      // These values are in seconds ie. 300 seconds = 5 minutes.
      // This will revlaidate the full route cache and ensure fresh data.
      revalidate: 300
    }
  }
  const response = await fetch(`${url}`, options);
  if (!response.ok) {
    throw new Error("An error occurred while fetching the data.");
  }
  return response.json();
};
