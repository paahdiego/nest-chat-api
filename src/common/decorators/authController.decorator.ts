import { applyDecorators, Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

export function AuthController(controllerName: string, tagName?: string) {
  return applyDecorators(
    ApiBearerAuth('access-token'),
    ApiTags(tagName || controllerName),
    Controller(controllerName),
  );
}
