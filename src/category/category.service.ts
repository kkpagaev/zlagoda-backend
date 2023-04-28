import { Injectable } from "@nestjs/common"
import { CreateCategoryDto } from "./dto/create-category.dto"
import { UpdateCategoryDto } from "./dto/update-category.dto"
import { Category } from "./entities/category.model"
import { CategoryRepository } from "./category.repository"
import { throwIfNoValue } from "src/shared/utils/throw-if-no-value"
import { NotFoundException } from "@nestjs/common"

@Injectable()
export class CategoryService {
  constructor(private readonly repo: CategoryRepository) {}

  public create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.repo.save(createCategoryDto)
  }

  public findAll(): Promise<Category[]> {
    return this.repo.findAllWithProductCount()
  }

  public findOne(id: number): Promise<Category | null> {
    return this.repo
      .findOne(id)
      .then(throwIfNoValue(() => new NotFoundException("Category not found")))
  }

  public update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.repo.update(id, updateCategoryDto)
  }

  public remove(id: number) {
    return this.repo.remove(id)
  }
}
