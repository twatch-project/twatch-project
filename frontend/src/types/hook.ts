export interface _DateState<T> {
  status: {
    loading: boolean;
    error: null | unknown;
    ready: boolean;
  };
  data: T | null;
  rating?: number | null;
}
