import type { ICultureRepository } from "@/domain/repositories/culture/culture.repository";
import { PrismaService } from "@/infrastructure/database/prisma.service";
import { Injectable } from "@nestjs/common";
import { Culture } from "@prisma/client";

@Injectable()
export class PrismaCultureRepository implements ICultureRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: number): Promise<Culture | null> {
    return this.prisma.culture.findUnique({
      where: { id },
    });
  }

}
