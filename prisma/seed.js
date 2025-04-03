const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const sampleDiamonds = [
  {
    carat: 1.0,
    cut: 'Ideal',
    color: 'D',
    clarity: 'IF',
    depth: 61.5,
    table: 55,
    price: 15000,
    x: 6.5,
    y: 6.5,
    z: 4.0
  },
  {
    carat: 0.5,
    cut: 'Very Good',
    color: 'E',
    clarity: 'VVS1',
    depth: 62.1,
    table: 57,
    price: 5000,
    x: 5.1,
    y: 5.1,
    z: 3.2
  },
  {
    carat: 2.0,
    cut: 'Excellent',
    color: 'F',
    clarity: 'VS1',
    depth: 60.8,
    table: 58,
    price: 30000,
    x: 8.1,
    y: 8.1,
    z: 4.9
  },
  {
    carat: 1.5,
    cut: 'Ideal',
    color: 'G',
    clarity: 'VVS2',
    depth: 61.2,
    table: 56,
    price: 20000,
    x: 7.2,
    y: 7.2,
    z: 4.4
  },
  {
    carat: 0.75,
    cut: 'Very Good',
    color: 'H',
    clarity: 'VS2',
    depth: 62.3,
    table: 58,
    price: 8000,
    x: 5.8,
    y: 5.8,
    z: 3.6
  },
  {
    carat: 1.25,
    cut: 'Excellent',
    color: 'I',
    clarity: 'SI1',
    depth: 61.8,
    table: 57,
    price: 12000,
    x: 6.9,
    y: 6.9,
    z: 4.3
  },
  {
    carat: 0.9,
    cut: 'Ideal',
    color: 'J',
    clarity: 'SI2',
    depth: 61.4,
    table: 56,
    price: 9000,
    x: 6.2,
    y: 6.2,
    z: 3.8
  },
  {
    carat: 1.75,
    cut: 'Very Good',
    color: 'K',
    clarity: 'I1',
    depth: 62.5,
    table: 59,
    price: 15000,
    x: 7.5,
    y: 7.5,
    z: 4.7
  },
  {
    carat: 1.1,
    cut: 'Excellent',
    color: 'L',
    clarity: 'I2',
    depth: 61.6,
    table: 57,
    price: 10000,
    x: 6.6,
    y: 6.6,
    z: 4.1
  },
  {
    carat: 0.6,
    cut: 'Ideal',
    color: 'M',
    clarity: 'I3',
    depth: 61.3,
    table: 56,
    price: 6000,
    x: 5.3,
    y: 5.3,
    z: 3.3
  },
  {
    carat: 1.3,
    cut: 'Very Good',
    color: 'N',
    clarity: 'IF',
    depth: 62.0,
    table: 58,
    price: 11000,
    x: 7.0,
    y: 7.0,
    z: 4.3
  },
  {
    carat: 0.8,
    cut: 'Excellent',
    color: 'O',
    clarity: 'VVS1',
    depth: 61.7,
    table: 57,
    price: 7000,
    x: 5.9,
    y: 5.9,
    z: 3.6
  },
  // Additional diamonds for pagination
  {
    carat: 1.4,
    cut: 'Ideal',
    color: 'P',
    clarity: 'VVS2',
    depth: 61.9,
    table: 56,
    price: 18000,
    x: 7.3,
    y: 7.3,
    z: 4.5
  },
  {
    carat: 0.7,
    cut: 'Very Good',
    color: 'Q',
    clarity: 'VS1',
    depth: 62.2,
    table: 58,
    price: 7500,
    x: 5.7,
    y: 5.7,
    z: 3.5
  },
  {
    carat: 1.6,
    cut: 'Excellent',
    color: 'R',
    clarity: 'SI1',
    depth: 61.1,
    table: 57,
    price: 22000,
    x: 7.4,
    y: 7.4,
    z: 4.6
  },
  {
    carat: 0.85,
    cut: 'Ideal',
    color: 'S',
    clarity: 'SI2',
    depth: 61.5,
    table: 56,
    price: 8500,
    x: 6.1,
    y: 6.1,
    z: 3.7
  },
  {
    carat: 1.8,
    cut: 'Very Good',
    color: 'T',
    clarity: 'I1',
    depth: 62.4,
    table: 59,
    price: 16000,
    x: 7.6,
    y: 7.6,
    z: 4.8
  },
  {
    carat: 1.2,
    cut: 'Excellent',
    color: 'U',
    clarity: 'I2',
    depth: 61.7,
    table: 57,
    price: 11500,
    x: 6.8,
    y: 6.8,
    z: 4.2
  },
  {
    carat: 0.65,
    cut: 'Ideal',
    color: 'V',
    clarity: 'I3',
    depth: 61.4,
    table: 56,
    price: 6500,
    x: 5.4,
    y: 5.4,
    z: 3.4
  },
  {
    carat: 1.7,
    cut: 'Very Good',
    color: 'W',
    clarity: 'IF',
    depth: 62.1,
    table: 58,
    price: 17000,
    x: 7.5,
    y: 7.5,
    z: 4.7
  },
  {
    carat: 0.95,
    cut: 'Excellent',
    color: 'X',
    clarity: 'VVS1',
    depth: 61.8,
    table: 57,
    price: 9500,
    x: 6.3,
    y: 6.3,
    z: 3.9
  },
  {
    carat: 1.9,
    cut: 'Ideal',
    color: 'Y',
    clarity: 'VVS2',
    depth: 61.3,
    table: 56,
    price: 19000,
    x: 7.7,
    y: 7.7,
    z: 4.9
  },
  {
    carat: 0.55,
    cut: 'Very Good',
    color: 'Z',
    clarity: 'VS1',
    depth: 62.0,
    table: 58,
    price: 5500,
    x: 5.2,
    y: 5.2,
    z: 3.1
  }
];

async function main() {
  console.log('Starting seed...');
  console.log('Database URL:', process.env.DATABASE_URL ? 'Present' : 'Missing');
  
  try {
    // Verify database connection
    await prisma.$connect();
    console.log('Database connection successful');
    
    // Clear existing data
    await prisma.diamond.deleteMany();
    console.log('Cleared existing data');
    
    // Insert sample data
    for (const diamond of sampleDiamonds) {
      await prisma.diamond.create({
        data: diamond
      });
    }
    console.log('Added sample diamonds');
  } catch (error) {
    console.error('Error during seeding:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 