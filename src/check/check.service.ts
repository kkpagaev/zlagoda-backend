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
          const sales = await this.saleRepo.findAllForCheck(check.checkNumber)
          check.sales = sales
          return check
        }),
      ),
    )
  }

  public findOne(checkNumber: string) {
    return this.checkRepo.findOneOrFail(checkNumber)
  }

  public remove(checkNumber: string) {
    return this.checkRepo.remove(checkNumber)
  }
}
