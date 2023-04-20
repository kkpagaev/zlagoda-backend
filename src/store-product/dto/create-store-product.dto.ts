import { ApiProperty } from "@nestjs/swagger"
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from "class-validator"

export class CreateStoreProductDto {
  @IsNotEmpty()
  @ApiProperty()
  upc: string

  @IsOptional()
  @IsNotEmpty()
  @ApiProperty()
  upcProm?: string

  @IsInt()
  @ApiProperty()
  productId: number

  @IsNumber()
  @ApiProperty()
  sellingPrice: number

  @IsInt()
  @ApiProperty()
  numberOfProducts: number

  @IsBoolean()
  @ApiProperty()
  isPromotional: boolean
}
