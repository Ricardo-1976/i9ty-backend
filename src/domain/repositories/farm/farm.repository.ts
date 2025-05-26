import { Farm } from '@prisma/client';
import { CreateFarmDto, UpdateFarmDto } from '@/infrastructure/http/dtos/farm/farm.dto';

export abstract class IFarmRepository {
  abstract create(data: CreateFarmDto): Promise<Farm>;
  abstract findById(id: string): Promise<Farm | null>;
  abstract findByCpfCnpj(cpfCnpj: string): Promise<Farm | null>;
  abstract update(id: string, data: UpdateFarmDto): Promise<Farm | null>;
  abstract delete(id: string): Promise<void>;
  abstract countTotalFarms(): Promise<number>;
  abstract sumTotalHectares(): Promise<number>;
}

