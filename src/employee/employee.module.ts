import { Module } from "@nestjs/common"
import { EmployeeService } from "./employee.service"
import { EmployeeController } from "./employee.controller"
import { DbModule } from "../db/db.module"

@Module({
  imports: [DbModule],
  controllers: [EmployeeController],
  providers: [EmployeeService],
  exports: [EmployeeService],
})
export class EmployeeModule {}
