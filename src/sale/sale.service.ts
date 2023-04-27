import { Injectable } from "@nestjs/common"
import { CreateSaleDto } from "./dto/create-sale.dto"
import { DateQuery } from "./dto/date-query.dto"
import { UpdateSaleDto } from "./dto/update-sale.dto"
import { SaleRepository } from "./sale.repository"

@Injectable()
export class SaleService {
  constructor(private readonly repo: SaleRepository) {}

  public create(checkNumber: string, createCheckDto: CreateSaleDto) {
    return this.repo.save(checkNumber, createCheckDto)
  }

  public findAll() {
    return this.repo.findAll()
  }

  public findOne(checkNumber: string) {
    return this.repo.findOneOrFail(checkNumber)
  }

  public update(checkNumber: string, updateCheckDto: UpdateSaleDto) {
    return this.repo.update(checkNumber, updateCheckDto)
  }

  public remove(checkNumber: string) {
    return this.repo.remove(checkNumber)
  }

  getSumOfSoldProductsByCashierId({
    employeeId,
    dateQuery,
  }: {
    employeeId: number
    dateQuery: DateQuery
  }) {
    return this.repo.getSumOfSoldProductsByCashierId(
      employeeId,
      dateQuery.startDate,
      dateQuery.endDate,
    )
  }

  getSumOfSoldProductByProductNumber(
    employeeId: number,
    { startDate, endDate }: DateQuery,
  ) {
    return this.repo.getSumOfSoldProductByProductNumber(
      employeeId,
      startDate,
      endDate,
    )
  }

  getSumOfSoldProductsByAllCashiers(dateQuery: DateQuery) {
    return this.repo.getSumOfSoldProductsByAllCashiers(
      dateQuery.startDate,
      dateQuery.endDate,
    )
  }
}
