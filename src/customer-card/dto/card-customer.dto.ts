import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsOptional } from "class-validator"

export class CardCustomerDto {
  @IsNotEmpty()
  @ApiProperty()
  surname: string

  @IsNotEmpty()
  @ApiProperty()
  name: string

  @IsOptional()
  @IsNotEmpty()
  @ApiProperty()
  patronymic?: string
}
