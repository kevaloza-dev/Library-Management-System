import { Injectable, BadRequestException, UnauthorizedException } from "@nestjs/common"
import type { JwtService } from "@nestjs/jwt"
import * as bcrypt from "bcrypt"
import type { UsersService } from "../users/users.service"
import type { CreateUserDto } from "../users/dto/create-user.dto"

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const existingUser = await this.usersService.findByEmail(createUserDto.email)
    if (existingUser) {
      throw new BadRequestException("Email already in use")
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10)
    const user = await this.usersService.create({
      ...createUserDto,
      password: hashedPassword,
    })

    return this.generateToken(user)
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email)
    if (!user) {
      throw new UnauthorizedException("Invalid credentials")
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid credentials")
    }

    return this.generateToken(user)
  }

  private generateToken(user: any) {
    const payload = { sub: user.id, email: user.email, role: user.role }
    return {
      access_token: this.jwtService.sign(payload),
      user: { id: user.id, email: user.email, role: user.role, name: user.name },
    }
  }

  async validateToken(token: string) {
    try {
      return this.jwtService.verify(token)
    } catch {
      throw new UnauthorizedException("Invalid token")
    }
  }
}
