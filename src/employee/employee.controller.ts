import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common"
import { EmployeeService } from "./employee.service"
import { CreateEmployeeDto } from "./dto/create-employee.dto"
import { UpdateEmployeeDto } from "./dto/update-employee.dto"
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger"
import { Public } from "../auth/public.decorator"

@ApiTags("Employee")
@Controller("employees")
export class EmployeeController {
  constructor(private readonly service: EmployeeService) {}

  @Post()
  @Public()
  create(@Body() dto: CreateEmployeeDto) {
    return this.service.create(dto)
  }

  @Get()
  @ApiBearerAuth("jwt")
  findAll() {
    return this.service.findAll()
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.service.findOne(id)
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateEmployeeDto) {
    return this.service.update(id, dto)
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.service.remove(id)
  }
}
