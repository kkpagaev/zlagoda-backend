import { Module } from "@nestjs/common"
import { EmployeeService } from "./employee.service"
import { EmployeeController } from "./employee.controller"
import { DbModule } from "../db/db.module"
import { EmployeeRepository } from "./employee.repository"

@Module({
  imports: [DbModule],
  controllers: [EmployeeController],
  providers: [EmployeeService, EmployeeRepository],
  exports: [EmployeeService, EmployeeRepository],
})
export class EmployeeModule {}
