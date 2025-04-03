import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Papa from 'papaparse';
import { PrismaClient } from '@prisma/client';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();

async function main() {
  try {
    const csvPath = path.join(__dirname, '../data/diamonds.csv');
    const csvContent = fs.readFileSync(csvPath, 'utf-8');

    const { data } = Papa.parse(csvContent, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true, // Automatically convert numeric values
    });

    // Filter out rows with undefined values and convert numeric values
    const validData = data
      .filter(row => 
        row.carat !== undefined && 
        row.cut !== undefined && 
        row.color !== undefined && 
        row.clarity !== undefined && 
        row.depth !== undefined && 
        row.table !== undefined && 
        row.price !== undefined && 
        row.x !== undefined && 
        row.y !== undefined && 
        row.z !== undefined
      )
      .map(row => ({
        carat: parseFloat(row.carat),
        cut: String(row.cut),
        color: String(row.color),
        clarity: String(row.clarity),
        depth: parseFloat(row.depth),
        table: parseFloat(row.table),
        price: parseInt(row.price),
        x: parseFloat(row.x),
        y: parseFloat(row.y),
        z: parseFloat(row.z),
      }));

    console.log(`Importing ${validData.length} diamonds...`);

    // Import in batches of 1000
    const batchSize = 1000;
    for (let i = 0; i < validData.length; i += batchSize) {
      const batch = validData.slice(i, i + batchSize);
      await prisma.diamond.createMany({
        data: batch,
        skipDuplicates: true,
      });
      console.log(`Imported batch ${i / batchSize + 1}`);
    }

    console.log('Import completed successfully!');
  } catch (error) {
    console.error('Error importing diamonds:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 