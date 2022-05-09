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
    example: "image",
  })
  image: string;

  @ApiProperty({
    example: [1],
    type: [Number],
  })
  tagIds: number[];
}
