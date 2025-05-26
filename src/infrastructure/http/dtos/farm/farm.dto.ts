import { IsPositive, IsString, IsNotEmpty, IsDate } from 'class-validator';

export class CreateFarmDto {
  @IsString()
  @IsNotEmpty({ message: 'CPF/CNPJ is required.' })
  cpfCnpj: string;

  @IsString()
  @IsNotEmpty({ message: 'Producer name is required.' })
  producerName: string;

  @IsString()
  @IsNotEmpty({ message: 'Farm name is required.' })
  farmName: string;

  @IsString()
  @IsNotEmpty({ message: 'City is required.' })
  city: string;

  @IsString()
  @IsNotEmpty({ message: 'State is required.' })
  state: string;

  @IsPositive({ message: 'Total area must be greater than zero.' })
  totalAreaHa: number;

  @IsPositive({ message: 'Arable area must be greater than zero.' })
  arableAreaHa: number;

  @IsPositive({ message: 'Vegetation area must be greater than zero.' })
  vegetationAreaHa: number;

  cultureIds?: number[];
}

export class UpdateFarmDto {
  @IsString()
  @IsNotEmpty({ message: 'CPF/CNPJ is required.' })
  cpfCnpj: string;

  @IsString()
  @IsNotEmpty({ message: 'Producer name is required.' })
  producerName: string;

  @IsString()
  @IsNotEmpty({ message: 'Farm name is required.' })
  farmName: string;

  @IsString()
  @IsNotEmpty({ message: 'City is required.' })
  city: string;

  @IsString()
  @IsNotEmpty({ message: 'State is required.' })
  state: string;

  @IsPositive({ message: 'Total area must be greater than zero.' })
  totalAreaHa: number;

  @IsPositive({ message: 'Arable area must be greater than zero.' })
  arableAreaHa: number;

  @IsPositive({ message: 'Vegetation area must be greater than zero.' })
  vegetationAreaHa: number;

  @IsDate({ message: 'Updated at must be a valid date.' })
  updatedAt: Date;

  cultureIds?: number[];
}
