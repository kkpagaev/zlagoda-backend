import { Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { DbModule } from "./db/db.module"
import { ConfigModule } from "@nestjs/config"
import { AuthModule } from "./auth/auth.module"
import { EmployeeModule } from "./employee/employee.module"
import { CategoryModule } from "./category/category.module"
import { ProductModule } from "./product/product.module"
import { StoreProductModule } from "./store-product/store-product.module"
import { CustomerCardModule } from "./customer-card/customer-card.module"
import { CheckModule } from "./check/check.module"

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [".env", ".env." + process.env.NODE_ENV],
    }),
    DbModule,
    EmployeeModule,
    AuthModule,
    CategoryModule,
    ProductModule,
    StoreProductModule,
    CustomerCardModule,
    CheckModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
