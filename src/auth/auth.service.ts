import { AuthDto } from './dto/auth.dto'
import { UserService } from './../user/user.service'
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { JwtPayloadDto } from './dto/jwt-payload.dto'
const bcrypt = require('bcryptjs')

@Injectable()
export class AuthService {
  constructor (
    private userService: UserService,
    private jwtService: JwtService
  ) { }

  async validateUser (authDto: AuthDto): Promise<any> {
    const user = await this.userService.getOneByEmail(authDto.email)
    if (user && bcrypt.compareSync(authDto.password, user.password)) {
      const { password, activationKey, ...result } = user
      return result
    }
    return null
  }

  async login (user: any) {
    const payload: JwtPayloadDto = {
      username: user.username,
      email: user.email,
      sub: user.id,
      role: user.role
    }
    return {
      access_token: this.jwtService.sign(payload)
    }
  }
}
