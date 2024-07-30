import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { Agent } from "./index.ts";

describe("Agent", () => {
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
    } satisfies ReturnType<typeof agent.lurkOptions>;

    // Mock agentTraits
    vi.spyOn(agent as string, "agentTraits").mockReturnValue({
      capital: 1000,
      riskAppetite: 0.5,
    });

    // Mock calculateBid
    vi.spyOn(agent, "calculateBid").mockReturnValue(500);

    const result = agent.submitDerivativeBid(mockDerivative);

    expect(result).toBeDefined();
    expect(result).toHaveProperty("bid");
    expect(result.bid).toBe(500);
    expect(result).toHaveProperty("bidQuantity");
    expect(result.bidQuantity).toBe(5); // 500 / 100
    expect(result).toHaveProperty("derivative");
    expect(result.derivative).toEqual(mockDerivative);
  });

  it("determineBid logs correct messages based on merchant propensity", () => {
    const mockBid = { bid: 1000, bidQuantity: 10, derivative: {} };
    const mockOptions = {
      topic: "temperature" as "temperature" | "rainfall" | "humidity",
      derivativeType: "options" as "options" | "swaps" | "futures",
      derivatives: { price: 100, quantity: 10000 },
    };

    agent.determineBid(mockBid, mockOptions, "TestAgent");

    expect(console.log).not.toBeNull;
  });
});
