module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ["./src/tests/config/jest.setup.ts"], // Global setup
  globalSetup: "./src/tests/config/globalSetup.ts", // MongoDB setup
  testMatch: ["**/__tests__/**/*.test.ts"],
  moduleFileExtensions: ["ts", "js", "json"],
}
