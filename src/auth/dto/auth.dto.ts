import { ApiProperty } from '@nestjs/swagger'

export class AuthDto {
  @ApiProperty({
    example: 'ivan@gamil.com'
  })
    email: string

  @ApiProperty({
    example: '1234'
  })
    password: string
}
