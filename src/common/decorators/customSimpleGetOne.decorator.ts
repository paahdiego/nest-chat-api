/* eslint-disable @typescript-eslint/ban-types */
import { applyDecorators, Get, Type } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

interface CustomSimpleGetOneOptions {
  model: string;
  type?: Type<unknown> | Function | [Function] | string;
  roles?: string[];
}

export function CustomSimpleGetOne({ model, type }: CustomSimpleGetOneOptions) {
  return applyDecorators(
    Get(':id'),
    ApiBadRequestResponse({
      description: `The ${model} not exist || Validation error`,
    }),
    ApiUnauthorizedResponse({ description: 'Forbidden.' }),
    ApiOkResponse({ description: `Get one ${model}`, type }),
  );
}
