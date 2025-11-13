import { Injectable, NotFoundException } from "@nestjs/common"
import type { PrismaService } from "../prisma/prisma.service"
import type { CreateAuthorDto } from "./dto/create-author.dto"
import type { UpdateAuthorDto } from "./dto/update-author.dto"

@Injectable()
export class AuthorsService {
  constructor(private prisma: PrismaService) {}

  async create(createAuthorDto: CreateAuthorDto) {
    return this.prisma.author.create({
      data: createAuthorDto,
      include: { books: true },
    })
  }

  async findAll() {
    return this.prisma.author.findMany({
      include: { books: true },
    })
  }

  async findOne(id: string) {
    const author = await this.prisma.author.findUnique({
      where: { id },
      include: { books: true },
    })
    if (!author) throw new NotFoundException("Author not found")
    return author
  }

  async update(id: string, updateAuthorDto: UpdateAuthorDto) {
    return this.prisma.author.update({
      where: { id },
      data: updateAuthorDto,
      include: { books: true },
    })
  }

  async remove(id: string) {
    return this.prisma.author.delete({
      where: { id },
      include: { books: true },
    })
  }
}
