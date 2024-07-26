import mongoose from "mongoose";
import faker from 'faker'
import dotenv from 'dotenv'
import connectDB from "./config/db";
import Organization from "./models/Organization";
import User from "./models/User";
dotenv.config()

const seedDB = async () => {
  await connectDB();

  // Clear collections
  await Organization.deleteMany({});
  await User.deleteMany({});

  // Create fake data
  for (let i = 0; i < 5; i++) {
    const organization = new Organization({
      name: faker.company.companyName(),
      description: faker.company.catchPhrase()
    });
    await organization.save();

    for (let j = 0; j < 10; j++) {
      const user = new User({
        organization: organization._id,
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: 'password123',
        role: j === 0 ? 'admin' : 'user',
        privileges: j === 0 ? ['all'] : ['read']
      });
      await user.save();
    }
  }

  console.log('Database seeded');
  process.exit(0);
};

seedDB();
