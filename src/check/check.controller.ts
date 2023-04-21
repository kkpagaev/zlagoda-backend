import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common"
import { CheckService } from "./check.service"
import { CreateCheckDto } from "./dto/create-check.dto"
import { UpdateCheckDto } from "./dto/update-check.dto"
import { ApiTags } from "@nestjs/swagger"

@ApiTags("Check")
@Controller("checks")
export class CheckController {
  constructor(private readonly checkService: CheckService) {}

  @Post()
  public create(@Body() createCheckDto: CreateCheckDto) {
    return this.checkService.create(createCheckDto)
  }

  @Get()
  public findAll() {
    return this.checkService.findAll()
  }

  @Get(":number")
  public findOne(@Param("number") checkNumber: string) {
    return this.checkService.findOne(checkNumber)
  }

  @Patch(":number")
  public update(
    @Param("number") checkNumber: string,
    @Body() updateCheckDto: UpdateCheckDto,
  ) {
    return this.checkService.update(checkNumber, updateCheckDto)
  }

  @Delete(":number")
  public remove(@Param("number") checkNumber: string) {
    return this.checkService.remove(checkNumber)
  }
}
