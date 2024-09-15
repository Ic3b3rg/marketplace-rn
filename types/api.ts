export type PaginatorResponse<T> = {
  values: T[];
  pagination: {
    page: number;
    limit: number;
    totalPages: number;
    totalItems: number;
  };
};
export type BaseResponse<T> = {
  data: T;
};
export type BaseResponseWithMessage<T> = {
  data: T;
  message: string;
  status: number;
};
