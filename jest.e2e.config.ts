import jestConfig from "./jest.config";

export default {
  ...jestConfig,
  testRegex: ".e2e.test.ts$",
};
