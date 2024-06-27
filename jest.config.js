require("dotenv").config();

module.exports = {
  preset: "ts-jest",
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
  projects: [
    {
      displayName: "dom-axios-unit",
      testMatch: ["**/*.unit.test.ts"],
      testEnvironment: "jsdom",
      setupFiles: [
        "./test/mockAxios.ts",
        "./test/mockFetch.ts",
        "./test/setupAxios.ts",
      ],
    },
    {
      displayName: "dom-fetch-unit",
      testMatch: ["**/*.unit.test.ts"],
      testEnvironment: "jsdom",
      setupFiles: [
        "./test/mockAxios.ts",
        "./test/mockFetch.ts",
        "./test/setupFetch.ts",
      ],
    },
    {
      displayName: "node-axios-unit",
      testMatch: ["**/*.unit.test.ts"],
      testEnvironment: "node",
      setupFiles: [
        "./test/mockAxios.ts",
        "./test/mockFetch.ts",
        "./test/setupAxios.ts",
      ],
    },
    {
      displayName: "node-fetch-unit",
      testMatch: ["**/*.unit.test.ts"],
      testEnvironment: "node",
      setupFiles: [
        "./test/mockAxios.ts",
        "./test/mockFetch.ts",
        "./test/setupFetch.ts",
      ],
    },
    {
      displayName: "dom-axios-int",
      testMatch: ["**/*.int.test.ts"],
      testEnvironment: "jsdom",
      setupFilesAfterEnv: ["./test/setupInt.ts"],
    },
    {
      displayName: "dom-fetch-int",
      testMatch: ["**/*.int.test.ts"],
      testEnvironment: "jsdom",
      setupFilesAfterEnv: [
        "./test/setupInt.ts",
        "./test/polyfillFetch.ts",
        "./test/setupFetch.ts",
      ],
    },
    {
      displayName: "node-axios-int",
      testMatch: ["**/*.int.test.ts"],
      testEnvironment: "node",
      setupFilesAfterEnv: ["./test/setupInt.ts", "./test/setupAxios.ts"],
    },
    {
      displayName: "node-fetch-int",
      testMatch: ["**/*.int.test.ts"],
      testEnvironment: "node",
      setupFilesAfterEnv: ["./test/setupInt.ts", "./test/setupFetch.ts"],
    },
  ],
};
