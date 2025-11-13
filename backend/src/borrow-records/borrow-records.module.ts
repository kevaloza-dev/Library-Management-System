import { Module } from "@nestjs/common"
import { BorrowRecordsService } from "./borrow-records.service"
import { BorrowRecordsController } from "./borrow-records.controller"
import { PrismaModule } from "../prisma/prisma.module"

@Module({
  imports: [PrismaModule],
  controllers: [BorrowRecordsController],
  providers: [BorrowRecordsService],
})
export class BorrowRecordsModule {}
