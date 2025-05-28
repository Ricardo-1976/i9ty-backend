import type { IFarmRepository } from '../../../domain/repositories/farm/farm.repository';
import  { FindFarmsQueryDto } from '../../../infrastructure/http/dtos/farm/farm.dto';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class GetFarmUseCase {
  constructor(
    @Inject('IFarmRepository')
    private readonly farmRepository: IFarmRepository,
  ) {}

  async execute(filters: FindFarmsQueryDto) {
    return await this.farmRepository.getFarm(filters);
  }
}
