import { Controller, Get, Param, Query } from "@nestjs/common"
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger"
import { DateQuery } from "./dto/date-query.dto"
import { SaleService } from "./sale.service"

@Controller("sale")
@ApiTags("sale")
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Get("employee/:id")
  @ApiBearerAuth("jwt")
  public findAllForEmployee(
    @Param("id") employeeId: string,
    @Query() dateQuery: DateQuery,
  ) {
    return this.saleService.getSumOfSoldProductsByCashierId({
      employeeId: +employeeId,
      dateQuery,
    })
  }

  @Get("product/:id")
  @ApiBearerAuth("jwt")
  public findAllForProduct(
    @Param("id") productId: string,
    @Query() dateQuery: DateQuery,
  ) {
    return this.saleService.getSumOfSoldProductByProductNumber(
      +productId,
      dateQuery,
    )
  }

  @Get()
  @ApiBearerAuth("jwt")
  public findAll(@Query() dateQuery: DateQuery) {
    return this.saleService.getSumOfSoldProductsByAllCashiers(dateQuery)
  }
}
