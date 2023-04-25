import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class EmployeeSearchQuery {
  @IsNotEmpty()
  @ApiProperty()
  surname: string
}
