import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common"
import type { PrismaService } from "../prisma/prisma.service"
import type { CreateBorrowRecordDto } from "./dto/create-borrow-record.dto"
import type { UpdateBorrowRecordDto } from "./dto/update-borrow-record.dto"

@Injectable()
export class BorrowRecordsService {
  constructor(private prisma: PrismaService) {}

  async create(createBorrowRecordDto: CreateBorrowRecordDto) {
    const book = await this.prisma.book.findUnique({
      where: { id: createBorrowRecordDto.bookId },
    })

    if (!book || book.availableCopies < 1) {
      throw new BadRequestException("Book not available for borrowing")
    }

    // Update available copies
    await this.prisma.book.update({
      where: { id: createBorrowRecordDto.bookId },
      data: { availableCopies: book.availableCopies - 1 },
    })

    return this.prisma.borrowRecord.create({
      data: createBorrowRecordDto,
      include: { user: true, book: { include: { author: true } } },
    })
  }

  async findAll() {
    return this.prisma.borrowRecord.findMany({
      include: { user: true, book: { include: { author: true } } },
    })
  }

  async findOne(id: string) {
    const record = await this.prisma.borrowRecord.findUnique({
      where: { id },
      include: { user: true, book: { include: { author: true } } },
    })
    if (!record) throw new NotFoundException("Borrow record not found")
    return record
  }

  async findByUserId(userId: string) {
    return this.prisma.borrowRecord.findMany({
      where: { userId },
      include: { user: true, book: { include: { author: true } } },
    })
  }

  async returnBook(id: string) {
    const record = await this.prisma.borrowRecord.findUnique({
      where: { id },
      include: { book: true },
    })

    if (!record) throw new NotFoundException("Borrow record not found")
    if (record.returnDate) throw new BadRequestException("Book already returned")

    // Update available copies
    await this.prisma.book.update({
      where: { id: record.bookId },
      data: { availableCopies: record.book.availableCopies + 1 },
    })

    return this.prisma.borrowRecord.update({
      where: { id },
      data: { returnDate: new Date() },
      include: { user: true, book: { include: { author: true } } },
    })
  }

  async update(id: string, updateBorrowRecordDto: UpdateBorrowRecordDto) {
    return this.prisma.borrowRecord.update({
      where: { id },
      data: updateBorrowRecordDto,
      include: { user: true, book: { include: { author: true } } },
    })
  }

  async remove(id: string) {
    const record = await this.prisma.borrowRecord.findUnique({
      where: { id },
      include: { book: true },
    })

    if (record && !record.returnDate) {
      await this.prisma.book.update({
        where: { id: record.bookId },
        data: { availableCopies: record.book.availableCopies + 1 },
      })
    }

    return this.prisma.borrowRecord.delete({
      where: { id },
      include: { user: true, book: { include: { author: true } } },
    })
  }
}
