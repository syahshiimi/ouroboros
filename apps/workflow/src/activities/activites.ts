const fetch = require('node-fetch')

export async function fetchData(
  endpoint: string,
  date: string
) {
  const url = endpoint + date
  try {
    const response = await fetch(endpoint)
    const data = await response.json();

  } catch (error) {
    console.error(error)
  }
}
