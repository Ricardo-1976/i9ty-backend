import type { IFarmRepository } from '../../../domain/repositories/farm/farm.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class GetFarmIndicatorsUseCase {
  constructor(
    @Inject('IFarmRepository')
    private readonly farmRepository: IFarmRepository,
  ) {}

  async execute() {
    return await this.farmRepository.getFarmIndicators();
  }
}
