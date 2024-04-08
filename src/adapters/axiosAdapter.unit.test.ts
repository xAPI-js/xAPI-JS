import axios from "axios";
import axiosAdapter from "./axiosAdapter";

describe("axiosAdapter", () => {
  it("makes an axios network request", async () => {
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
