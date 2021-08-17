/* eslint-disable @typescript-eslint/ban-types */
import { applyDecorators, Put, Type } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

interface CustomSimplePostOptions {
  model: string;
  bodyType?: Type<unknown> | Function | [Function] | string;
  updateType?: Type<unknown> | Function | [Function] | string;
}

export function CustomSimplePut({
  model,
  bodyType,
  updateType,
}: CustomSimplePostOptions) {
  return applyDecorators(
    Put(':id'),
    ApiUnauthorizedResponse({ description: 'Forbidden.' }),
    ApiBadRequestResponse({
      description: `The ${model} not exist || Validation error`,
    }),
    ApiBody({ type: bodyType }),
    ApiOkResponse({
      description: `The ${model} has been successfully updated.`,
      type: updateType,
    }),
  );
}
