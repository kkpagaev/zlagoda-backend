import { Injectable } from "@nestjs/common"
import { CreateSaleDto } from "./dto/create-sale.dto"
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
}
