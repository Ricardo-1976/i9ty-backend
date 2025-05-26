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
      },
    });

    if (!raw) return null;
    return raw;
  }

  async delete(farmId: string): Promise<void> {
    await this.prisma.farmCulture.deleteMany({
      where: {
        farmId,
      },
    });
  }

  async listCropIndicatorsByState(): Promise<{ state: string; crop: string; farmCount: number }[]> {
    const records = await this.prisma.farmCulture.findMany({
      include: {
        farm: {
          select: {
            id: true,     
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
  
    const grouped: Record<string, { state: string; crop: string; farmCount: number }> = {};
    const uniqueFarms = new Set<string>();
  
    for (const item of records) {
      const uniqueKey = `${item.farm.state}_${item.culture.name}_${item.farm.id}`;
      const groupKey = `${item.farm.state}_${item.culture.name}`;
  
      if (!uniqueFarms.has(uniqueKey)) {
        uniqueFarms.add(uniqueKey);
  
        if (!grouped[groupKey]) {
          grouped[groupKey] = {
            state: item.farm.state,
            crop: item.culture.name,
            farmCount: 0,
          };
        }
  
        grouped[groupKey].farmCount++;
      }
    }
  
    return Object.values(grouped);
  }
  
}