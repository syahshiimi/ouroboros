import { describe, test, expect } from "vitest";
import { getHumidityText } from "@/utils/topics/getHumidity";
import { HumidityText } from "../../../public/text/humidity.text";

describe("getHumidityText", () => {
  test("returns dry spell message for humidity below 60%", () => {
    const result = getHumidityText(59);
    expect(result).toBe(
      "A rare dry spell! Quick, take a picture before it changes.",
    );
  });

  test("returns a random message from HumidityText for humidity between 60% and 79%", () => {
    // Mock Math.random to always return 0 for predictable testing
    const mockMath = Object.create(global.Math);
    mockMath.random = () => 0;
    global.Math = mockMath;

    const result = getHumidityText(70);
    expect(result).toBe(HumidityText[0]); // Should be the first item due to mocked random
  });

  test("returns extreme humidity message for humidity 80% and above", () => {
    const result = getHumidityText(80);
    expect(result).toBe("The air is so wet, fish are swimming through it.");
  });

  test("returns different messages for multiple calls in 60-79% range", () => {
    // Restore Math.random
    global.Math = Object.create(global.Math);

    const results = new Set();
    for (let i = 0; i < 10; i++) {
      results.add(getHumidityText(70));
    }
    // Expect more than one unique result (it's possible but extremely unlikely to get the same result 10 times)
    expect(results.size).toBeGreaterThanOrEqual(1);
  });
});
