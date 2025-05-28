/* eslint-disable @typescript-eslint/no-unsafe-argument */
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import {
  CreateFarmDto,
  UpdateFarmDto,
} from '../src/infrastructure/http/dtos/farm/farm.dto';
import { PrismaFarmRepository } from '../src/infrastructure/repositories/prisma/farm/prisma.farm.repository';

describe('FarmController (e2e)', () => {
  let app: INestApplication;
  const GENERIC_FARM: CreateFarmDto = {
    id: '27b63f09-4045-418f-8e08-a3a2c729484a',
    cpfCnpj: '10081852053',
    producerName: 'Luciana Torres',
    farmName: 'Fazenda Bela Vista',
    city: 'Campinas',
    state: 'SP',
    totalAreaHa: 400,
    arableAreaHa: 200,
    vegetationAreaHa: 80,
    cultureIds: [1],
  };
  const GENERIC_FARM_EMPTY: CreateFarmDto = {
    cpfCnpj: '',
    producerName: '',
    farmName: '',
    city: '',
    state: '',
    totalAreaHa: 0,
    arableAreaHa: 0,
    vegetationAreaHa: 0,
    cultureIds: [0],
  };
  const GENERIC_FARM_UPDATE: UpdateFarmDto = {
    cpfCnpj: '38910127000110',
    producerName: 'Maria Oliveira',
    farmName: 'Fazenda Boa Terra',
    city: 'Ribeirão Preto',
    state: 'SP',
    totalAreaHa: 200.0,
    arableAreaHa: 150.0,
    vegetationAreaHa: 5.0,
    cultureIds: [1, 2, 3, 4, 5],
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        {
          provide: PrismaFarmRepository,
          useValue: {
            create: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it(`/CREATE farm`, async () => {
    const req = await request(app.getHttpServer())
      .post(`/v1/farm`)
      .set('Accept', 'application/json')
      .send(GENERIC_FARM);
    expect(req.statusCode).toBe(201);
  });

  it(`/CREATE farm with empty fields (400)`, async () => {
    const req = await request(app.getHttpServer())
      .post(`/v1/farm`)
      .set('Accept', 'application/json')
      .send(GENERIC_FARM_EMPTY);
    expect(req.statusCode).toBe(400);
    expect(req.body).toEqual({
      message: [
        'CPF/CNPJ is required.',
        'Producer name is required.',
        'Farm name is required.',
        'City is required.',
        'State is required.',
        'Total area must be greater than zero.',
        'Arable area must be greater than zero.',
        'Vegetation area must be greater than zero.',
      ],
      error: 'Bad Request',
      statusCode: 400,
    });
  });

  it(`/UPDATE farm`, async () => {
    const req = await request(app.getHttpServer())
      .put(`/v1/farm/update/${GENERIC_FARM.id}`)
      .set('Accept', 'application/json')
      .send(GENERIC_FARM_UPDATE);
    expect(req.statusCode).toBe(200);
    expect(req.body).toEqual(
      expect.objectContaining({
        id: GENERIC_FARM.id,
        cpfCnpj: GENERIC_FARM_UPDATE.cpfCnpj,
        producerName: GENERIC_FARM_UPDATE.producerName,
        farmName: GENERIC_FARM_UPDATE.farmName,
        city: GENERIC_FARM_UPDATE.city,
        state: GENERIC_FARM_UPDATE.state,
        totalAreaHa: GENERIC_FARM_UPDATE.totalAreaHa,
        arableAreaHa: GENERIC_FARM_UPDATE.arableAreaHa,
        vegetationAreaHa: GENERIC_FARM_UPDATE.vegetationAreaHa,
        cultures: expect.arrayContaining([
          expect.objectContaining({ name: 'Soja' }),
          expect.objectContaining({ name: 'Milho' }),
          expect.objectContaining({ name: 'Algodão' }),
          expect.objectContaining({ name: 'Café' }),
          expect.objectContaining({ name: 'Cana de Açúcar' }),
        ]),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      }),
    );
  });

  it(`/UPDATE farm with empty fields (400)`, async () => {
    const req = await request(app.getHttpServer())
      .put(`/v1/farm/update/${GENERIC_FARM.id}`)
      .set('Accept', 'application/json')
      .send(GENERIC_FARM_EMPTY);
    expect(req.statusCode).toBe(400);
    expect(req.body).toEqual({
      message: [
        'CPF/CNPJ is required.',
        'Producer name is required.',
        'Farm name is required.',
        'City is required.',
        'State is required.',
        'Total area must be greater than zero.',
        'Arable area must be greater than zero.',
        'Vegetation area must be greater than zero.',
      ],
      error: 'Bad Request',
      statusCode: 400,
    });
  });

  it(`/GET farms indicators`, async () => {
    const req = await request(app.getHttpServer())
      .get('/v1/farm/indicators-farms');
    expect(req.statusCode).toBe(200);
    expect(req.body).toEqual(
      expect.objectContaining({
        "totalFarms": 1,
        "totalHectares": 200
      })
    );
  });

  it(`/GET crops-by-state`, async () => {
    const req = await request(app.getHttpServer())
      .get('/v1/farm/crops-by-state');
    expect(req.statusCode).toBe(200);
    expect(req.body).toEqual(
      expect.arrayContaining([
      {
        state: "SP",
        crop: "Soja",
        farmCount: 1
      },
      {
        state: "SP",
        crop: "Milho",
        farmCount: 1
      },
      {
        state: "SP",
        crop: "Algodão",
        farmCount: 1
      },
      {
        state: "SP",
        crop: "Café",
        farmCount: 1
      },
      {
        state: "SP",
        crop: "Cana de Açúcar",
        farmCount: 1
      }
      ])
    );
  });

  it(`/GET farms`, async () => {
    const req = await request(app.getHttpServer())
      .get('/v1/farm');
    expect(req.statusCode).toBe(200);
    expect(req.body).toEqual(
      expect.arrayContaining([
      {
        id: "27b63f09-4045-418f-8e08-a3a2c729484a",
        cpfCnpj: "38910127000110",
        producerName: "Maria Oliveira",
        farmName: "Fazenda Boa Terra",
        city: "Ribeirão Preto",
        state: "SP",
        totalAreaHa: 200,
        arableAreaHa: 150,
        vegetationAreaHa: 5,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        cultures: [
        { name: "Soja" },
        { name: "Milho" },
        { name: "Algodão" },
        { name: "Café" },
        { name: "Cana de Açúcar" },
        ],
      },
      ])
    );
  });

  it(`/DELETE farm`, async () => {
    const req = await request(app.getHttpServer())
      .delete(`/v1/farm/delete/${GENERIC_FARM.id}`);
    expect(req.statusCode).toBe(200);
  });
});
