import { IsInt, IsNotEmpty, IsPhoneNumber, Max, Min } from "class-validator"
import { CardCustomerDto } from "./card-customer.dto"
import { ApiProperty } from "@nestjs/swagger"
import { CardAddressDto } from "./card-address.dto"

export class CreateCustomerCardDto {
  @IsNotEmpty()
  @ApiProperty()
  public cardNumber: string

  @ApiProperty()
  public customer: CardCustomerDto

  @IsPhoneNumber()
  @ApiProperty()
  public phoneNumber: string

  @ApiProperty()
  public address: CardAddressDto

  @IsInt()
  @Min(0)
  @Max(100)
  @ApiProperty()
  public percent: number
}
