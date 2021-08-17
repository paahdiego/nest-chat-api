import { applyDecorators, Delete, HttpCode } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNoContentResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

interface CustomSimpleDeleteOptions {
  model: string;
}

export function CustomSimpleDelete({ model }: CustomSimpleDeleteOptions) {
  return applyDecorators(
    Delete(':id'),
    ApiUnauthorizedResponse({ description: 'Forbidden.' }),
    ApiBadRequestResponse({
      description: `The ${model} not exist || Validation error`,
    }),
    HttpCode(204),
    ApiNoContentResponse({
      description: `The ${model} has been successfully deleted.`,
    }),
  );
}
