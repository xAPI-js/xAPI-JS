import axiosAdapter from "./axiosAdapter";
import fetchAdapter from "./fetchAdapter";
import resolveAdapterFunction from "./resolveAdapterFunction";

interface AdapterRequest {
  method: "GET" | "POST" | "PUT" | "DELETE" | string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  headers?: Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}

interface AdapterResponse<T> {
  data: T;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  headers: Record<string, any>;
  status: number;
}

type AdapterPromise<T> = Promise<AdapterResponse<T>>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AdapterFunction = <T = any>(
  params: AdapterRequest & { url: string }
) => AdapterPromise<T>;

type Adapter = "fetch" | "axios" | AdapterFunction;

export type {
  AdapterRequest,
  AdapterResponse,
  AdapterPromise,
  AdapterFunction,
  Adapter,
};

export { axiosAdapter, fetchAdapter, resolveAdapterFunction };
