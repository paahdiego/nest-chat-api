/* eslint-disable @typescript-eslint/ban-types */
import { applyDecorators, HttpCode, Post, Type } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

interface CustomSimplePostOptions {
  model: string;
  bodyType?: Type<unknown> | Function | [Function] | string;
  createType?: Type<unknown> | Function | [Function] | string;
}

export function CustomSimplePost({
  model,
  bodyType,
  createType,
}: CustomSimplePostOptions) {
  return applyDecorators(
    Post(),
    ApiUnauthorizedResponse({ description: 'Forbidden.' }),
    ApiBody({ type: bodyType }),
    ApiBadRequestResponse({
      description: 'Validation error',
    }),
    ApiCreatedResponse({
      description: `The ${model} has been successfully created.`,
      type: createType,
    }),
    HttpCode(201),
  );
}
