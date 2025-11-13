import { Injectable, NotFoundException } from "@nestjs/common"
import type { PrismaService } from "../prisma/prisma.service"
import type { CreateBookDto } from "./dto/create-book.dto"
import type { UpdateBookDto } from "./dto/update-book.dto"

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  async create(createBookDto: CreateBookDto) {
    return this.prisma.book.create({
      data: createBookDto,
      include: { author: true },
    })
  }

  async findAll() {
    return this.prisma.book.findMany({
      include: { author: true },
    })
  }

  async findOne(id: string) {
    const book = await this.prisma.book.findUnique({
      where: { id },
      include: { author: true },
    })
    if (!book) throw new NotFoundException("Book not found")
    return book
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    return this.prisma.book.update({
      where: { id },
      data: updateBookDto,
      include: { author: true },
    })
  }

  async remove(id: string) {
    return this.prisma.book.delete({
      where: { id },
      include: { author: true },
    })
  }

  async search(query: string) {
    return this.prisma.book.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
          { isbn: { contains: query } },
        ],
      },
      include: { author: true },
    })
  }
}
