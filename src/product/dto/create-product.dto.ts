import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsNotEmpty } from "class-validator"

export class CreateProductDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string

  @IsNotEmpty()
  @ApiProperty()
  characteristics: string

  @IsInt()
  @ApiProperty()
  categoryNumber: number
}
