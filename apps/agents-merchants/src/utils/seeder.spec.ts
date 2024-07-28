import { describe, expect, test } from "vitest";
import { seeder } from "./seeder.ts";

describe("seeder", async () => {
  test("should create a topic", () => {
    const topic = seeder();
    expect(topic).toBeTypeOf("string");
  });
});
