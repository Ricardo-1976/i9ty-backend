import { Body, Controller,Delete,Get,Param,Post, Put, } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateFarmDto, UpdateFarmDto } from '../../dtos/farm/farm.dto';
import { CreateFarmUseCase } from '@/application/use-cases/farm/create.farm.usecase';
import { UpdateFarmUseCase } from '@/application/use-cases/farm/update.farm.usecase';
import { DeleteFarmUseCase } from '@/application/use-cases/farm/delete.farm.usecase';
import { GetTotalFarmsUseCase } from '@/application/use-cases/farm/get.total.farms.usecase';
import { GetTotalHectaresUseCase } from '@/application/use-cases/farm/get.total.hectares.usecase';
import { GetCropByStateUseCase } from '@/application/use-cases/farm/get.crop.by.state.useCase';

@Controller('/farm')
@ApiTags('Farm')
export class FarmController {
  [x: string]: any;
  constructor(
    private readonly createFarmUseCase: CreateFarmUseCase,
    private readonly updateFarmUseCase: UpdateFarmUseCase,
    private readonly deleteFarmUseCase: DeleteFarmUseCase,
    private readonly getTotalFarmsUseCase: GetTotalFarmsUseCase,
    private readonly getTotalHectaresUseCase: GetTotalHectaresUseCase,
    private readonly getCropByStateUseCase: GetCropByStateUseCase,
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
  async delete(@Param('id') id: string ) {
    await this.deleteFarmUseCase.execute(id);
  }

  @Get('/total-farms')
  async getSummary() {
    const result = await this.getTotalFarmsUseCase.execute();
    return {
      totalFarms: result.totalFarms,
    };
  }
  
  @Get('/total-hectares')
  async getTotalHectares() {  
    const result = await this.getTotalHectaresUseCase.execute();
    return {
      totalHectares: result.totalHectares,
    };
  }

  @Get('/crops-by-state')
  async getCropIndicatorsByState() {
    const indicators = await this.getCropByStateUseCase.execute();
    return { data: indicators };
  }
}