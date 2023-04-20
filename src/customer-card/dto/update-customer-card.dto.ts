import { PartialType } from '@nestjs/swagger';
import { CreateCustomerCardDto } from './create-customer-card.dto';

export class UpdateCustomerCardDto extends PartialType(CreateCustomerCardDto) {}
