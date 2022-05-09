import { RolesGuard } from './auth/guards/roles.guard';
import { AuthDto } from './auth/dto/auth.dto';
import {
  Request,
  Controller,
  Post,
  UseGuards,
  Body,
  Get
} from '@nestjs/common';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesDecorator } from './auth/decorators/roles.decorator';
import { Roles } from './role/roles-values.enum';

@Controller()
@ApiTags('app')
export class AppController {
  constructor(private authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req, @Body() body: AuthDto) {
    return this.authService.login(req.user);
  }

  @Get('get-hello-for-everyone')
  async getHelloForEveryone() {
    return "Hello, absolutely everyone";
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-hello-for-logined')
  @ApiBearerAuth('JWT-auth')
  async getHelloForLogined() {
    return "Hello, logined person";
  }

  @RolesDecorator(Roles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('get-hello-for-admin')
  @ApiBearerAuth('JWT-auth')
  getAdminHello(@Request() req) {
    return "Hello, admin!";
  }
}
