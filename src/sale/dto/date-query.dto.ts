import { ApiProperty } from "@nestjs/swagger"
import { IsISO8601 } from "class-validator"

export class DateQuery {
  @ApiProperty({
    description: "The start date of the query",
    example: "2021-01-01",
    type: Date,
  })
  @IsISO8601({ strict: true })
  public startDate: string

  @ApiProperty({
    description: "The end date of the query",
    example: "2023-01-01",
    type: Date,
  })
  @IsISO8601({ strict: true })
  public endDate: string
}
