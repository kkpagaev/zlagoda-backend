import { Injectable } from "@nestjs/common"
import { CreateCheckDto } from "./dto/create-check.dto"
import { CheckRepository } from "./check.repository"
import { SaleRepository } from "src/sale/sale.repository"

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
    return this.checkRepo.findAll().then((checks) =>
      Promise.all(
        checks.map(async (check) => {
          check.sales = await this.saleRepo.findAllForCheck(check.checkNumber)
          return check
        }),
      ),
    )
  }

  public async findOne(checkNumber: string) {
    const check = await this.checkRepo.findOneOrFail(checkNumber)
    check.sales = await this.saleRepo.findAllForCheck(check.checkNumber)
    return check
  }

  public remove(checkNumber: string) {
    return this.checkRepo.remove(checkNumber)
  }
}
