import { Injectable } from '@nestjs/common';

import { IFarmRepository } from '../../../../domain/repositories/farm/farm.repository';
import { PrismaService } from '../../../../infrastructure/database/prisma.service';
import { PrismaFarmMapper } from '../../mappers/farm/prisma.farm.mapper';
import { Farm } from '../../../../domain/entities/farm/farm';
import { FarmResponseDto, type FindFarmsQueryDto } from '../../../../infrastructure/http/dtos/farm/farm.dto';

@Injectable()
export class PrismaFarmRepository implements IFarmRepository {
  constructor(private readonly prisma: PrismaService) {}
  

  
  async create(farm: Farm): Promise<Farm> {
    const data = PrismaFarmMapper.toPrisma(farm);
    const createdFarm = await this.prisma.farm.create({ data });
    return PrismaFarmMapper.toDomain(createdFarm);
  }

  async findById(id: string): Promise<Farm | null> {
    const raw = await this.prisma.farm.findFirst({
      where: {
        id,
      },
    });
  
    if (!raw) return null;
    return PrismaFarmMapper.toDomain(raw);
  }
  
  async findByCpfCnpj(cpfCnpj: string): Promise<Farm | null> {
    const raw = await this.prisma.farm.findFirst({
      where: {
        cpfCnpj,
      },
    });
  
    if (!raw) return null;
    return PrismaFarmMapper.toDomain(raw);
  }
  
  async update(id: string, farm: Farm): Promise<FarmResponseDto | null> {
    const data = PrismaFarmMapper.toPrisma(farm);

    const updatedFarm = await this.prisma.farm.update({
      data,
      where: { id },
    });

    if (!updatedFarm) {
      return null;
    }

    const farmCultures = await this.prisma.farmCulture.findMany({
      where: { farmId: id },
      select: { cultureId: true },
    });

    const cultureIds = farmCultures.map((farmCulture) => farmCulture.cultureId);

    const cultures = await this.prisma.culture.findMany({
      where: { id: { in: cultureIds } },
      select: { name: true },
    });

    const response: FarmResponseDto = {
      ...updatedFarm,
      cultures: cultures.map((culture) => ({
      name: culture.name,
      })),
    };

    return response;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.$transaction(async (prisma) => {
      await prisma.farmCulture.deleteMany({
        where: {
          farmId: id,
        },
      });
      await prisma.farm.deleteMany({
        where: {
          id,
        },
      });
    });
  }
 
  async getFarmIndicators(): Promise<{ totalFarms: number; totalHectares: number }> {
    const totalFarms = await this.prisma.farm.count();

    const totalHectaresResult = await this.prisma.farm.aggregate({
      _sum: {
        totalAreaHa: true,
      },
    });

    const totalHectares = totalHectaresResult._sum?.totalAreaHa ?? 0;

    return { totalFarms, totalHectares };
  }

  async getFarm(query: FindFarmsQueryDto): Promise<FarmResponseDto[]> {
    const { id, cpfCnpj, producerName, farmName } = query;
  
    // Construir filtro dinamicamente
    const where: any = {};
  
    if (id) where.id = id;
    if (cpfCnpj) where.cpfCnpj = { contains: cpfCnpj, mode: 'insensitive' };
    if (producerName) where.producerName = { contains: producerName, mode: 'insensitive' };
    if (farmName) where.farmName = { contains: farmName, mode: 'insensitive' };
  
    const farms = await this.prisma.farm.findMany({
      where,
    });
  
    const farmResponses: FarmResponseDto[] = await Promise.all(
      farms.map(async (farm) => {
        const farmCultures = await this.prisma.farmCulture.findMany({
          where: { farmId: farm.id },
          select: { cultureId: true },
        });
  
        const cultureIds = farmCultures.map((fc) => fc.cultureId);
  
        const cultures = await this.prisma.culture.findMany({
          where: { id: { in: cultureIds } },
          select: { name: true },
        });
  
        return {
          ...farm,
          cultures: cultures.map((culture) => ({ name: culture.name })),
        };
      })
    );
  
    return farmResponses;
  }
  
  
}
