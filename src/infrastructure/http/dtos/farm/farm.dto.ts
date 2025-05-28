import { IsPositive, IsString, IsNotEmpty, IsDate, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateFarmDto {
  
  id?: string;

  @ApiProperty({ description: 'CPF or CNPJ of the producer' })
  @IsString()
  @IsNotEmpty({ message: 'CPF/CNPJ is required.' })
  cpfCnpj: string;

  @ApiProperty({ description: 'Name of the producer' })
  @IsString()
  @IsNotEmpty({ message: 'Producer name is required.' })
  producerName: string;

  @ApiProperty({ description: 'Name of the farm' })
  @IsString()
  @IsNotEmpty({ message: 'Farm name is required.' })
  farmName: string;

  @ApiProperty({ description: 'City where the farm is located' })
  @IsString()
  @IsNotEmpty({ message: 'City is required.' })
  city: string;

  @ApiProperty({ description: 'State where the farm is located' })
  @IsString()
  @IsNotEmpty({ message: 'State is required.' })
  state: string;

  @ApiProperty({ description: 'Total area of the farm in hectares' })
  @IsPositive({ message: 'Total area must be greater than zero.' })
  totalAreaHa: number;

  @ApiProperty({ description: 'Arable area of the farm in hectares' })
  @IsPositive({ message: 'Arable area must be greater than zero.' })
  arableAreaHa: number;

  @ApiProperty({ description: 'Vegetation area of the farm in hectares' })
  @IsPositive({ message: 'Vegetation area must be greater than zero.' })
  vegetationAreaHa: number;

  @ApiProperty({ description: 'List of culture IDs associated with the farm', type: [Number], required: false })
  cultureIds?: number[];
}

export class UpdateFarmDto {
  @ApiProperty({ description: 'CPF or CNPJ of the producer' })
  @IsString()
  @IsNotEmpty({ message: 'CPF/CNPJ is required.' })
  cpfCnpj: string;

  @ApiProperty({ description: 'Name of the producer' })
  @IsString()
  @IsNotEmpty({ message: 'Producer name is required.' })
  producerName: string;

  @ApiProperty({ description: 'Name of the farm' })
  @IsString()
  @IsNotEmpty({ message: 'Farm name is required.' })
  farmName: string;

  @ApiProperty({ description: 'City where the farm is located' })
  @IsString()
  @IsNotEmpty({ message: 'City is required.' })
  city: string;

  @ApiProperty({ description: 'State where the farm is located' })
  @IsString()
  @IsNotEmpty({ message: 'State is required.' })
  state: string;

  @ApiProperty({ description: 'Total area of the farm in hectares' })
  @IsPositive({ message: 'Total area must be greater than zero.' })
  totalAreaHa: number;

  @ApiProperty({ description: 'Arable area of the farm in hectares' })
  @IsPositive({ message: 'Arable area must be greater than zero.' })
  arableAreaHa: number;

  @ApiProperty({ description: 'Vegetation area of the farm in hectares' })
  @IsPositive({ message: 'Vegetation area must be greater than zero.' })
  vegetationAreaHa: number;

  @ApiPropertyOptional({ description: 'List of culture IDs associated with the farm', type: [Number] })
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
  @ApiProperty({ description: 'Farm ID' })
  id?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'Producer CPF or CNPJ' })
  @ApiProperty({ description: 'Producer CPF or CNPJ' })
  cpfCnpj?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'Producer name' })
  @ApiProperty({ description: 'Producer name' })
  producerName?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'Farm name' })
  @ApiProperty({ description: 'Farm name' })
  farmName?: string;
}

