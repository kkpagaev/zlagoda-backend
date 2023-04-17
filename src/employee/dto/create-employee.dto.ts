import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class CreateEmployeeDto {
  @ApiProperty()
  @IsNotEmpty()
  empl_name: string

  @ApiProperty()
  @IsNotEmpty()
  empl_surname: string

  @ApiProperty()
  @IsNotEmpty()
  empl_patronymic: string

  @ApiProperty()
  @IsNotEmpty()
  password: string
}
