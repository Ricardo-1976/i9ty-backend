import { IFarmCultureRepository } from "@/domain/repositories/farmCulture/farm.culture.repository";
import { PrismaService } from "@/infrastructure/database/prisma.service";
import { Injectable } from "@nestjs/common";
import { FarmCulture } from "@prisma/client";

@Injectable()
export class PrismaFarmCultureRepository implements IFarmCultureRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(farmId: string, cultureId: number): Promise<void> {
    const farmCultureData = {
      farmId,
      cultureId,
    };
  
    await this.prisma.farmCulture.create({
      data: farmCultureData,
    });
  }
  
  async findByFarmId(farmId: string): Promise<FarmCulture | null> {
    const raw = await this.prisma.farmCulture.findFirst({
      where: {
        farmId,
        deletedAt: null,
      },
    });

    if (!raw) return null;
    return raw;
  }

  async delete(farmId: string): Promise<void> {
    await this.prisma.farmCulture.updateMany({
      data: {
        deletedAt: new Date(),
      },
      where: {
        farmId,
        deletedAt: null,
      },
    });
  }

  async listCropIndicatorsByState(): Promise<{ state: string; crop: string; farmCount: number }[]> {
    const records = await this.prisma.farmCulture.findMany({
      where: {
        farm: {
          deletedAt: null,
        },
      },
      include: {
        farm: {
          select: {
            state: true,
          },
        },
        culture: {
          select: {
            name: true,
          },
        },
      },
    });
  
    // Agrupar manualmente os resultados
    const grouped: Record<string, { state: string; crop: string; farmCount: number }> = {};
  
    for (const item of records) {
      const key = `${item.farm.state}_${item.culture.name}`;
      if (!grouped[key]) {
        grouped[key] = {
          state: item.farm.state,
          crop: item.culture.name,
          farmCount: 0,
        };
      }
      grouped[key].farmCount++;
    }
  
    return Object.values(grouped);
  }

}
