export const fetcher = async ({
  url,
  dateParam,
}: {
  url: string;
  dateParam: string;
}) => {
  const response = await fetch(`${url}?date=${dateParam}`);
  if (!response.ok) {
    throw new Error("An error occurred while fetching the data.");
  }
  return response.json();
};
