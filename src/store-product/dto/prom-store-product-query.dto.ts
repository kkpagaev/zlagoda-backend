import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsBoolean, IsIn, IsOptional } from "class-validator"

enum PromStoreProductOrderBy {
  name = "name",
  products_number = "number",
}
export class StoreProductQuery {
  @IsIn(Object.values(PromStoreProductOrderBy))
  @IsOptional()
  @ApiProperty()
  orderBy: PromStoreProductOrderBy = PromStoreProductOrderBy.name

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  @Type(() => Boolean)
  isPromotional = true
}
