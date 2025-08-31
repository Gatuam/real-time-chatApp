import bcrypt from "bcrypt";
import prisma from "../global/prisma.global.js";

const seedUsers = [
  {
    username: "alice",
    email: "alice@example.com",
    password: bcrypt.hashSync("password123", 10),
    profilePicture: "https://i.pravatar.cc/150?img=1",
  },
  {
    username: "bob",
    email: "bob@example.com",
    password: bcrypt.hashSync("password123", 10),
    profilePicture: "https://i.pravatar.cc/150?img=2",
  },
  {
    username: "charlie",
    email: "charlie@example.com",
    password: bcrypt.hashSync("password123", 10),
    profilePicture: "https://i.pravatar.cc/150?img=3",
  },
  {
    username: "dave",
    email: "dave@example.com",
    password: bcrypt.hashSync("password123", 10),
    profilePicture: "https://i.pravatar.cc/150?img=4",
  },
  {
    username: "eve",
    email: "eve@example.com",
    password: bcrypt.hashSync("password123", 10),
    profilePicture: "https://i.pravatar.cc/150?img=5",
  },
  {
    username: "frank",
    email: "frank@example.com",
    password: bcrypt.hashSync("password123", 10),
    profilePicture: "https://i.pravatar.cc/150?img=6",
  },
  {
    username: "grace",
    email: "grace@example.com",
    password: bcrypt.hashSync("password123", 10),
    profilePicture: "https://i.pravatar.cc/150?img=7",
  },
  {
    username: "heidi",
    email: "heidi@example.com",
    password: bcrypt.hashSync("password123", 10),
    profilePicture: "https://i.pravatar.cc/150?img=8",
  },
  {
    username: "ivan",
    email: "ivan@example.com",
    password: bcrypt.hashSync("password123", 10),
    profilePicture: "https://i.pravatar.cc/150?img=9",
  },
  {
    username: "judy",
    email: "judy@example.com",
    password: bcrypt.hashSync("password123", 10),
    profilePicture: "https://i.pravatar.cc/150?img=10",
  },
  {
    username: "karen",
    email: "karen@example.com",
    password: bcrypt.hashSync("password123", 10),
    profilePicture: "https://i.pravatar.cc/150?img=11",
  },
  {
    username: "leo",
    email: "leo@example.com",
    password: bcrypt.hashSync("password123", 10),
    profilePicture: "https://i.pravatar.cc/150?img=12",
  },
  {
    username: "mallory",
    email: "mallory@example.com",
    password: bcrypt.hashSync("password123", 10),
    profilePicture: "https://i.pravatar.cc/150?img=13",
  },
  {
    username: "ned",
    email: "ned@example.com",
    password: bcrypt.hashSync("password123", 10),
    profilePicture: "https://i.pravatar.cc/150?img=14",
  },
  {
    username: "oscar",
    email: "oscar@example.com",
    password: bcrypt.hashSync("password123", 10),
    profilePicture: "https://i.pravatar.cc/150?img=15",
  },
];

async function seedDatabase() {
  try {
    await prisma.user.createMany({
      data: seedUsers,
      skipDuplicates: true,
    });
    console.log("Database seeded successfully with 15 users");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedDatabase();
