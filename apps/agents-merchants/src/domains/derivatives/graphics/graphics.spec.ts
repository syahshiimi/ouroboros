import { describe, expect, test } from "vitest";
import { derivativeGraphics } from "./index.ts";

describe("derivativeGraphics", () => {
  // Test that the graphics object has the expected properties
  test("graphics object has rainfall and temperature properties", () => {
    expect(derivativeGraphics.graphics).toHaveProperty("rainfall");
    expect(derivativeGraphics.graphics).toHaveProperty("temperature");
  });

  // Test getting a valid rainfall graphic
  test("getVisuals returns a valid rainfall graphic", () => {
    const graphic = derivativeGraphics.getVisuals(0, "rainfall");
    expect(typeof graphic).toBe("string");
  });

  // Test getting a valid temperature graphic
  test("getVisuals returns a valid temperature graphic", () => {
    const graphic = derivativeGraphics.getVisuals(0, "temperature");
    expect(typeof graphic).toBe("string");
    expect(graphic).toContain("TEMPERATURE");
  });

  // Test out of bounds index returns a random graphic
  test("getVisuals returns a random graphic for out of bounds index", () => {
    const graphic = derivativeGraphics.getVisuals(1000, "rainfall");
    expect(typeof graphic).toBe("string");
  });

  // Test that an error is thrown for an invalid topic
  test("getVisuals throws an error for invalid topic", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expect(() => derivativeGraphics.getVisuals(0, "invalid")).toThrow(
      "Invalid topic: invalid",
    );
  });

  // Test that all graphics in each topic are strings
  test("all graphics in each topic are strings", () => {
    Object.values(derivativeGraphics.graphics).forEach((topicGraphics) => {
      topicGraphics.forEach((graphic) => {
        expect(typeof graphic).toBe("string");
      });
    });
  });

  // Test that getVisuals returns different graphics for different indices
  test("getVisuals returns different graphics for different indices", () => {
    const graphic1 = derivativeGraphics.getVisuals(0, "rainfall");
    const graphic2 = derivativeGraphics.getVisuals(1, "rainfall");
    expect(graphic1).not.toBe(graphic2);
  });
});
