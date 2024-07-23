import { describe, expect, test } from "vitest";
import { generator } from "./generator";

describe("Generator", () => {
  test("should generate numbers between min and max (inclusive)", () => {
    const min = 1;
    const max = 5;

    const number = generator(min, max);
    expect(number).toBeGreaterThanOrEqual(min);
    expect(number).toBeLessThanOrEqual(max);
  });

  test("should throw an error when min is negative and max is zero", () => {
    const min = -1;
    const max = 0;

    expect(() => generator(min, max)).toThrowError();
  });

  test("should throw an error when max is negative and max is zero", () => {
    const min = 0;
    const max = -1;

    expect(() => generator(min, max)).toThrowError(
      `Max input ${max} is less than 0`,
    );
  });

  test("should throw error if the max input value is smaller than the min input value.", () => {
    const min = 5;
    const max = 4;

    expect(() => generator(min, max)).toThrowError(
      `Max number input of ${max} is smaller than the min input value of ${min}`,
    );
  });
});
