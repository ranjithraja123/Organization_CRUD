import mongoose from "mongoose";
import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';
import connectDB from "./config/db.js";
import Organization from "./models/Organization.js";
import User from "./models/User.js";
import bcrypt from 'bcryptjs';

dotenv.config();

const runMigration = async () => {
  await connectDB();

  // Clear collections if necessary
  await Organization.deleteMany({});
  await User.deleteMany({});

  // Create sample organizations
  const organizations = [];
  for (let i = 0; i < 5; i++) {
    const organization = new Organization({
      name: faker.company.name(),
      description: faker.company.catchPhrase(),
    });
    organizations.push(organization);
    await organization.save();
  }

  // Create an initial admin user and 5 regular users for each organization
  for (let org of organizations) {
    // const hashedPassword = await bcrypt.hash('adminpassword', 10);

    const adminUser = new User({
      organization: org._id,
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: 'admin123',
      role: 'admin',
      privileges: ['create', 'read', 'update', 'delete'],
    });
    await adminUser.save();

    for (let j = 0; j < 5; j++) {
      const userPassword = await bcrypt.hash('userpassword', 10);

      const user = new User({
        organization: org._id,
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: 'user123',
        role: 'user',
        privileges: ['read'],
      });
      await user.save();
    }
  }

  console.log('Migration completed');
  process.exit(0);
};

runMigration();
