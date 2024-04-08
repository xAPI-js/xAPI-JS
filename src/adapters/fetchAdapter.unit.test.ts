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

  it("stringifies JSON data", async () => {
    fetchAdapter({
      url: "https://www.example.com",
      method: "POST",
      data: { foo: true },
      headers: {
        "Content-Type": "application/json",
      },
    });

    expect(fetch).toHaveBeenCalledWith(
      "https://www.example.com",
      expect.objectContaining({
        method: "POST",
        body: '{"foo":true}',
        headers: {
          "Content-Type": "application/json",
        },
      })
    );
  });
});
