import { describe, it, expect, vi, beforeEach } from "vitest";
import { faker } from "@faker-js/faker";
import { Merchant } from "./index.ts";
import * as seeder from "../../../utils/seeder.ts";

// Mock faker to ensure consistent results
vi.mock("@faker-js/faker", () => ({
  faker: {
    number: {
      float: vi.fn(),
    },
    finance: {
      amount: vi.fn(),
    },
    location: {
      country: vi.fn(),
    },
    date: {
      future: vi.fn(),
    },
  },
}));

describe("Merchant", () => {
  let merchant: Merchant;
  const mathRandomSpy = vi.spyOn(Math, "random");

  beforeEach(() => {
    merchant = new Merchant("Test Merchant");
    // Reset all mocks before each test
    vi.resetAllMocks();
    mathRandomSpy.mockReset;
  });

  it("should create a merchant with the given name", () => {
    expect(merchant.name).toBe("Test Merchant");
  });

  it("should read weather stream correctly", () => {
    vi.mocked(faker.number.float)
      .mockReturnValueOnce(30)
      .mockReturnValueOnce(75)
      .mockReturnValueOnce(50);

    const weatherStream = merchant.readWeatherStream();
    expect(weatherStream).toEqual({
      temperature: 30,
      humidity: 75,
      precipitation: 50,
    });
  });

  it("should deduce calculations correctly", () => {
    const weatherData = {
      temperature: 30,
      humidity: 75,
      precipitation: 50,
    };

    const calculateTemperature =
      0.5 *
      (weatherData.temperature +
        61.0 +
        (weatherData.temperature - 68.0) * 1.2 +
        weatherData.humidity * 0.094);

    const calculateHumidity =
      0.5 *
      (weatherData.humidity +
        61.0 +
        (weatherData.humidity - 68.0) * 1.2 +
        weatherData.humidity * 0.094);

    const calculations = merchant.deduceCalculations(weatherData);
    expect(calculations.precipitationRisk).toBe("Medium");
    expect(calculations.heatIndex).toBeCloseTo(calculateTemperature, 4);
    expect(calculations.humidityIndex).toBeCloseTo(calculateHumidity, 4);
  });

  it("should produce a derivative correctly", () => {
    const calculations = {
      heatIndex: 86.55,
      humidityIndex: 134.55,
      precipitationRisk: "High",
    };

    vi.mocked(faker.finance.amount).mockReturnValue("500");
    vi.mocked(faker.location.country).mockReturnValue("TestLand");
    vi.mocked(faker.date.future).mockReturnValue(new Date("2025-01-01"));
    vi.spyOn(seeder, "seeder").mockReturnValue("temperature");

    const derivative = merchant.produceDerivative(calculations);
    expect(derivative).toEqual({
      merchant: "Test Merchant",
      type: "Temperature",
      threshold: 50,
      price: "500",
      location: "TestLand",
      expirationDate: new Date("2025-01-01"),
      purchased: false,
    });
  });

  it("should float a derivative correctly when purchased", () => {
    const derivative = {
      merchant: "Test Merchant",
      type: "Rainfall",
      threshold: 50,
      price: "500",
      location: "TestLand",
      expirationDate: new Date("2025-01-01"),
      purchased: false,
    };

    const consoleSpy = vi.spyOn(console, "log");
    vi.useFakeTimers();

    // Mock Math.random to always return 0.6 (which is > 0.5, so isPurchased will be true)
    mathRandomSpy.mockReturnValue(0.6);

    merchant.floatDerivative(derivative);

    vi.runAllTimers();

    expect(consoleSpy).toHaveBeenCalledWith("Weather Derivative:", derivative);
    expect(consoleSpy).toHaveBeenCalledWith("\nFinding buyers...");
    expect(consoleSpy).toHaveBeenCalledWith("\nDerivative purchased");
  });

  it("should float a derivative correctly when not purchased", () => {
    const derivative = {
      merchant: "Test Merchant",
      type: "Rainfall",
      threshold: 50,
      price: "500",
      location: "TestLand",
      expirationDate: new Date("2025-01-01"),
      purchased: false,
    };

    const consoleSpy = vi.spyOn(console, "log");
    vi.useFakeTimers();

    // Mock Math.random to always return 0.4 (which is <= 0.5, so isPurchased will be false)
    mathRandomSpy.mockReturnValue(0.4);

    merchant.floatDerivative(derivative);

    vi.runAllTimers();

    expect(consoleSpy).toHaveBeenCalledWith("Weather Derivative:", derivative);
    expect(consoleSpy).toHaveBeenCalledWith("\nFinding buyers...");
    expect(consoleSpy).toHaveBeenCalledWith("\nDerivative not purchased");
    expect(consoleSpy).not.toHaveBeenCalledWith(
      expect.stringContaining("PURCHASED"),
    );
  });
});
