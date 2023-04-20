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

@Controller("categories")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  public create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto)
  }

  @Get()
  public findAll() {
    return this.categoryService.findAll()
  }

  @Get(":id")
  public findOne(@Param("id", ParseIntPipe) id: number) {
    return this.categoryService.findOne(id)
  }

  @Patch(":id")
  public update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto)
  }

  @Delete(":id")
  public remove(@Param("id", ParseIntPipe) id: number) {
    return this.categoryService.remove(id)
  }
}
