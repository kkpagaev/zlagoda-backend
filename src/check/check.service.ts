import { Injectable } from "@nestjs/common"
import { CreateCheckDto } from "./dto/create-check.dto"
import { UpdateCheckDto } from "./dto/update-check.dto"
import { CheckRepository } from "./check.repository"

@Injectable()
export class CheckService {
  constructor(private readonly repo: CheckRepository) {}

  public create(createCheckDto: CreateCheckDto) {
    return this.repo.save(createCheckDto)
  }

  public findAll() {
    return this.repo.findAll()
  }

  public findOne(checkNumber: string) {
    return this.repo.findOneOrFail(checkNumber)
  }

  public update(checkNumber: string, updateCheckDto: UpdateCheckDto) {
    return this.repo.update(checkNumber, updateCheckDto)
  }

  public remove(checkNumber: string) {
    return this.repo.remove(checkNumber)
  }
}
