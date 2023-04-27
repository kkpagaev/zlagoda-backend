import { ApiProperty } from "@nestjs/swagger"
import { Transform, Type } from "class-transformer"
import { IsBoolean, IsIn, IsOptional } from "class-validator"

enum PromStoreProductOrderBy {
  name = "name",
  products_number = "number",
}
export class StoreProductQuery {
  @IsIn(Object.values(PromStoreProductOrderBy))
  @IsOptional()
  @ApiProperty({
    enum: PromStoreProductOrderBy,
    default: PromStoreProductOrderBy.name,
  })
  orderBy: PromStoreProductOrderBy = PromStoreProductOrderBy.name

  @IsBoolean()
  @IsOptional()
  @ApiProperty({})
  @Transform(({ value }) => {
    return value === "true"
  })
  isPromotional: boolean
}
