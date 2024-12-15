import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  // Validate environment variables
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    throw new Error('Missing ADMIN_EMAIL or ADMIN_PASSWORD in environment variables.');
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  // Create a default admin user
  const admin = await prisma.admin.upsert({
    where: { email: adminEmail }, // Prevent duplicate creation
    update: {}, // No update action
    create: {
      email: adminEmail,
      password: hashedPassword,
      name: 'Default Admin',
    },
  });

  console.log('Default admin user created:', admin);
}

main()
  .catch((e) => {
    console.error('Error running seed file:', e);
    process.exit(1); // Exit with failure code
  })
  .finally(async () => {
    await prisma.$disconnect(); // Ensure proper cleanup
  });
