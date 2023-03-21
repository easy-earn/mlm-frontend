// New Generic response type
export interface ApiResponse<Type> {
  result?: Type;
  message: string;
  success: boolean;
  error?: any;
}
