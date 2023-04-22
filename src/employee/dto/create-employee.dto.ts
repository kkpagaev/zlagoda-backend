import { ApiProperty } from "@nestjs/swagger"
import {
  IsISO8601,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  ValidateBy,
} from "class-validator"
import { Role } from "../entities/employee.model"

export class CreateEmployeeDto {
  @IsNotEmpty()
  @ApiProperty()
  id: string

  @IsNotEmpty()
  @ApiProperty()
  surname: string

  @IsNotEmpty()
  @ApiProperty()
  name: string

  @IsNotEmpty()
  @IsOptional()
  @ApiProperty()
  patronymic?: string

  @IsNotEmpty()
  @ApiProperty()
  password: string

  @IsIn([Role.Cashier, Role.Manager])
  @ApiProperty({
    enum: Role,
  })
  role: Role

  @IsNumber()
  @ValidateBy(
    {
      name: "isGreaterThanZero",
      validator: {
        validate: (value) => value > 0,
      },
    },
    {
      message: "Salary must be greater than zero",
    },
  )
  @ApiProperty({
    example: 1000,
  })
  salary: number

  @IsISO8601({ strict: true })
  @ApiProperty({ type: "string", format: "date" })
  birthDate: string

  @IsISO8601({ strict: true })
  @ApiProperty({ type: "string", format: "date" })
  startDate: string

  @IsPhoneNumber()
  @ApiProperty({
    example: "+380990122450",
  })
  phoneNumber: string

  @ApiProperty()
  @IsNotEmpty()
  city: string

  @ApiProperty()
  @IsNotEmpty()
  street: string

  @ApiProperty()
  @IsNotEmpty()
  zipCode: string
}
