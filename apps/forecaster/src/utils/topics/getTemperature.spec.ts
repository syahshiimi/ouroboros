import { describe, expect, it, test, vi } from "vitest";
import { getTemperatureText } from "@/utils/topics/getTemperature";
import { TemperatureText } from "../../../public/text/temperature.text";

describe("getTemperatureText", () => {
  it("should return a message for a temperature below 27 degrees", () => {
    vi.spyOn(Math, "random").mockReturnValue(0); // Will always select first item
    const result = getTemperatureText(26);
    expect(result).toBe(TemperatureText[0]);
    expect(result).toEqual(expect.stringContaining(""));
  });

  it("returns a moderate text for temperatures between 27 and 29", () => {
    vi.spyOn(Math, "random").mockReturnValue(0); // Will always select first item of moderate range
    const result = getTemperatureText(28);
    expect(result).toBe(TemperatureText[5]);
    expect(result).toEqual(expect.stringContaining(""));
  });

  it("returns a hot text for temperatures between 30 and 33", () => {
    vi.spyOn(Math, "random").mockReturnValue(0); // Will always select first item of hot range
    const result = getTemperatureText(32);
    expect(result).toBe(TemperatureText[10]);
    expect(result).toEqual(expect.stringContaining(""));
  });

  it("returns the extreme heat message for temperatures 34 and above", () => {
    const result = getTemperatureText(35);
    expect(result).toBe(
      "It's so hot, even the sun is considering early retirement.",
    );
  });

  it("selects different texts for multiple calls in the same range", () => {
    vi.spyOn(Math, "random").mockReturnValueOnce(0).mockReturnValueOnce(0.99);
    const result1 = getTemperatureText(26);
    const result2 = getTemperatureText(26);
    expect(result1).not.toBe(result2);
  });

  it("always returns a string", () => {
    const temperatures = [20, 28, 32, 40];
    temperatures.forEach((temp) => {
      const result = getTemperatureText(temp);
      expect(typeof result).toBe("string");
    });
  });
});
