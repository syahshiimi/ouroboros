import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { getRainfall } from "@/utils/topics/getRainfall";
import { rainfallText } from "../../../public/text/rainfall.text";

describe("getRainfall", () => {
  beforeEach(() => {
    vi.spyOn(Math, "random").mockReturnValue(0);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns a dry spell text when rainfall is 0", () => {
    const result = getRainfall(0);
    expect(result).toBe(rainfallText[1]);
  });

  it("returns a very light rain text when rainfall is less than 0.2", () => {
    const result = getRainfall(0.1);
    expect(result).toBe(rainfallText[4]);
  });

  it("returns a light rain text when rainfall is between 0.2 and 0.99", () => {
    const result = getRainfall(0.5);
    expect(result).toBe(rainfallText[7]);
  });

  it("returns a moderate rain text when rainfall is between 1 and 1.99", () => {
    const result = getRainfall(1.5);
    expect(result).toBe(rainfallText[10]);
  });

  it("returns a heavy rain text when rainfall is 2 or more", () => {
    const result = getRainfall(2);
    expect(result).toBe(rainfallText[0]);
  });

  it("returns different texts for multiple calls with the same input", () => {
    vi.spyOn(Math, "random")
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0.66)
      .mockReturnValueOnce(0.99);

    const result1 = getRainfall(0);
    const result2 = getRainfall(0);
    const result3 = getRainfall(0);

    expect(result1).toBe(rainfallText[1]);
    expect(result2).toBe(rainfallText[2]);
    expect(result3).toBe(rainfallText[3]);
  });
});
