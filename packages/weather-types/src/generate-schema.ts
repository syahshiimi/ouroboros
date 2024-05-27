import { createSchema } from 'genson-js';
import temperature from "./json/temperature.json"
import fs from 'fs';
import path from 'path'

const schema = createSchema(temperature)
const rootFolder = path.join(__dirname, 'json')

const generateSchemaForFile = (filePath: string) => {
    const fileContents = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const schema = createSchema(fileContents);
    const schemaFilePath = path.join(__dirname, 'json-schema', `${path.basename(filePath, '.json')}-schema.json`);
    fs.writeFileSync(schemaFilePath, JSON.stringify(schema, null, 2));
  };

  const traverseDirectory = (dir: string) => {
    const files = fs.readdirSync(dir);
  
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stats = fs.statSync(filePath);
  
      if (stats.isDirectory()) {
        traverseDirectory(filePath);
      } else if (file.endsWith('.json')) {
        generateSchemaForFile(filePath);
      }
    }
  };
  
  // Create the 'json-schema' directory if it doesn't exist
  const dataDir = path.join(__dirname, 'json-schema');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
  }
  
  // Traverse the root folder and generate schemas for JSON files
  traverseDirectory(rootFolder);