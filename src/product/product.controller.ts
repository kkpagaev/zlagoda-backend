import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from "@nestjs/common"
import { ProductService } from "./product.service"
import { CreateProductDto } from "./dto/create-product.dto"
import { UpdateProductDto } from "./dto/update-product.dto"
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger"
import { ProductFilterQuery } from "./dto/product-filter-query.dto"

@ApiTags("Product")
@Controller("products")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiBearerAuth("jwt")
  public create(@Body() createProductDto: CreateProductDto) {
    return this.productService.save(createProductDto)
  }

  @Get()
  @ApiBearerAuth("jwt")
  public findAll(@Query() query: ProductFilterQuery) {
    return this.productService.findAll(query)
  }

  @Get(":id")
  @ApiBearerAuth("jwt")
  public findOne(@Param("id", ParseIntPipe) id: number) {
    return this.productService.findOne(id)
  }

  @Patch(":id")
  @ApiBearerAuth("jwt")
  public update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(id, updateProductDto)
  }

  @Delete(":id")
  @ApiBearerAuth("jwt")
  public remove(@Param("id", ParseIntPipe) id: number) {
    return this.productService.remove(id)
  }
}
