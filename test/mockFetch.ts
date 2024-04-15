global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        headers: {
          "content-type": "application/json",
        },
      }),
    text: () => Promise.resolve(""),
    ok: true,
    headers: new Headers(),
  } as Response)
);
