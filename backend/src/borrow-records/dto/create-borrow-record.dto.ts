import { IsDateString, IsUUID } from "class-validator"

export class CreateBorrowRecordDto {
  @IsUUID()
  userId: string

  @IsUUID()
  bookId: string

  @IsDateString()
  dueDate: string
}
