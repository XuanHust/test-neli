export interface TodoInputParams {
  description: string
  isFinished: boolean
}

export interface CommonResponse {
  status?: "success" | "error";
  statusCode: number;
  message?: string;
  data?: any;
}

export interface TodoParams {
  description?: string
}