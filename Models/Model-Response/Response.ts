export interface Response<T = any> {
  message: string;
  data: T;
  statusCode: number;
  flag: boolean;
}
