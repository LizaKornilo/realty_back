import {
  Body,
  Controller,
  Post
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { RegisterReqDto } from './dto/registerReq.dto'
import { UserService } from './user.service'

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor (private readonly userService: UserService) { }

  @Post()
  async register (@Body() registerData: RegisterReqDto) {
    return this.userService.register(registerData)
  }
}
