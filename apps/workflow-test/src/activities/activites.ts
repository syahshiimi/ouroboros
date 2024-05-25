const fetch = require('node-fetch');
import path from "path";
import fs from 'fs';
import { topics } from "../workflows/queue";

export async function fetchData(
  endpoint: string,
  date: string
) {
  const data = new URLSearchParams();
  data.append('date', date)

  const url = `${endpoint}?${data.toString()}`

  console.log(`Fetching from the endpoint: ${url}`)
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

export async function storeJson(
  date: string,
  json: any,
  topic: keyof typeof topics
) {
  console.log('Storing the JSON')

  const dataDir = path.join(__dirname, 'data');
  if (!fs.existsSync(dataDir)) {
    console.log(`dir does not exist! Creating directory...`)
    fs.mkdirSync(dataDir)
    console.log(`${dataDir} directory made!`)
  }
  const filePath = path.join(dataDir, `${topic}-${date}.json`)
  console.log(`Storing JSON in dir: ${filePath}`)
  fs.writeFileSync(filePath, JSON.stringify(json, null, 2))
}


