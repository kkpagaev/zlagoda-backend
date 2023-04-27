import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber } from "class-validator"

export class CreateSaleDto {
  @IsNotEmpty()
  @ApiProperty()
  upc: string

  @IsNumber()
  @ApiProperty()
  sellingPrice: number

  @IsNumber()
  @ApiProperty()
  amount: number
}
