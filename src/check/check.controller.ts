import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from "@nestjs/common"
import { CheckService } from "./check.service"
import { CreateCheckDto } from "./dto/create-check.dto"
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger"
import { DateQuery } from "src/sale/dto/date-query.dto"

@ApiTags("Check")
@Controller("checks")
export class CheckController {
  constructor(private readonly checkService: CheckService) {}

  @Post()
  @ApiBearerAuth("jwt")
  public create(@Body() createCheckDto: CreateCheckDto) {
    return this.checkService.create(createCheckDto)
  }

  @Get()
  @ApiBearerAuth("jwt")
  public findAll() {
    return this.checkService.findAll()
  }

  @Get("/by-dates")
  @ApiBearerAuth("jwt")
  public findByDates(@Query() query: DateQuery) {
    return this.checkService.findAllByDates(query)
  }

  @Get("/by-dates/:employeeId")
  @ApiBearerAuth("jwt")
  public findByDatesAndCashier(
    @Query() query: DateQuery,
    @Param("employeeId") employeeId: string,
  ) {
    return this.checkService.findAllByDatesAndCashier(employeeId, query)
  }

  @Get(":number")
  @ApiBearerAuth("jwt")
  public findOne(@Param("number") checkNumber: string) {
    return this.checkService.findOne(checkNumber)
  }

  @Delete(":number")
  @ApiBearerAuth("jwt")
  public remove(@Param("number") checkNumber: string) {
    return this.checkService.remove(checkNumber)
  }
}
