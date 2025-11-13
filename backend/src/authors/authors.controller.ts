import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common"
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger"
import type { AuthorsService } from "./authors.service"
import type { CreateAuthorDto } from "./dto/create-author.dto"
import type { UpdateAuthorDto } from "./dto/update-author.dto"
import { JwtAuthGuard } from "../auth/guards/jwt.guard"

@ApiTags("authors")
@Controller("api/authors")
export class AuthorsController {
  constructor(private authorsService: AuthorsService) {}

  @Get()
  async findAll() {
    return this.authorsService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.authorsService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorsService.create(createAuthorDto);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorsService.update(id, updateAuthorDto)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async remove(@Param('id') id: string) {
    return this.authorsService.remove(id);
  }
}
