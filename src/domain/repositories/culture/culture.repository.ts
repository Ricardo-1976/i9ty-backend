import { Culture } from '@prisma/client';

export abstract class ICultureRepository {
  abstract findById(id: number): Promise<Culture | null>;
}
