import { Farm } from '@prisma/client';
import { CreateFarmDto, UpdateFarmDto, FarmResponseDto, FindFarmsQueryDto } from '@/infrastructure/http/dtos/farm/farm.dto';

export abstract class IFarmRepository {
  abstract create(data: CreateFarmDto): Promise<Farm>;
  abstract findById(id: string): Promise<Farm | null>;
  abstract findByCpfCnpj(cpfCnpj: string): Promise<Farm | null>;
  abstract update(id: string, data: UpdateFarmDto): Promise<FarmResponseDto | null>;
  abstract delete(id: string): Promise<void>;
  abstract getFarmIndicators(): Promise<{ totalFarms: number; totalHectares: number }>;
  abstract getFarm(filters: FindFarmsQueryDto): Promise<FarmResponseDto[]>;
}

