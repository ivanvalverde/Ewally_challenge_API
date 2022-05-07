import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Boleto {
  @ApiProperty()
  barCode: string;

  @ApiProperty()
  amount: string;

  @ApiPropertyOptional()
  expirationDate?: string;
}
