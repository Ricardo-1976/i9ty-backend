import { IsPositive, IsString, IsNotEmpty, IsDate, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

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

export class CultureDto {
  name: string;
}

export class FarmResponseDto {
  id: string;

  cpfCnpj: string;

  producerName: string;

  farmName: string;

  city: string;

  state: string;

  totalAreaHa: number;

  arableAreaHa: number;

  vegetationAreaHa: number;

  cultures: CultureDto[];
}

export class FindFarmsQueryDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'Farm ID' })
  id?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'Producer CPF or CNPJ' })
  cpfCnpj?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'Producer name' })
  producerName?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'Farm name' })
  farmName?: string;
}

