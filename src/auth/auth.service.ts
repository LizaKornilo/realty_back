import { AuthDto } from './dto/auth.dto'
import { UserService } from './../user/user.service'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { JwtPayloadDto } from './dto/jwt-payload.dto'
import { ConfigService } from '@nestjs/config'
import { RtPayloadDto } from './dto/rt-pauload.dto'
import * as jwt from 'jsonwebtoken'
const bcrypt = require('bcryptjs')

@Injectable()
export class AuthService {
  constructor (
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService
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
    const payloadAccessToken: JwtPayloadDto = {
      username: user.username,
      email: user.email,
      sub: user.id,
      role: user.role
    }
    const payloadRefreshToken: RtPayloadDto = {
      sub: user.id
    }
    return {
      access_token: this.jwtService.sign(payloadAccessToken, {
        secret: this.configService.get('ACCESS_TOKEN_SECRET'),
        expiresIn: this.configService.get('ACCESS_TOKEN_EXPIRES')
      }),
      refresh_token: this.jwtService.sign(payloadRefreshToken, {
        secret: this.configService.get('REFRESH_TOKEN_SECRET'),
        expiresIn: this.configService.get('REFRESH_TOKEN_EXPIRES')
      })
    }
  }

  async generateNewAccessToken (refreshToken) {
    try {
      const refreshTokenPayload: any = jwt.verify(refreshToken, this.configService.get('REFRESH_TOKEN_SECRET'))
      const user = await this.userService.getOne(refreshTokenPayload.sub)
      const payloadNewAccessToken = {
        username: user.username,
        email: user.email,
        sub: user.id,
        role: user.role
      }
      const newAccessToken = this.jwtService.sign(payloadNewAccessToken, {
        secret: this.configService.get('ACCESS_TOKEN_SECRET'),
        expiresIn: this.configService.get('ACCESS_TOKEN_EXPIRES')
      })
      return newAccessToken
    } catch (e) {
      throw new HttpException({
        status: HttpStatus.UNAUTHORIZED,
        error: 'User unauthorized'
      }, HttpStatus.UNAUTHORIZED)
    }
  }
}
