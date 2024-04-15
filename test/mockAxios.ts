import axios from "axios";

jest.mock("axios");

(axios.request as any).mockImplementation(() =>
  Promise.resolve({
    headers: {
      "content-type": "application/json",
    },
  })
);
