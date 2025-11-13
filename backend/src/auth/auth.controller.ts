import { Controller, Post, HttpCode, HttpStatus } from "@nestjs/common"
import { ApiTags, ApiOperation } from "@nestjs/swagger"
import type { AuthService } from "./auth.service"
import type { CreateUserDto } from "../users/dto/create-user.dto"
import type { LoginDto } from "./dto/login.dto"

@ApiTags("auth")
@Controller("api/auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("register")
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Register a new user" })
  async register(createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto)
  }

  @Post("login")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Login user" })
  async login(loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.password)
  }
}
