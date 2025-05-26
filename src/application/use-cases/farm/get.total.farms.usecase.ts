import type { IFarmRepository } from '@/domain/repositories/farm/farm.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class GetTotalFarmsUseCase {
  constructor(
    @Inject('IFarmRepository')
    private readonly farmRepository: IFarmRepository,
  ) {}

  async execute() {
    const totalFarms = await this.farmRepository.countTotalFarms();
    return {
      totalFarms,
    };
  }
}
