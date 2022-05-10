import { ApiProperty } from "@nestjs/swagger";

export class UpdateDwellingDto {
  @ApiProperty({
    example: "2-room flat for rent",
    required: false,
  })
  name?: string;

  @ApiProperty({
    example: 200,
    type: "numeric",
    required: false,
  })
  price?: number;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: false,
  })
  image?: any;

  @ApiProperty({
    description: 'array converted to a JSON string',
    example: '[1, 2]',
    type: String,
    required: false,
  })
  tagIds?: string;

  @ApiProperty({
    example: "Poland",
    required: false,
  })
  countryValue?: string;

  @ApiProperty({
    example: "Krakov",
    required: false,
  })
  cityValue?: string;

  @ApiProperty({
    example: "Pushkin Street",
    required: false,
  })
  streetValue?: string;
}
