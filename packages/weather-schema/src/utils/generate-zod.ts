import { jsonSchemaToZod } from "json-schema-to-zod";
import fs from 'fs';
import path from 'path';

/**
 * Generates the Zod schema from the generated JSON schema  file located in the /_generated_/ folder.
 *
 * The JSON schema simply defines a contract between the client interface and the external endpoint.
 *
 * With the JSON schema, we could explicitly create a zod schema that allows us to understand
 * how the API is expected to behave; effectively creating a type-safe endpoint.
 */

const schemaDir = path.join(__dirname, '../_generated_/json-schema');
const generatedFolder = path.join(__dirname, '../_generated_');
const outputDir = path.join(generatedFolder, 'zod');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

const exportLines: string[] = [];
const generatedBy = `/* This file was generated by the generate-zod-schemas script */\n`;
const doNotEdit = `/* DO NOT EDIT THIS FILE DIRECTLY. IT IS GENERATED FROM THE JSON SCHEMA FILES. */\n\n`;

function traverseDirectory(dir: string) {
    fs.readdirSync(dir).forEach(file => {
        const filePath = path.join(dir, file);
        const stats = fs.statSync(filePath);

        if (stats.isDirectory()) {
            traverseDirectory(filePath);
        } else if (stats.isFile() && path.extname(filePath) === '.json') {
            const schema = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
            const zod = jsonSchemaToZod(schema, { module: "esm" });
            const baseName = path.basename(filePath, '.json').replace('.schema', '');
            const outputFilePath = path.join(outputDir, `${baseName}.zod.ts`);
            const fileContents = `${generatedBy}${doNotEdit}${zod};`;
            fs.writeFileSync(outputFilePath, fileContents);
            console.log(`Generated: ${outputFilePath}`);

            const capitalisedName = baseName.charAt(0).toUpperCase() + baseName.slice(1);
            const exportName = `Z${capitalisedName}Schema`;
            exportLines.push(`export * as ${exportName} from "./${baseName}.zod";`);
        }
    });
}

traverseDirectory(schemaDir);

const indexFilePath = path.join(outputDir, 'index.ts');
fs.writeFileSync(indexFilePath, exportLines.join('\n'));
console.log(`Generated: ${indexFilePath}`);