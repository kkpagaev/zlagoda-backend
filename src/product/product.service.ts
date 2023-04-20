import { Injectable } from "@nestjs/common"
import { CreateProductDto } from "./dto/create-product.dto"
import { UpdateProductDto } from "./dto/update-product.dto"
import { Product } from "./entities/product.model"
import { ProductRepository } from "./product.repository"

@Injectable()
export class ProductService {
  constructor(private readonly productRepo: ProductRepository) {}

  public save(createDto: CreateProductDto): Promise<Product> {
    return this.productRepo.save(createDto)
  }

  public findAll(): Promise<Product[]> {
    return this.productRepo.findAll()
  }

  public findOne(id: number): Promise<Product | null> {
    return this.productRepo.findOneOrFail(id)
  }

  public update(id: number, updateProductDto: UpdateProductDto) {
    return this.productRepo.update(id, updateProductDto)
  }

  public remove(id: number) {
    return this.productRepo.remove(id)
  }
}
