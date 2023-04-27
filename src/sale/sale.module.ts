import { Module } from "@nestjs/common"
import { SaleService } from "./sale.service"
import { DbModule } from "src/db/db.module"
import { SaleRepository } from "./sale.repository"

@Module({
  imports: [DbModule],
  providers: [SaleService, SaleRepository],
  exports: [SaleService, SaleRepository],
})
export class SaleModule {}
