import { Injectable, NotFoundException } from "@nestjs/common"
import { CreateStoreProductDto } from "./dto/create-store-product.dto"
import { UpdateStoreProductDto } from "./dto/update-store-product.dto"
import { StoreProductRepository } from "./store-product.repository"
import { throwIfNoValue } from "src/shared/utils/throw-if-no-value"
import { StoreProductQuery } from "./dto/prom-store-product-query.dto"

@Injectable()
export class StoreProductService {
  constructor(private readonly repo: StoreProductRepository) {}

  public create(createStoreProductDto: CreateStoreProductDto) {
    return this.repo.save(createStoreProductDto)
  }

  public findAll() {
    return this.repo.findAllSortByProductNumber()
  }

  public findOne(upc: string) {
    return this.repo
      .findOneWithProductInfo(upc)
      .then(
        throwIfNoValue(() => new NotFoundException("Store Product not found")),
      )
  }

  public update(upc: string, updateStoreProductDto: UpdateStoreProductDto) {
    return this.repo.update(upc, updateStoreProductDto)
  }

  public remove(upc: string) {
    return this.repo.remove(upc)
  }

  getRandom() {
    return this.repo.getRandom()
  }

  findAllFiltered(filter: StoreProductQuery) {
    return this.repo.filterProducts(filter)
  }
}
