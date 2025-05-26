import { IFarmRepository } from "@/domain/repositories/farm/farm.repository";
import { IFarmCultureRepository } from "@/domain/repositories/farmCulture/farm.culture.repository";
import { ConflictException, Injectable, Inject } from "@nestjs/common";

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
      throw new ConflictException('Farm does not exists!');
    }

    await this.farmCultureRepository.delete(id);

    return await this.farmRepository.delete(id);
  }
}