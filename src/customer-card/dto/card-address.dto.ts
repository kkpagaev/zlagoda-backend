import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsOptional } from "class-validator"

export class CardAddressDto {
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty()
  public city?: string

  @IsNotEmpty()
  @IsOptional()
  @ApiProperty()
  public street?: string

  @IsNotEmpty()
  @IsOptional()
  @ApiProperty()
  public zipCode?: string
}
