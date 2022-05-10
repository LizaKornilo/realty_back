import { ApiProperty } from "@nestjs/swagger";

export class CreateTagDto {
  @ApiProperty({
    example: "office space"
  })
  value: string;
}
