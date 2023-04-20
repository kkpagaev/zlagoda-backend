import { PartialType } from "@nestjs/swagger"
import { CreateStoreProductDto } from "./create-store-product.dto"

export class UpdateStoreProductDto extends PartialType(CreateStoreProductDto) {}
