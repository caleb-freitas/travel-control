module.exports = {
  roots: ["<rootDir>/tests"],
  collectCoverage: true,
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  coveragePathIgnorePatterns: [
    "protocols",
    "domain",
    "index.ts",
    "<rootDir>/src/main/server.ts",
    "<rootDir>/src/main/adapter"
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
  moduleNameMapper: {
    '@/tests/(.*)': '<rootDir>/tests/$1',
    '@/(.*)': '<rootDir>/src/$1'
  }
};
