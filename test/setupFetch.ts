import * as fetchAdapter from "../src/adapters/fetchAdapter";

global.adapter = "fetch";
global.adapterFn = jest.spyOn(fetchAdapter, "default");
