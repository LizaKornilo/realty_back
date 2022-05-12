import { ApiProperty } from "@nestjs/swagger";

export class CreateAddressDto {
  @ApiProperty({
    example: "Belarus"
  })
  countryValue: string;

  @ApiProperty({
    example: "Gomel"
  })
  cityValue: string;

  @ApiProperty({
    example: "Pushkin Street"
  })
  streetValue: string;
}
