import { Injectable } from "@nestjs/common"
import { CreateCustomerCardDto } from "./dto/create-customer-card.dto"
import { UpdateCustomerCardDto } from "./dto/update-customer-card.dto"
import { CustomerCardRepository } from "./customer-card.repository"

@Injectable()
export class CustomerCardService {
  constructor(private readonly repo: CustomerCardRepository) {}

  public create(createCustomerCardDto: CreateCustomerCardDto) {
    return this.repo.save(createCustomerCardDto)
  }

  public findAll() {
    return this.repo.findAll()
  }

  public findOne(cardNumber: string) {
    return this.repo.findOneOrFail(cardNumber)
  }

  public update(
    cardNumber: string,
    updateCustomerCardDto: UpdateCustomerCardDto,
  ) {
    return this.repo.update(cardNumber, updateCustomerCardDto)
  }

  public remove(cardNumber: string) {
    return this.repo.remove(cardNumber)
  }
}
