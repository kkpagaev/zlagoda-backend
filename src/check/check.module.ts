import { Module } from "@nestjs/common"
import { CheckService } from "./check.service"
import { CheckController } from "./check.controller"
import { DbModule } from "src/db/db.module"
import { CheckRepository } from "./check.repository"
import { SaleModule } from "src/sale/sale.module"

@Module({
  imports: [DbModule, SaleModule],
  controllers: [CheckController],
  providers: [CheckService, CheckRepository],
  exports: [CheckService, CheckRepository],
})
export class CheckModule {}
