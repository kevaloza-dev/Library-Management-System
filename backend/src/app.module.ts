import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { JwtModule } from "@nestjs/jwt"
import { PassportModule } from "@nestjs/passport"
import { PrismaModule } from "./prisma/prisma.module"
import { AuthModule } from "./auth/auth.module"
import { UsersModule } from "./users/users.module"
import { BooksModule } from "./books/books.module"
import { AuthorsModule } from "./authors/authors.module"
import { BorrowRecordsModule } from "./borrow-records/borrow-records.module"

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || "supersecret",
      signOptions: { expiresIn: "24h" },
    }),
    PassportModule,
    PrismaModule,
    AuthModule,
    UsersModule,
    BooksModule,
    AuthorsModule,
    BorrowRecordsModule,
  ],
})
export class AppModule {}
