import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class SignInDto {
  @ApiProperty()
  @IsNotEmpty()
  password: string

  @IsNotEmpty()
  @ApiProperty()
  employeeId: string
}
