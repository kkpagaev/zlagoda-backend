import { Module } from "@nestjs/common"
import { StoreProductService } from "./store-product.service"
import { StoreProductController } from "./store-product.controller"
import { StoreProductRepository } from "./store-product.repository"
import { DbModule } from "src/db/db.module"

@Module({
  imports: [DbModule],
  controllers: [StoreProductController],
  providers: [StoreProductService, StoreProductRepository],
})
export class StoreProductModule {}
