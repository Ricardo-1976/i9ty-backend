import type { ICultureRepository } from '@/domain/repositories/culture/culture.repository';
import { IFarmRepository } from '@/domain/repositories/farm/farm.repository';
import { IFarmCultureRepository } from '@/domain/repositories/farmCulture/farm.culture.repository';
import { CreateFarmDto } from '@/infrastructure/http/dtos/farm/farm.dto';
import { validateCNPJ, validateCPF } from '@/shared/utils/functions';
import { ConflictException, Injectable, Inject } from '@nestjs/common';

@Injectable()
export class CreateFarmUseCase {
  constructor(
    @Inject('IFarmRepository')
    private readonly farmRepository: IFarmRepository,
    @Inject('IFarmCultureRepository')
    private readonly farmCultureRepository: IFarmCultureRepository,
    @Inject('ICultureRepository')
    private readonly cultureRepository: ICultureRepository,
  ) {}

  async execute(data: CreateFarmDto) {
    const farm = await this.farmRepository.findByCpfCnpj(data.cpfCnpj);

    if (farm) {
      throw new ConflictException('Farm already exists!');
    }

    const isValidCpfCnpj = validateCPF(data.cpfCnpj) || validateCNPJ(data.cpfCnpj);

    if (!isValidCpfCnpj) {
      throw new ConflictException(
        'Invalid request: The provided CPF or CNPJ is invalid.',
      );
    }

    if (data.arableAreaHa + data.vegetationAreaHa > data.totalAreaHa) {
      throw new ConflictException(
        'Invalid request: The sum of arable and vegetation areas cannot exceed the total area.',
      );
    }

    const farms = await this.farmRepository.create({
      ...data,
    });

    if (data.cultureIds) {
      const uniqueCultureIds = new Set(data.cultureIds);
      if (uniqueCultureIds.size !== data.cultureIds.length) {
      throw new ConflictException(
        'Invalid request: Duplicate culture IDs are not allowed.',
      );
      }
    }

    for (const cultureId of data.cultureIds ?? []) {
      const culture = await this.cultureRepository.findById(cultureId);
      if (!culture) {
      throw new ConflictException(
        `Invalid request: Culture with ID ${cultureId} does not exist.`,
      );
      }
    }

    if (data.cultureIds) {
      for (const cultureId of data.cultureIds) {
        await this.farmCultureRepository.create(farms.id, cultureId);
      }
    }

  }
}
