import { IFarmRepository } from "@/domain/repositories/farm/farm.repository";
import { IFarmCultureRepository } from "@/domain/repositories/farmCulture/farm.culture.repository";
import { Injectable, Inject, NotFoundException } from "@nestjs/common";

@Injectable()
export class DeleteFarmUseCase {
  constructor(
    @Inject('IFarmRepository')
    private readonly farmRepository: IFarmRepository,
    @Inject('IFarmCultureRepository')
    private readonly farmCultureRepository: IFarmCultureRepository,
  ) {}

  async execute(id: string) {
    const farm = await this.farmRepository.findById(id);

    if (!farm) {
      throw new NotFoundException('Farm does not exists!');
    }

    await this.farmCultureRepository.delete(id);

    await this.farmRepository.delete(id);
  }
}