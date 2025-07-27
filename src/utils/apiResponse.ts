class ApiResponse {
  success: boolean;
  data: any;
  message: string;

  constructor(statusCode: number, message: string, data: any = []) {
    this.success = statusCode < 400;
    this.message = message;
    this.data = data;
  }
}

export default ApiResponse;
