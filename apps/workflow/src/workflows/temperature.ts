// Workflow design.
//
// Step 1: Fetch JSON
// Step 1a: For historical data, every 1 hour tracks back one day.
// Step 1b: At 5AM daily, it fetches for the previous day.
//
// Step 2: Store in CloudFlare 
//
// Step 3: Deserialise the JSON
//
// Step 4: Store in WeatherCore
//
// Step 6: Update the fetch_jobs_task


export async function temperatureReport() {

  // Step1. Fetch the JSON.
  const date = "2024-05-21"
  const endpoint = 'https://api.data.gov.sg/v1/environment/rainfall'

}



