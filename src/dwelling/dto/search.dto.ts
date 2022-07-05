import { ApiProperty } from '@nestjs/swagger'

export class SearchDto {
  @ApiProperty({
    example: 50,
    type: 'numeric',
    required: false
  })
    minPrice?: number

  @ApiProperty({
    example: 50,
    type: 'numeric',
    required: false
  })
    maxPrice?: number

  @ApiProperty({
    description: 'Number of days',
    example: 7,
    type: 'numeric',
    required: false
  })
    updatePeriod?: number

  @ApiProperty({
    example: '1',
    type: Number,
    required: false
  })
    countryId?: number

  @ApiProperty({
    example: '2',
    type: Number,
    required: false
  })
    cityId?: number

  @ApiProperty({
    example: '1',
    type: Number,
    required: false
  })
    streetId?: number
}
