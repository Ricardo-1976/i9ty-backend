import  { FarmCulture } from '@prisma/client';

export abstract class IFarmCultureRepository {
  abstract create( farmId: string, cultureId: number ): Promise<void>;
  abstract findByFarmId(farmId: string): Promise<FarmCulture | null>;
  abstract delete(farmId: string): Promise<void>;
  abstract listCropIndicatorsByState(): Promise<
    { state: string; crop: string; farmCount: number }[]
  >;
}
