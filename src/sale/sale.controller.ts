import { Controller, Get, Param, Query } from "@nestjs/common"
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger"
import { DateQuery } from "./dto/date-query.dto"
import { SaleService } from "./sale.service"

@Controller("sale")
@ApiTags("sale")
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Get("revenue")
  @ApiBearerAuth("jwt")
  public getTotalRevenue(@Query() dateQuery: DateQuery) {
    return this.saleService.getTotalRevenue(dateQuery)
  }

  @Get("revenue/:id")
  @ApiBearerAuth("jwt")
  public getTotalRevenueByCashier(
    @Param("id") employeeId: string,
    @Query() dateQuery: DateQuery,
  ) {
    return this.saleService.getTotalRevenueByCashier(employeeId, dateQuery)
  }

  @Get("/sold-products/:upc")
  @ApiBearerAuth("jwt")
  public countSoldProductsByUpc(
    @Param("upc") upc: string,
    @Query() dateQuery: DateQuery,
  ) {
    return this.saleService.countSoldProductsByUpc(upc, dateQuery)
  }

  @Get("/dashboard")
  @ApiBearerAuth("jwt")
  public countSoldProducts(@Query() dateQuery: DateQuery) {
    return this.saleService.countSoldProducts(dateQuery)
  }
}
