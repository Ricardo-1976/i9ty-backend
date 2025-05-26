import { Body, Controller,Delete,Get,Param,Post, Put, Query, } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateFarmDto, UpdateFarmDto, FindFarmsQueryDto } from '../../dtos/farm/farm.dto';
import { CreateFarmUseCase } from '@/application/use-cases/farm/create.farm.usecase';
import { UpdateFarmUseCase } from '@/application/use-cases/farm/update.farm.usecase';
import { DeleteFarmUseCase } from '@/application/use-cases/farm/delete.farm.usecase';
import { GetFarmIndicatorsUseCase } from '@/application/use-cases/farm/get.farm.indicators.usecase';
import { GetCropByStateUseCase } from '@/application/use-cases/farm/get.crop.by.state.useCase';
import { GetFarmUseCase } from '@/application/use-cases/farm/get.farm.usecase';

@Controller('/farm')
@ApiTags('Farm')
export class FarmController {
  [x: string]: any;
  constructor(
    private readonly createFarmUseCase: CreateFarmUseCase,
    private readonly updateFarmUseCase: UpdateFarmUseCase,
    private readonly deleteFarmUseCase: DeleteFarmUseCase,
    private readonly getFarmIndicatorsUseCase: GetFarmIndicatorsUseCase,
    private readonly getCropByStateUseCase: GetCropByStateUseCase,
    private readonly getFarmUseCase: GetFarmUseCase,
  ) {}

  @Post('/')
  async create(@Body() data: CreateFarmDto) {
    await this.createFarmUseCase.execute(data);
  }

  @Put('/update/:id')
  async update(@Param('id') id: string, @Body() data: UpdateFarmDto) {
    return await this.updateFarmUseCase.execute(id, data);
  }

  @Delete('/delete/:id')
  async delete(@Param('id') id: string) {
    await this.deleteFarmUseCase.execute(id);
  }

  @Get('/indicators-farms')
  async getFarmIndicators() {
    return await this.getFarmIndicatorsUseCase.execute();
  }

  @Get('/crops-by-state')
  async getCropIndicatorsByState() {
    return await this.getCropByStateUseCase.execute();
  }

  @Get('/')
  async findFarms(@Query() filters: FindFarmsQueryDto) {
    return await this.getFarmUseCase.execute(filters);
  }
}