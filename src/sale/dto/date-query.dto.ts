import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsDate, IsNotEmpty } from "class-validator"

export class DateQuery {
  @ApiProperty({
    description: "The start date of the query",
    example: "2021-01-01",
    type: Date,
  })
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  public startDate: Date

  @ApiProperty({
    description: "The end date of the query",
    example: "2023-01-01",
    type: Date,
  })
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  public endDate: Date
}
