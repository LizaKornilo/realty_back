import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderDto {
  @ApiProperty({
    example: new Date(2022, 6, 25, 13, 30, 0),
  })
  start_date: Date;

  @ApiProperty({
    example: new Date(2022, 6, 27, 13, 30, 0),
  })
  end_date: Date;

  @ApiProperty({
    example: 6,
  })
  dwellingId: number;
}
