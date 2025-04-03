// augmentDiamonds.js

import fs from 'fs';
import csv from 'csv-parser';
import { createObjectCsvWriter } from 'csv-writer';
import fetch from 'node-fetch';
import pLimit from 'p-limit';

const unsplashAccessKey = process.env.UNSPLASH_ACCESS_KEY;
const inputFilePath = './data/diamonds.csv';
const outputFilePath = './data/augmented_diamonds.csv';

const diamonds = [];

console.log('Starting CSV processing...');

// Read the CSV file
fs.createReadStream(inputFilePath)
  .pipe(csv())
  .on('data', (row) => {
    diamonds.push(row);
  })
  .on('end', async () => {
    console.log(`Finished reading CSV. Total diamonds: ${diamonds.length}`);

    // Set up p-limit with a concurrency limit (e.g., 5 simultaneous requests)
    const limit = pLimit(5);

    // Create an array of tasks (promises) for each diamond
    const tasks = diamonds.map((diamond, index) =>
      limit(async () => {
        console.log(`\nProcessing diamond ${index + 1} of ${diamonds.length}`);
        console.log(`Diamond details: Cut = ${diamond.cut}, Clarity = ${diamond.clarity}`);
        
        // Construct a query using diamond's cut (you can adjust this as needed)
        const query = `diamond ${diamond.cut}`;
        console.log(`Searching Unsplash with query: "${query}"`);

        try {
          const res = await fetch(
            `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&client_id=${unsplashAccessKey}`
          );
          
          if (!res.ok) {
            console.error(`Error: Received status ${res.status} for diamond ${index + 1}`);
            diamond.imageUrl = '';
            return;
          }
          
          const data = await res.json();
          if (data.results && data.results.length > 0) {
            // Select the first image result (or use your selection logic)
            diamond.imageUrl = data.results[0].urls.regular;
            console.log(`Found image for diamond ${index + 1}: ${diamond.imageUrl}`);
          } else {
            console.log(`No image found for diamond ${index + 1}. Setting imageUrl as empty.`);
            diamond.imageUrl = '';
          }
        } catch (error) {
          console.error(`Error fetching image for diamond ${index + 1}: ${error}`);
          diamond.imageUrl = '';
        }
      })
    );

    // Run all tasks concurrently with the defined limit
    await Promise.all(tasks);

    // Write the augmented data to a new CSV file
    const csvWriter = createObjectCsvWriter({
      path: outputFilePath,
      header: [
        { id: '', title: '' },
        { id: 'carat', title: 'carat' },
        { id: 'cut', title: 'cut' },
        { id: 'color', title: 'color' },
        { id: 'clarity', title: 'clarity' },
        { id: 'depth', title: 'depth' },
        { id: 'table', title: 'table' },
        { id: 'price', title: 'price' },
        { id: 'x', title: 'x' },
        { id: 'y', title: 'y' },
        { id: 'z', title: 'z' },
        { id: 'imageUrl', title: 'imageUrl' }
      ]
    });

    try {
      await csvWriter.writeRecords(diamonds);
      console.log(`\nAugmented CSV written successfully to ${outputFilePath}`);
    } catch (error) {
      console.error(`Error writing augmented CSV: ${error}`);
    }
  });
