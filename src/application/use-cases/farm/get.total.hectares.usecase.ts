import type { IFarmRepository } from '@/domain/repositories/farm/farm.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class GetTotalHectaresUseCase {
  constructor(
    @Inject('IFarmRepository')
    private readonly farmRepository: IFarmRepository,
  ) {}

  async execute(): Promise<{ totalHectares: number }> {
    const totalHectares = await this.farmRepository.sumTotalHectares();
    return { totalHectares };
  }
}
