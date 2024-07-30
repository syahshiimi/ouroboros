import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { Agent } from "./index.ts";
import * as faker from "@faker-js/faker";

// Mock the DerivativeStream class
vi.mock("../../derivatives/stream.ts", () => {
  return {
    DerivativeStream: vi.fn().mockImplementation(() => {
      return {
        produceDerivativeStream: vi.fn().mockReturnValue({
          temperature: {
            options: { price: 100, quantity: 10000 },
            swaps: { price: 80, quantity: 15000 },
            futures: { price: 120, quantity: 8000 },
          },
          rainfall: {
            options: { price: 90, quantity: 12000 },
            swaps: { price: 70, quantity: 18000 },
            futures: { price: 110, quantity: 9000 },
          },
          humidity: {
            options: { price: 95, quantity: 11000 },
            swaps: { price: 75, quantity: 16000 },
            futures: { price: 115, quantity: 8500 },
          },
        }),
      };
    }),
  };
});

// Mock faker
vi.mock("faker", () => ({
  number: {
    float: vi.fn(),
    int: vi.fn(),
  },
  finance: {
    amount: vi.fn(),
  },
  company: {
    name: vi.fn(),
  },
}));

describe.skip("Agent", () => {
  let agent: Agent;

  beforeEach(() => {
    agent = new Agent("TestAgent");
    vi.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("constructor initializes name correctly", () => {
    expect(agent.name).toBe("TestAgent");
  });

  it("lurkOptions returns expected structure", () => {
    const result = agent.lurkOptions();

    expect(result).toHaveProperty("derivatives");
    expect(result).toHaveProperty("derivativeType");
    expect(result).toHaveProperty("topic");
    expect(["temperature", "rainfall", "humidity"]).toContain(result.topic);
    expect(["options", "swaps", "futures"]).toContain(result.derivativeType);
  });

  it("submitDerivativeBid returns expected structure", () => {
    const mockDerivative = {
      derivatives: { price: 100, quantity: 10000 },
      derivativeType: "options" as "options" | "swaps" | "futures",
      topic: "temperature" as "temperature" | "rainfall" | "humidity",
    };

    vi.spyOn(agent as any, "agentTraits").mockReturnValue({
      capital: 1000,
      riskAppetite: 0.5,
    });
    vi.mocked(faker.number.float).mockReturnValue(0.5);

    const result = agent.submitDerivativeBid(mockDerivative);

    expect(result).toHaveProperty("bid");
    expect(result).toHaveProperty("bidQuantity");
    expect(result).toHaveProperty("derivative");
  });

  it("determineBid logs correct messages based on merchant propensity", () => {
    const mockBid = { bid: 1000, bidQuantity: 10, derivative: {} };
    const mockOptions = {
      topic: "temperature" as "temperature" | "rainfall" | "humidity",
      derivativeType: "options" as "options" | "swaps" | "futures",
      derivatives: { price: 100, quantity: 10000 },
    };

    vi.mocked(faker.number.float).mockReturnValue(0.5);
    vi.mocked(faker.company.name).mockReturnValue("TestMerchant");

    agent.determineBid(mockBid, mockOptions, "TestAgent");

    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining("TestMerchant has sold"),
    );
  });
});
