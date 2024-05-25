const fetch = require('node-fetch');
import path from "path";
import fs from 'fs';
import { topicsStore } from "../workflows/queue";

export async function fetchData(
  endpoint: string,
  date: string
) {
  const data = new URLSearchParams();
  data.append('date', date)

  const url = `${endpoint}?${data.toString()}`

  console.log(`Fetching from the endpoint temperature with url: ${url}`)
  try {
    const response = await fetch(url, {
      method: "GET"
    })
    const data = await response.json();
    return data;

  } catch (error) {
    console.error(error)
  }
}

export async function storeJson(date: string, json: any, topic: keyof typeof topicsStore) {
  console.log('Storing the JSON')

  const dataDir = path.join(__dirname, 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir)
  }
  
  const filePath = path.join(dataDir, `${topic}-${date}.json`)
  console.log(`Storing JSON in dir: ${filePath}`)
  fs.writeFileSync(filePath, JSON.stringify(json, null, 2))
}


