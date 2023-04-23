import { ApiProperty } from "@nestjs/swagger"
import { Transform } from "class-transformer"
import { IsNumber, IsOptional } from "class-validator"

export class ProductFilterQuery {
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => (value ? Number(value) : undefined))
  @ApiProperty({
    required: false,
  })
  categoryNumber?: number
}
