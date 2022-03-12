module.exports = {
  roots: ["<rootDir>/src"],
  collectCoverage: true,
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  coveragePathIgnorePatterns: [
    "protocols",
    "domain",
    "index.ts",
    "<rootDir>/src/main/server.ts"
  ],
  coverageDirectory: "coverage",
  bail: true,
  coverageProvider: "v8",
  testEnvironment: "node",
  preset: "ts-jest",
  clearMocks: true,
  transform: {
    ".+\\.ts$": "ts-jest",
  },
};
