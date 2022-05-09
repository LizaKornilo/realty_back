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
    example: "some other image",
    required: false,
  })
  image?: string;

  @ApiProperty({
    example: [1, 2],
    type: [Number],
    required: false,
  })
  tagIds?: number[];
}
