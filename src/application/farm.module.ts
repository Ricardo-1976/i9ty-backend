import { PrismaService } from "@/infrastructure/database/prisma.service";
import { Module } from "@nestjs/common";
import { CreateFarmUseCase } from "./use-cases/farm/create.farm.usecase";
import { UpdateFarmUseCase } from "./use-cases/farm/update.farm.usecase";
import { DeleteFarmUseCase } from "./use-cases/farm/delete.farm.usecase";
import { FarmController } from "@/infrastructure/http/controllers/farm/farm.controller";
import { PrismaFarmRepository } from "@/infrastructure/repositories/prisma/farm/prisma.farm.repository";
import { PrismaFarmCultureRepository } from "@/infrastructure/repositories/prisma/farmCulture/prisma.farm.culture.repository";
import { PrismaCultureRepository } from "@/infrastructure/repositories/prisma/culture/prisma.culture.repository";
import { GetTotalFarmsUseCase } from "./use-cases/farm/get.total.farms.usecase";
import { GetTotalHectaresUseCase } from "./use-cases/farm/get.total.hectares.usecase";
import { GetCropByStateUseCase } from "./use-cases/farm/get.crop.by.state.useCase";

@Module({
  controllers: [FarmController],
  providers: [
    PrismaService,
    CreateFarmUseCase,
    UpdateFarmUseCase,
    DeleteFarmUseCase,
    GetTotalFarmsUseCase,
    GetTotalHectaresUseCase,
    GetCropByStateUseCase,
    {
      provide: 'IFarmRepository',
      useClass: PrismaFarmRepository,
    },
    {
      provide: 'IFarmCultureRepository',
      useClass: PrismaFarmCultureRepository,
    },
    {

      provide: 'ICultureRepository',
      useClass: PrismaCultureRepository,
    },
  ],
  exports: ['IFarmRepository', 'IFarmCultureRepository'],
})
export class FarmModule {}

