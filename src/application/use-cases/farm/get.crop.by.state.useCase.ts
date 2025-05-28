import { IFarmCultureRepository } from '../../../domain/repositories/farmCulture/farm.culture.repository';
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class GetCropByStateUseCase {
  constructor(
    @Inject('IFarmCultureRepository')
    private readonly farmCultureRepository: IFarmCultureRepository,
  ) {}

  async execute(): Promise<
    { state: string; crop: string; farmCount: number }[]
  > {
    return await this.farmCultureRepository.listCropIndicatorsByState();
  }
}
