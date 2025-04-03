import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Papa from 'papaparse';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the CSV file
const csvPath = path.join(__dirname, '..', 'data', 'diamonds.csv');
const csvContent = await fs.readFile(csvPath, 'utf-8');

// Parse CSV
const { data } = Papa.parse(csvContent, {
  header: true,
  dynamicTyping: true,
});

// Add IDs to the diamonds
const diamonds = data.map((diamond, index) => ({
  ...diamond,
  id: index + 1
}));

// Write to JSON file
const jsonPath = path.join(__dirname, '..', 'src', 'data', 'diamonds.json');
await fs.mkdir(path.dirname(jsonPath), { recursive: true });
await fs.writeFile(jsonPath, JSON.stringify(diamonds, null, 2));

console.log(`Converted ${diamonds.length} diamonds to JSON`); 