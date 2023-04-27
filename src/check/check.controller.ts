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
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger"

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

  @Get(":number")
  @ApiBearerAuth("jwt")
  public findOne(@Param("number") checkNumber: string) {
    return this.checkService.findOne(checkNumber)
  }

  @Patch(":number")
  @ApiBearerAuth("jwt")
  public update(
    @Param("number") checkNumber: string,
    @Body() updateCheckDto: UpdateCheckDto,
  ) {
    return this.checkService.update(checkNumber, updateCheckDto)
  }

  @Delete(":number")
  @ApiBearerAuth("jwt")
  public remove(@Param("number") checkNumber: string) {
    return this.checkService.remove(checkNumber)
  }
}
