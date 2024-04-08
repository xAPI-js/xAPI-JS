import { AdapterFunction } from ".";
import axiosAdapter from "./axiosAdapter";
import fetchAdapter from "./fetchAdapter";
import resolveAdapterFunction from "./resolveAdapterFunction";

describe("resolveAdapterFunction", () => {
  it("Returns axios by default", () => {
    const result = resolveAdapterFunction();

    expect(result).toBe(axiosAdapter);
  });

  it("Returns axios if provided as parameter", () => {
    const result = resolveAdapterFunction("axios");

    expect(result).toBe(axiosAdapter);
  });

  it("Returns fetch if provided as parameter", () => {
    const result = resolveAdapterFunction("fetch");

    expect(result).toBe(fetchAdapter);
  });

  it("Returns custom if function provided as parameter", () => {
    const customAdapter: AdapterFunction = () =>
      Promise.resolve({
        data: {} as any,
        headers: {},
        status: 0,
      });
    const result = resolveAdapterFunction(customAdapter);

    expect(result).toBe(customAdapter);
  });
});
