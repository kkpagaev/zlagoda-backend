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

@Injectable()
export class SeedService {
  constructor(
    private customerCardService: CustomerCardService,
    private categoryService: CategoryService,
    private checkRepository: CheckRepository,
    private productService: ProductService,
    private storeProductService: StoreProductService,
    private employeeService: EmployeeService,
  ) {}

  seed() {
    for (let i = 0; i < 100; i++) {
      this.seedEmployee()
    }

    for (let i = 0; i < 100; i++) {
      this.seedCategory()
    }
  }

  async seedCategory() {
    const dto = this.createCategoryDto()
    console.log(`creating category name: ${dto.name}`)
    const category = await this.categoryService.create(dto)
  }

  async seedEmployee() {
    const dto = this.createEmployeeDto()
    console.log(`creating employee id: ${dto.id}`)
    const employee = await this.employeeService.create(dto)
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
