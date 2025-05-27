import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';

export function SwaggerCreateFarmResponses() {
  return applyDecorators(
    ApiCreatedResponse({ description: 'Farm created successfully' }),
    ApiBadRequestResponse({ description: 'Validation error. Invalid fields in the request body' }),
    ApiNotFoundResponse({ description: 'Related resource not found' }),
    ApiConflictResponse({ description: 'Conflict. A farm with the same data already exists' }),
    ApiInternalServerErrorResponse({ description: 'Internal server error. Something went wrong on the server' }),
  );
}

export function SwaggerUpdateFarmResponses() {
  return applyDecorators(
    ApiOkResponse({ description: 'Request processed successfully' }),
    ApiBadRequestResponse({ description: 'Validation error. Invalid fields in the request body' }),
    ApiNotFoundResponse({ description: 'Related resource not found' }),
    ApiConflictResponse({ description: 'Conflict. A farm with the same data already exists' }),
    ApiInternalServerErrorResponse({ description: 'Internal server error. Something went wrong on the server' }),
  );
}

export function SwaggerFarmResponses() {
  return applyDecorators(
    ApiOkResponse({ description: 'Request processed successfully' }),
    ApiNotFoundResponse({ description: 'Related resource not found' }),
    ApiInternalServerErrorResponse({ description: 'Internal server error. Something went wrong on the server' }),
  );
}