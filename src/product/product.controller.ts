import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from "@nestjs/common"
import { ProductService } from "./product.service"
import { CreateProductDto } from "./dto/create-product.dto"
import { UpdateProductDto } from "./dto/update-product.dto"
import { ApiTags } from "@nestjs/swagger"

@ApiTags("Product")
@Controller("products")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  public create(@Body() createProductDto: CreateProductDto) {
    return this.productService.save(createProductDto)
  }

  @Get()
  public findAll() {
    return this.productService.findAll()
  }

  @Get(":id")
  public findOne(@Param("id", ParseIntPipe) id: number) {
    return this.productService.findOne(id)
  }

  @Patch(":id")
  public update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(id, updateProductDto)
  }

  @Delete(":id")
  public remove(@Param("id", ParseIntPipe) id: number) {
    return this.productService.remove(id)
  }
}
