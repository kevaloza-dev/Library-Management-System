import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common"
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger"
import type { BorrowRecordsService } from "./borrow-records.service"
import type { CreateBorrowRecordDto } from "./dto/create-borrow-record.dto"
import type { UpdateBorrowRecordDto } from "./dto/update-borrow-record.dto"
import { JwtAuthGuard } from "../auth/guards/jwt.guard"

@ApiTags("borrow-records")
@Controller("api/borrow-records")
export class BorrowRecordsController {
  constructor(private borrowRecordsService: BorrowRecordsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async findAll() {
    return this.borrowRecordsService.findAll()
  }

  @Get('user/:userId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async findByUserId(@Param('userId') userId: string) {
    return this.borrowRecordsService.findByUserId(userId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async findOne(@Param('id') id: string) {
    return this.borrowRecordsService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async create(@Body() createBorrowRecordDto: CreateBorrowRecordDto) {
    return this.borrowRecordsService.create(createBorrowRecordDto);
  }

  @Post(':id/return')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async returnBook(@Param('id') id: string) {
    return this.borrowRecordsService.returnBook(id);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async update(@Param('id') id: string, @Body() updateBorrowRecordDto: UpdateBorrowRecordDto) {
    return this.borrowRecordsService.update(id, updateBorrowRecordDto)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async remove(@Param('id') id: string) {
    return this.borrowRecordsService.remove(id);
  }
}
