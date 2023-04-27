import { Module } from "@nestjs/common"
import { CategoryModule } from "src/category/category.module"
import { CheckModule } from "src/check/check.module"
import { CustomerCardModule } from "src/customer-card/customer-card.module"
import { DbModule } from "src/db/db.module"
import { EmployeeModule } from "src/employee/employee.module"
import { ProductModule } from "src/product/product.module"
import { SaleModule } from "src/sale/sale.module"
import { StoreProductModule } from "src/store-product/store-product.module"
import { SeedService } from "./seed.service"

@Module({
  imports: [
    DbModule,
    CategoryModule,
    CheckModule,
    SaleModule,
    ProductModule,
    EmployeeModule,
    CustomerCardModule,
    StoreProductModule,
  ],
  providers: [SeedService],
})
export class SeedModule {}
