import { ICultureRepository } from '@/domain/repositories/culture/culture.repository';
import { IFarmRepository } from '@/domain/repositories/farm/farm.repository';
import { IFarmCultureRepository } from '@/domain/repositories/farmCulture/farm.culture.repository';
import { UpdateFarmDto } from '@/infrastructure/http/dtos/farm/farm.dto';
import { isInvalidBrazilianState, validateCNPJ, validateCPF } from '@/shared/utils/functions';
import {
  ConflictException,
  Injectable,
  Inject,
} from '@nestjs/common';

@Injectable()
export class UpdateFarmUseCase {
  constructor(
    @Inject('IFarmRepository')
    private readonly farmRepository: IFarmRepository,

    @Inject('IFarmCultureRepository')
    private readonly farmCultureRepository: IFarmCultureRepository,

    @Inject('ICultureRepository')
    private readonly cultureRepository: ICultureRepository,
  ) {}

  async execute(id: string, data: UpdateFarmDto) {
    const farm = await this.farmRepository.findById(id);
    if (!farm) {
      throw new ConflictException('Farm does not exist!');
    }

    const isValidCpfCnpj =
      validateCPF(data.cpfCnpj) || validateCNPJ(data.cpfCnpj);
    if (!isValidCpfCnpj) {
      throw new ConflictException('Invalid CPF or CNPJ.');
    }

    if (
      data.arableAreaHa + data.vegetationAreaHa >
      data.totalAreaHa
    ) {
      throw new ConflictException(
        'Invalid request: The sum of arable and vegetation areas cannot exceed the total area.',
      );
    }

    if (isInvalidBrazilianState(data.state)) {
          throw new ConflictException(
            'Invalid request: The provided state is not a valid Brazilian state.',  
          ); 
        }

    if (data.cultureIds) {
      const uniqueCultureIds = new Set(data.cultureIds);
      if (uniqueCultureIds.size !== data.cultureIds.length) {
      throw new ConflictException(
        'Invalid request: Duplicate culture IDs are not allowed.',
      );
      }
    }

    if (data.cultureIds && data.cultureIds.length > 0) {
      for (const cultureId of data.cultureIds) {
        const culture = await this.cultureRepository.findById(cultureId);
        if (!culture) {
          throw new ConflictException(
            `Invalid request: Culture with ID ${cultureId} does not exist.`,
          );
        }
      }

      await this.farmCultureRepository.delete(id);

      for (const cultureId of data.cultureIds) {
        await this.farmCultureRepository.create(id, cultureId);
      }
    }

    return await this.farmRepository.update(id, data);
  }
}
