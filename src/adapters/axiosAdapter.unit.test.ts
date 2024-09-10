import axios from "axios";
import axiosAdapter from "./axiosAdapter";
import { isEdgeRuntime, testIf } from "../../test/jestUtils";

describe("axiosAdapter", () => {
  testIf(!isEdgeRuntime())("makes an axios network request", async () => {
    axiosAdapter({
      url: "https://www.example.com",
      method: "POST",
      data: "foo",
      headers: {
        Authorization: "Basic ABCDEFG",
      },
    });

    expect(axios.request).toHaveBeenCalledWith(
      expect.objectContaining({
        url: "https://www.example.com",
        method: "POST",
        data: "foo",
        headers: {
          Authorization: "Basic ABCDEFG",
        },
      })
    );
  });
});
