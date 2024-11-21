import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

mockedAxios.request.mockImplementation(() =>
  Promise.resolve({
    headers: {
      "content-type": "application/json",
    },
  })
);
