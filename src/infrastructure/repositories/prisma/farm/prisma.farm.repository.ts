import { Injectable } from '@nestjs/common';

import { IFarmRepository } from '@/domain/repositories/farm/farm.repository';
import { PrismaService } from '@/infrastructure/database/prisma.service';
import { PrismaFarmMapper } from '../../mappers/farm/prisma.farm.mapper';
import { Farm } from '@/domain/entities/farm/farm';


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
        deletedAt: null,
      },
    });
  
    if (!raw) return null;
    return PrismaFarmMapper.toDomain(raw);
  }
  
  async findByCpfCnpj(cpfCnpj: string): Promise<Farm | null> {
    const raw = await this.prisma.farm.findFirst({
      where: {
        cpfCnpj,
        deletedAt: null,
      },
    });
  
    if (!raw) return null;
    return PrismaFarmMapper.toDomain(raw);
  }
  
  async update(id: string, farm: Farm): Promise<Farm | null> {
    const data = PrismaFarmMapper.toPrisma(farm);
    const farms = await this.prisma.farm.update({
      data, 
      where: {
        id,
      }
    });

    return PrismaFarmMapper.toDomain(farms)
  }

  async delete(id: string): Promise<void> {
    await this.prisma.farm.update({
      data: {
        deletedAt: new Date(),
      },
      where: {
        id,
      },
    });
  }
 
  async countTotalFarms(): Promise<number> {
    return this.prisma.farm.count({
      where: { deletedAt: null },
    });
  }

  async sumTotalHectares(): Promise<number> {
    const result = await this.prisma.farm.aggregate({
      _sum: {
        totalAreaHa: true,
      },
      where: {
        deletedAt: null,
      },
    });

    return result._sum?.totalAreaHa ?? 0;
  }
  
}
