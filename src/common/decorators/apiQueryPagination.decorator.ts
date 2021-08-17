import { applyDecorators } from '@nestjs/common';
import { ApiQuery, ApiQueryOptions } from '@nestjs/swagger';

export function ApiQueryPagination(customQueries?: ApiQueryOptions[]) {
  const queries = customQueries
    ? customQueries.map((query) => ApiQuery(query))
    : [];

  return applyDecorators(
    ApiQuery({
      name: 'page',
      required: false,
      type: Number,
    }),
    ApiQuery({
      name: 'quantity',
      required: false,
      type: Number,
    }),
    ApiQuery({
      name: 'search',
      required: false,
      type: String,
    }),
    ...queries,
  );
}
