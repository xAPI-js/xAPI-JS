import fetchAdapter from "./fetchAdapter";

describe("fetchAdapter", () => {
  it("makes a fetch network request", async () => {
    fetchAdapter({
      url: "https://www.example.com",
      method: "POST",
      data: "foo",
      headers: {
        Authorization: "Basic ABCDEFG",
      },
    });

    expect(fetch).toHaveBeenCalledWith(
      "https://www.example.com",
      expect.objectContaining({
        method: "POST",
        body: "foo",
        headers: {
          Authorization: "Basic ABCDEFG",
        },
      })
    );
  });
});
