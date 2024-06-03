import { createSchema } from 'genson-js';
import fs from 'fs';
import path from 'path';

/**
 * Generates the schema from the JSON file located in the ../json/ folder.
 *
 * The JSON simply defines what we should expect and by that, it allows us to redefine
 * the scope of what we should be expecting as an API endpoint.
 *
 * With the JSON, we could explicitly create a schema that allows us to understand
 * how the API is expected to behave; effectively creating a type-safe endpoint.
 */

const rootFolder = path.join(__dirname, '../json');
const generatedFolder = path.join(__dirname, '../_generated_');
const jsonSchemaFolder = path.join(generatedFolder, 'json-schema');

const generateSchemaForFile = (filePath: string) => {
    const fileContents = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const schema = createSchema(fileContents);
    const schemaFilePath = path.join(jsonSchemaFolder, `${path.basename(filePath, '.json')}.schema.json`);
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

// Create the '_generated' and 'json-schema' directories if they don't exist
if (!fs.existsSync(generatedFolder)) {
    fs.mkdirSync(generatedFolder);
}

if (!fs.existsSync(jsonSchemaFolder)) {
    fs.mkdirSync(jsonSchemaFolder);
}

// Traverse the root folder and generate schemas for JSON files
traverseDirectory(rootFolder);