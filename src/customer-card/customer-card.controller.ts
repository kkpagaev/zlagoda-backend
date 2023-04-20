import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common"
import { CustomerCardService } from "./customer-card.service"
import { CreateCustomerCardDto } from "./dto/create-customer-card.dto"
import { UpdateCustomerCardDto } from "./dto/update-customer-card.dto"
import { ApiTags } from "@nestjs/swagger"

@ApiTags("CustomerCard")
@Controller("customer-cards")
export class CustomerCardController {
  constructor(private readonly customerCardService: CustomerCardService) {}

  @Post()
  public create(@Body() createCustomerCardDto: CreateCustomerCardDto) {
    return this.customerCardService.create(createCustomerCardDto)
  }

  @Get()
  public findAll() {
    return this.customerCardService.findAll()
  }

  @Get(":number")
  public findOne(@Param("number") cardNumber: string) {
    return this.customerCardService.findOne(cardNumber)
  }

  @Patch(":number")
  public update(
    @Param("number") cardNumber: string,
    @Body() updateCustomerCardDto: UpdateCustomerCardDto,
  ) {
    return this.customerCardService.update(cardNumber, updateCustomerCardDto)
  }

  @Delete(":number")
  public remove(@Param("number") cardNumber: string) {
    return this.customerCardService.remove(cardNumber)
  }
}
