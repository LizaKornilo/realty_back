import { ApiProperty } from '@nestjs/swagger'

export class RegisterReqDto {
  @ApiProperty({
    example: 'Ivan'
  })
    username: string

  @ApiProperty({
    example: 'ivan@gamil.com'
  })
    email: string

  @ApiProperty({
    example: '1234'
  })
    password: string
}
