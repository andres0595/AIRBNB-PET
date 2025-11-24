export interface ResponseRequest<T = any> {
  message: string;
  data: T;
  statusCode: number;
  flag: boolean;
}
