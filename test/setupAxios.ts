import * as axiosAdapter from "../src/adapters/axiosAdapter";

global.adapterFn = jest.spyOn(axiosAdapter, "default");
