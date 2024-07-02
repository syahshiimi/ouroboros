import { describe, it, expect } from "vitest";
import { z } from "zod";
import { parse } from "../routes/utils/parse.js";

describe("parse function", () => {
  const testSchema = z.object({
    name: z.string(),
    age: z.number(),
  });

  it("should successfully parse valid data", async () => {
    const validData = { name: "John Doe", age: 30 };
    const result = await parse(validData, testSchema);

    expect(result.parsed.success).toBe(true);
    expect(result.parsed.data).toEqual(validData);
  });

  it("should fail to parse invalid data", async () => {
    const invalidData = { name: "Jane Doe", age: "25" }; // age should be a number
    const result = await parse(invalidData, testSchema);

    expect(result.parsed.success).toBe(false);
    expect(result.parsed.error).toBeDefined();
  });

  it("should handle empty input", async () => {
    const emptyData = {};
    const result = await parse(emptyData, testSchema);

    expect(result.parsed.success).toBe(false);
    expect(result.parsed.error).toBeDefined();
  });

  it("should handle null input", async () => {
    const nullData = null;
    const result = await parse(nullData, testSchema);

    expect(result.parsed.success).toBe(false);
    expect(result.parsed.error).toBeDefined();
  });
});
