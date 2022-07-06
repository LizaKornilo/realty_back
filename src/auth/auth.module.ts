import { RolesGuard } from './guards/roles.guard'
import { UserModule } from './../user/user.module'
import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { PassportModule } from '@nestjs/passport'
import { LocalStrategy } from './strategies/local.strategy'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtStrategy } from './strategies/jwt.strategy'

@Module({
  imports: [
    UserModule,
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('ACCESS_TOKEN_SECRET'),
        signOptions: { expiresIn: configService.get('ACCESS_TOKEN_EXPIRES')}
      })
    })
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    RolesGuard
  ],
  exports: [AuthService]
})
export class AuthModule {}
