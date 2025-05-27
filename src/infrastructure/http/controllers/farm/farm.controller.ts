import { Body, Controller,Delete,Get,Param,Post, Put, Query, } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateFarmDto, UpdateFarmDto, FindFarmsQueryDto } from '../../dtos/farm/farm.dto';
import { CreateFarmUseCase } from '@/application/use-cases/farm/create.farm.usecase';
import { UpdateFarmUseCase } from '@/application/use-cases/farm/update.farm.usecase';
import { DeleteFarmUseCase } from '@/application/use-cases/farm/delete.farm.usecase';
import { GetFarmIndicatorsUseCase } from '@/application/use-cases/farm/get.farm.indicators.usecase';
import { GetCropByStateUseCase } from '@/application/use-cases/farm/get.crop.by.state.useCase';
import { GetFarmUseCase } from '@/application/use-cases/farm/get.farm.usecase';
import { SwaggerCreateFarmResponses, SwaggerFarmResponses, SwaggerUpdateFarmResponses } from '@/shared/utils/swagger-responses';

@ApiTags('Farm')
@Controller('/v1/farm')
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
  @ApiBody({ type: CreateFarmDto })
  @SwaggerCreateFarmResponses()
  async create(@Body() data: CreateFarmDto) {
    await this.createFarmUseCase.execute(data);
  }

  @Put('/update/:id')
  @ApiBody({ type: UpdateFarmDto })
  @SwaggerUpdateFarmResponses()
  async update(@Param('id') id: string, @Body() data: UpdateFarmDto) {
    return await this.updateFarmUseCase.execute(id, data);
  }

  @Delete('/delete/:id')
  @SwaggerFarmResponses()
  async delete(@Param('id') id: string) {
    await this.deleteFarmUseCase.execute(id);
  }

  @Get('/indicators-farms')
  @SwaggerFarmResponses()
  async getFarmIndicators() {
    return await this.getFarmIndicatorsUseCase.execute();
  }

  @Get('/crops-by-state')
  @SwaggerFarmResponses()
  async getCropIndicatorsByState() {
    return await this.getCropByStateUseCase.execute();
  }

  @Get('/')
  @SwaggerFarmResponses()
  @ApiBody({ type: FindFarmsQueryDto })
  async findFarms(@Query() filters: FindFarmsQueryDto) {
    return await this.getFarmUseCase.execute(filters);
  }
}