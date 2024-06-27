require("dotenv").config();

module.exports = {
  preset: "ts-jest",
  projects: [
    {
      displayName: "edge-fetch-unit",
      testMatch: ["**/*.unit.test.ts"],
      testEnvironment: "@edge-runtime/jest-environment",
      setupFiles: ["./test/mockFetch.ts", "./test/setupFetch.ts"],
    },
    {
      displayName: "edge-fetch-int",
      testMatch: ["**/*.int.test.ts"],
      testEnvironment: "@edge-runtime/jest-environment",
      setupFilesAfterEnv: ["./test/setupInt.ts", "./test/setupFetch.ts"],
    },
  ],
};
