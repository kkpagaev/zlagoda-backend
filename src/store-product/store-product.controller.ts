import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common"
import { StoreProductService } from "./store-product.service"
import { CreateStoreProductDto } from "./dto/create-store-product.dto"
import { UpdateStoreProductDto } from "./dto/update-store-product.dto"
import { ApiTags } from "@nestjs/swagger"

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
