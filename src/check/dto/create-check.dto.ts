import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsISO8601, IsNotEmpty, IsNumber, IsOptional } from "class-validator"
import { CreateSaleDto } from "src/sale/dto/create-sale.dto"

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

  @ApiProperty({
    type: [CreateSaleDto],
  })
  @Type(() => CreateSaleDto)
  sales: CreateSaleDto[]
}
