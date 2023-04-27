/* eslint-disable @typescript-eslint/no-floating-promises */
import { Injectable } from "@nestjs/common"
import { CategoryService } from "src/category/category.service"
import { CheckRepository } from "src/check/check.repository"
import { CustomerCardService } from "src/customer-card/customer-card.service"
import { CreateEmployeeDto } from "src/employee/dto/create-employee.dto"
import { EmployeeService } from "src/employee/employee.service"
import { Role } from "src/employee/entities/employee.model"
import { StoreProductService } from "src/store-product/store-product.service"
import { faker } from "@faker-js/faker"
import { ProductService } from "src/product/product.service"
import { CreateCategoryDto } from "src/category/dto/create-category.dto"
import { CreateProductDto } from "src/product/dto/create-product.dto"
import { CreateStoreProductDto } from "src/store-product/dto/create-store-product.dto"
import { CreateCustomerCardDto } from "src/customer-card/dto/create-customer-card.dto"
import { CreateCheckDto } from "src/check/dto/create-check.dto"
import { CheckService } from "src/check/check.service"
import { CreateSaleDto } from "src/sale/dto/create-sale.dto"

@Injectable()
export class SeedService {
  constructor(
    private customerCardService: CustomerCardService,
    private categoryService: CategoryService,
    private checkRepository: CheckService,
    private productService: ProductService,
    private storeProductService: StoreProductService,
    private employeeService: EmployeeService,
  ) {}

  async seed() {
    for (let i = 0; i < 10; i++) {
      this.seedProduct()
    }

    for (let i = 0; i < 100; i++) {
      const employee = await this.seedEmployee()

      const card = await this.seedCustomerCard()

      this.seedCheck(employee.id, card.cardNumber)
    }
  }

  async seedCheck(employee: string, card: string) {
    const dto = await this.createCheckDto(employee, card)
    console.log(`creating check number: ${dto.checkNumber}`)
    const check = await this.checkRepository.create(dto)
    return check
  }

  async createCheckDto(employee: string, card: string) {
    const sales: Array<CreateSaleDto> = []
    for (let i = 0; i < Math.floor(Math.random() * 26) + 5; i++) {
      const storeProduct = await this.storeProductService.getRandom()
      sales.push({
        upc: storeProduct.upc,
        sellingPrice: storeProduct.sellingPrice,
        amount: faker.datatype.number({
          min: 1,
          max: 10,
        }),
      })
    }

    return {
      employeeId: employee,
      cardNumber: card,
      checkNumber: faker.datatype.number(1000000).toString(),
      sumTotal: faker.datatype.number(100000),
      printDate: faker.date.past().toISOString().split("T")[0],
      valueAddedTax: faker.datatype.number(100),
      sales: sales,
    }
  }

  async seedCustomerCard() {
    const dto = this.createCustomerCardDto()
    console.log(`creating customer card number: ${dto.cardNumber}`)
    const customerCard = await this.customerCardService.create(dto)
    return customerCard
  }

  createCustomerCardDto(): CreateCustomerCardDto {
    return {
      customer: {
        name: faker.name.firstName(),
        surname: faker.name.lastName(),
        patronymic: faker.name.middleName(),
      },
      address: {
        city: faker.address.city(),
        street: faker.address.street(),
        zipCode: faker.address.zipCode().substring(0, 5),
      },
      percent: faker.datatype.number(100),
      cardNumber: faker.datatype.number(1000000).toString(),
      phoneNumber: faker.phone.number().substring(0, 10),
    }
  }

  async seedProduct() {
    const dto = this.createCategoryDto()
    console.log(`creating category name: ${dto.name}`)
    const category = await this.categoryService.create(dto)

    for (let i = 0; i < Math.floor(Math.random() * 26) + 5; i++) {
      const productDto = this.createProductDto(category.number)
      console.log(`creating product name: ${productDto.name}`)
      const product = await this.productService.save(productDto)
      const storeProductDto = this.createStoreProductDto(product.id)
      console.log(`creating store product upc: ${storeProductDto.upc}`)
      await this.storeProductService.create(storeProductDto)
    }
  }

  async seedEmployee() {
    const dto = this.createEmployeeDto()
    console.log(`creating employee id: ${dto.id}`)
    const employee = await this.employeeService.create(dto)
    return employee
  }

  createProductDto(category: number): CreateProductDto {
    return {
      name: faker.commerce.productName(),
      characteristics: faker.commerce.productDescription().substring(0, 80),
      categoryNumber: category,
    }
  }

  createStoreProductDto(product: number): CreateStoreProductDto {
    return {
      upc: faker.datatype.number(1000000).toString(),
      productId: product,
      numberOfProducts: faker.datatype.number(100),
      sellingPrice: faker.datatype.number({
        min: 100,
        max: 1000,
      }),
      isPromotional: faker.datatype.boolean(),
    }
  }

  createEmployeeDto(): CreateEmployeeDto {
    return {
      id: faker.datatype.number(1000000).toString(),
      city: faker.address.city(),
      name: faker.name.firstName(),
      role: faker.helpers.arrayElement(Object.values(Role)),
      salary: faker.datatype.number({
        min: 10000,
        max: 100000,
      }),
      patronymic: faker.name.middleName(),
      street: faker.address.street(),
      surname: faker.name.lastName(),
      zipCode: faker.address.zipCode().substring(0, 6),
      password: "12345678",
      birthDate: faker.date.past().toISOString().split("T")[0],
      startDate: faker.date.past().toISOString().split("T")[0],
      phoneNumber: faker.phone.number().substring(0, 10),
    }
  }

  createCategoryDto(): CreateCategoryDto {
    return {
      name: faker.commerce.department(),
    }
  }
}
