import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty } from "class-validator"

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string

  @ApiProperty()
  @IsNotEmpty()
  password: string

  @ApiProperty({
    example: "test@gmail.com",
  })
  @IsEmail()
  @IsNotEmpty()
  email: string
}
