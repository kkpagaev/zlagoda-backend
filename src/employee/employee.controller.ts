import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common"
import { EmployeeService } from "./employee.service"
import { CreateEmployeeDto } from "./dto/create-employee.dto"
import { UpdateEmployeeDto } from "./dto/update-employee.dto"
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger"
import { Public } from "../auth/public.decorator"
import { EmployeeFilterQuery } from "./dto/filter-query.dto"
import { EmployeeSearchQuery } from "./dto/employee-search-query.dto"

@ApiTags("Employee")
@Controller("employees")
export class EmployeeController {
  constructor(private readonly service: EmployeeService) {}

  @Post()
  @Public()
  public create(@Body() dto: CreateEmployeeDto) {
    return this.service.create(dto)
  }

  @Get()
  @ApiBearerAuth("jwt")
  public findAll(@Query() query: EmployeeFilterQuery) {
    return this.service.findAll(query)
  }

  @Get("/search")
  public findOneBySurname(@Query() query: EmployeeSearchQuery) {
    return this.service.findOneBySurname(query.surname)
  }

  @Get(":id")
  public findOne(@Param("id") id: string) {
    return this.service.findOne(id)
  }

  @Patch(":id")
  public update(@Param("id") id: string, @Body() dto: UpdateEmployeeDto) {
    return this.service.update(id, dto)
  }

  @Delete(":id")
  public remove(@Param("id") id: string) {
    return this.service.remove(id)
  }
}
