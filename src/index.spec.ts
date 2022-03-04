import { hello } from ".";

describe("Test", () => {
  test("should return hello, world", () => {
    const response = hello();
    expect(response).toBe("hello, world");
  });
});
