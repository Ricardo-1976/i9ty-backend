import { Module } from '@nestjs/common';
import { PrismaModule } from './infrastructure/database/prisma.module';
import { FarmModule } from './application/farm.module';

@Module({
  imports: [PrismaModule, FarmModule,],
  controllers: [],
  providers: [],
})
export class AppModule {}
