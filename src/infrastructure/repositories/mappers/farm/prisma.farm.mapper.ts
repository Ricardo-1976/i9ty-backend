import { Farm as RawFarm } from '@prisma/client';
import { Farm } from '@/domain/entities/farm/farm';

export class PrismaFarmMapper {
  static toPrisma(farm: Farm): RawFarm {
    return {
      id: farm.id,
      cpfCnpj: farm.cpfCnpj,
      producerName: farm.producerName,
      farmName: farm.farmName,
      city: farm.city,
      state: farm.state,
      totalAreaHa: farm.totalAreaHa,
      arableAreaHa: farm.arableAreaHa,
      vegetationAreaHa: farm.vegetationAreaHa,
      createdAt: farm.createdAt,
      updatedAt: farm.updatedAt,
    };
  }

  static toDomain(raw: RawFarm): Farm {
    return new Farm({
      id: raw.id,
      cpfCnpj: raw.cpfCnpj,
      producerName: raw.producerName,
      farmName: raw.farmName,
      city: raw.city,
      state: raw.state,
      totalAreaHa: raw.totalAreaHa,
      arableAreaHa: raw.arableAreaHa,
      vegetationAreaHa: raw.vegetationAreaHa,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt ?? new Date(),
    },
);
  }
}
