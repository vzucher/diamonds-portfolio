const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const csv = require('csv-parser');

const prisma = new PrismaClient();

async function main() {
  console.log('Starting import...');
  
  try {
    // Clear existing data
    await prisma.diamond.deleteMany();
    console.log('Cleared existing data');
    
    // Read and import CSV data
    const results = [];
    fs.createReadStream('data/diamonds.csv')
      .pipe(csv())
      .on('data', (data) => {
        // Transform CSV data to match our schema
        results.push({
          carat: parseFloat(data.carat),
          cut: data.cut,
          color: data.color,
          clarity: data.clarity,
          depth: parseFloat(data.depth),
          table: parseFloat(data.table),
          price: parseInt(data.price),
          x: parseFloat(data.x),
          y: parseFloat(data.y),
          z: parseFloat(data.z)
        });
      })
      .on('end', async () => {
        console.log(`Read ${results.length} diamonds from CSV`);
        
        // Insert in batches to avoid memory issues
        const batchSize = 1000;
        for (let i = 0; i < results.length; i += batchSize) {
          const batch = results.slice(i, i + batchSize);
          await prisma.diamond.createMany({
            data: batch,
            skipDuplicates: true
          });
          console.log(`Imported batch ${i / batchSize + 1} of ${Math.ceil(results.length / batchSize)}`);
        }
        
        console.log('Import completed successfully');
        await prisma.$disconnect();
      });
  } catch (error) {
    console.error('Error during import:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  }); 