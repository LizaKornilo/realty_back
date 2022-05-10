import { ApiProperty } from "@nestjs/swagger";

export class CreateDwellingDto {
  @ApiProperty({
    example: "1-room apartment for rent"
  })
  name: string;

  @ApiProperty({
    example: 100.25,
    type: "numeric",
  })
  price: number;

  @ApiProperty({
    type: 'string',
    format: 'binary',
  })
  image: any;

  @ApiProperty({
    description: 'array converted to a JSON string',
    example: '[1, 2]',
    type: String,
  })
  tagIds: string;
}
