import { Injectable } from "@nestjs/common"
import { CreateCheckDto } from "./dto/create-check.dto"
import { CheckRepository } from "./check.repository"
import { SaleRepository } from "src/sale/sale.repository"
import { DateQuery } from "src/sale/dto/date-query.dto"
import { Check } from "./entities/check.model"

@Injectable()
export class CheckService {
  constructor(
    private readonly checkRepo: CheckRepository,
    private readonly saleRepo: SaleRepository,
  ) {}

  public async create(createCheckDto: CreateCheckDto) {
    const check = await this.checkRepo.save(createCheckDto)

    check.sales = await this.saleRepo.saveMany(
      check.checkNumber,
      createCheckDto.sales ?? [],
    )

    return check
  }

  public findAll() {
    return this.checkRepo
      .findAll()
      .then((checks) => this.fillManyChecks(checks))
  }

  public findAllByDates(dateQuery: DateQuery): Promise<Check[]> {
    return this.checkRepo
      .findAllByDates(dateQuery.startDate, dateQuery.endDate)
      .then((checks) => this.fillManyChecks(checks))
  }

  public findAllByDatesAndCashier(
    employeeId: string,
    dateQuery: DateQuery,
  ): Promise<Check[]> {
    return this.checkRepo
      .findAllByDatesAndCashier(
        employeeId,
        dateQuery.startDate,
        dateQuery.endDate,
      )
      .then((checks) => this.fillManyChecks(checks))
  }

  public async findOne(checkNumber: string) {
    const check = await this.checkRepo.findOneOrFail(checkNumber)

    return this.fillCheck(check)
  }

  private async fillCheck(check: Check) {
    check.sales = await this.saleRepo.findAllForCheck(check.checkNumber)
    return check
  }

  private fillManyChecks(checks: Check[]) {
    return Promise.all(checks.map((check) => this.fillCheck(check)))
  }

  public remove(checkNumber: string) {
    return this.checkRepo.remove(checkNumber)
  }
}
