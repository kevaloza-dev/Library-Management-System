import { IsString, IsNumber, IsOptional, IsUUID } from "class-validator"

export class CreateBookDto {
  @IsString()
  title: string

  @IsString()
  isbn: string

  @IsOptional()
  @IsString()
  description?: string

  @IsUUID()
  authorId: string

  @IsNumber()
  publishYear: number

  @IsNumber()
  @IsOptional()
  copies?: number

  @IsNumber()
  @IsOptional()
  availableCopies?: number
}
