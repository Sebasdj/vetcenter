export default class API_Response<T> {
  data: T | null;
  error: string | null;

  constructor(data: T | null, error: string | null = null) {
    this.data = data;
    this.error = error;
  }
}