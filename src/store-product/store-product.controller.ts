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
import { StoreProductService } from "./store-product.service"
import { CreateStoreProductDto } from "./dto/create-store-product.dto"
import { UpdateStoreProductDto } from "./dto/update-store-product.dto"
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger"
import { StoreProductQuery } from "./dto/prom-store-product-query.dto"

@ApiTags("StoreProduct")
@Controller("store-products")
export class StoreProductController {
  constructor(private readonly storeProductService: StoreProductService) {}

  @Post()
  public create(@Body() createStoreProductDto: CreateStoreProductDto) {
    return this.storeProductService.create(createStoreProductDto)
  }

  @Get()
  public findAll() {
    return this.storeProductService.findAll()
  }

  @Get("filter")
  @ApiBearerAuth("jwt")
  public findAllFiltered(@Query() filter: StoreProductQuery) {
    return this.storeProductService.findAllFiltered(filter)
  }

  @ApiBearerAuth("jwt")
  @Get(":upc")
  public findOne(@Param("upc") upc: string) {
    return this.storeProductService.findOne(upc)
  }

  @Patch(":upc")
  public update(
    @Param("upc") upc: string,
    @Body() updateStoreProductDto: UpdateStoreProductDto,
  ) {
    return this.storeProductService.update(upc, updateStoreProductDto)
  }

  @Delete(":upc")
  public remove(@Param("upc") upc: string) {
    return this.storeProductService.remove(upc)
  }
}
