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

  it("Returns a rejected promise with error message if an error is encountered", async () => {
    (fetch as jest.MockedFn<typeof fetch>).mockImplementationOnce(() =>
      Promise.resolve({
        text: () => Promise.resolve("i am error"),
        ok: false,
      } as Response)
    );

    const result = fetchAdapter({
      url: "https://www.example.com",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    expect(result).rejects.toThrow("i am error");
  });
});
