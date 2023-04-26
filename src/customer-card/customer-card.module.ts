import { Module } from "@nestjs/common"
import { CustomerCardService } from "./customer-card.service"
import { CustomerCardController } from "./customer-card.controller"
import { DbModule } from "src/db/db.module"
import { CustomerCardRepository } from "./customer-card.repository"

@Module({
  imports: [DbModule],
  controllers: [CustomerCardController],
  providers: [CustomerCardService, CustomerCardRepository],
  exports: [CustomerCardService, CustomerCardRepository],
})
export class CustomerCardModule {}
