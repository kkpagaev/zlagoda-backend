import { Module } from "@nestjs/common"
import { CategoryService } from "./category.service"
import { CategoryController } from "./category.controller"
import { DbModule } from "src/db/db.module"
import { CategoryRepository } from "./category.repository"

@Module({
  imports: [DbModule],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository],
})
export class CategoryModule {}
