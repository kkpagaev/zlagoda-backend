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
import { CategoryService } from "./category.service"
import { CreateCategoryDto } from "./dto/create-category.dto"
import { UpdateCategoryDto } from "./dto/update-category.dto"
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger"

@ApiTags("Category")
@Controller("categories")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiBearerAuth("jwt")
  public create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto)
  }

  @Get()
  @ApiBearerAuth("jwt")
  public findAll() {
    return this.categoryService.findAll()
  }

  @Get(":id")
  @ApiBearerAuth("jwt")
  public findOne(@Param("id", ParseIntPipe) id: number) {
    return this.categoryService.findOne(id)
  }

  @Patch(":id")
  @ApiBearerAuth("jwt")
  public update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto)
  }

  @Delete(":id")
  @ApiBearerAuth("jwt")
  public remove(@Param("id", ParseIntPipe) id: number) {
    return this.categoryService.remove(id)
  }
}
