import { Module } from "@nestjs/common"
import { ProductService } from "./product.service"
import { ProductController } from "./product.controller"
import { DbModule } from "src/db/db.module"
import { ProductRepository } from "./product.repository"

@Module({
  imports: [DbModule],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
  exports: [ProductService],
})
export class ProductModule {}
