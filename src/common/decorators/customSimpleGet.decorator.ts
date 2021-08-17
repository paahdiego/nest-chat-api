/* eslint-disable @typescript-eslint/ban-types */
import { applyDecorators, Get, Type } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

interface CustomSimpleGetOptions {
  model: string;
  type?: Type<unknown> | Function | [Function] | string;
}

export function CustomSimpleGet({ model, type }: CustomSimpleGetOptions) {
  return applyDecorators(
    Get(),
    ApiUnauthorizedResponse({ description: 'Forbidden.' }),
    ApiBadRequestResponse({
      description: 'Validation error',
    }),
    ApiOkResponse({
      description: `Get all ${model} paginated`,
      type,
    }),
  );
}
