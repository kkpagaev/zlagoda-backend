import { ApiProperty } from "@nestjs/swagger"
import { IsISO8601, IsNotEmpty, IsNumber, IsOptional } from "class-validator"

export class CreateCheckDto {
  @IsNotEmpty()
  @ApiProperty()
  checkNumber: string

  @IsNotEmpty()
  @ApiProperty()
  employeeId: string

  @IsNotEmpty()
  @ApiProperty()
  @IsOptional()
  cardNumber?: string

  @IsNotEmpty()
  @IsISO8601({ strict: true })
  @ApiProperty({ type: "string", format: "date" })
  printDate: string

  @IsNumber()
  @ApiProperty()
  sumTotal: number

  @IsNumber()
  @ApiProperty()
  valueAddedTax: number
}
