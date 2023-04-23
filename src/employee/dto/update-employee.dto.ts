import { OmitType } from "@nestjs/swagger"
import { CreateEmployeeDto } from "./create-employee.dto"

export class UpdateEmployeeDto extends OmitType(CreateEmployeeDto, [
  "id",
  "password",
]) {}
