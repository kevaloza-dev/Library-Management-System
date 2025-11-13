import { PrismaClient } from "@prisma/client"
import * as bcrypt from "bcrypt"

const prisma = new PrismaClient()

async function main() {
  console.log("Seeding database...")

  // Clean up existing data
  await prisma.borrowRecord.deleteMany({})
  await prisma.book.deleteMany({})
  await prisma.author.deleteMany({})
  await prisma.user.deleteMany({})

  // Create users
  const adminPassword = await bcrypt.hash("admin123", 10)
  const userPassword = await bcrypt.hash("user123", 10)

  const admin = await prisma.user.create({
    data: {
      email: "admin@library.com",
      name: "Admin User",
      password: adminPassword,
      role: "admin",
    },
  })

  const user1 = await prisma.user.create({
    data: {
      email: "john@example.com",
      name: "John Doe",
      password: userPassword,
      role: "user",
    },
  })

  const user2 = await prisma.user.create({
    data: {
      email: "jane@example.com",
      name: "Jane Smith",
      password: userPassword,
      role: "user",
    },
  })

  // Create authors
  const author1 = await prisma.author.create({
    data: {
      name: "George Orwell",
      bio: "English novelist and social critic, known for dystopian fiction.",
    },
  })

  const author2 = await prisma.author.create({
    data: {
      name: "J.K. Rowling",
      bio: "British author, best known for the Harry Potter series.",
    },
  })

  const author3 = await prisma.author.create({
    data: {
      name: "J.R.R. Tolkien",
      bio: "English writer and philologist, creator of Middle-earth.",
    },
  })

  const author4 = await prisma.author.create({
    data: {
      name: "Harper Lee",
      bio: "American author, Pulitzer Prize winner.",
    },
  })

  // Create books
  const book1 = await prisma.book.create({
    data: {
      title: "1984",
      isbn: "978-0451524935",
      description: "A dystopian social science fiction novel and cautionary tale.",
      authorId: author1.id,
      publishYear: 1949,
      copies: 5,
      availableCopies: 3,
    },
  })

  const book2 = await prisma.book.create({
    data: {
      title: "Animal Farm",
      isbn: "978-0451526342",
      description: "A satirical allegorical novella about a group of farm animals.",
      authorId: author1.id,
      publishYear: 1945,
      copies: 4,
      availableCopies: 4,
    },
  })

  const book3 = await prisma.book.create({
    data: {
      title: "Harry Potter and the Sorcerer's Stone",
      isbn: "978-0439708180",
      description: "The first novel in the Harry Potter series.",
      authorId: author2.id,
      publishYear: 1998,
      copies: 6,
      availableCopies: 5,
    },
  })

  const book4 = await prisma.book.create({
    data: {
      title: "The Hobbit",
      isbn: "978-0547928227",
      description: "A fantasy adventure about a hobbit named Bilbo Baggins.",
      authorId: author3.id,
      publishYear: 1937,
      copies: 5,
      availableCopies: 2,
    },
  })

  const book5 = await prisma.book.create({
    data: {
      title: "To Kill a Mockingbird",
      isbn: "978-0061120084",
      description: "A gripping tale of racial injustice and childhood innocence.",
      authorId: author4.id,
      publishYear: 1960,
      copies: 4,
      availableCopies: 4,
    },
  })

  // Create borrow records
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 14)

  const borrowRecord1 = await prisma.borrowRecord.create({
    data: {
      userId: user1.id,
      bookId: book1.id,
      dueDate: tomorrow,
    },
  })

  const borrowRecord2 = await prisma.borrowRecord.create({
    data: {
      userId: user2.id,
      bookId: book4.id,
      dueDate: tomorrow,
    },
  })

  console.log("Seed completed successfully")
  console.log("Admin login: admin@library.com / admin123")
  console.log("User login: john@example.com / user123")
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
