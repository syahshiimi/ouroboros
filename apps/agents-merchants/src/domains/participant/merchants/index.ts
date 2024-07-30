import { faker } from "@faker-js/faker";
import { generator } from "../../../utils/generator.ts";
import { seeder } from "../../../utils/seeder.ts";
import { derivativeGraphics } from "../../derivatives/graphics";

export class Merchant {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  readWeatherStream() {
    return this.getWeatherStream();
  }

  private getWeatherStream() {
    return {
      temperature: faker.number.float({ min: 25, max: 34, fractionDigits: 2 }),
      humidity: faker.number.float({ min: 55, max: 95, fractionDigits: 2 }),
      precipitation: faker.number.float({
        min: 0,
        max: 100,
        fractionDigits: 1,
      }),
    };
  }

  deduceCalculations(weatherData: ReturnType<typeof this.getWeatherStream>) {
    const heatIndex = this.calculateHeatIndex(
      weatherData.temperature,
      weatherData.humidity,
    );
    const precipitationRisk = this.calculatePrecipitationRisk(
      weatherData.precipitation,
    );
    const humidityIndex = this.calculateHumidityIndex(weatherData.humidity);
    return { heatIndex, humidityIndex, precipitationRisk };
  }

  private calculateHeatIndex(temperature: number, humidity: number) {
    return (
      0.5 * (temperature + 61.0 + (temperature - 68.0) * 1.2 + humidity * 0.094)
    );
  }

  private calculateHumidityIndex(humidity: number) {
    return 0.5 * (humidity + 61.0 + (humidity - 68.0) * 1.2 + humidity * 0.094);
  }

  private calculatePrecipitationRisk(precipitation: number) {
    if (precipitation < 30) return "Low";
    if (precipitation < 70) return "Medium";
    return "High";
  }

  // TODO: This method only produces one derivative. However, as the underlying method 'deduceCalculations'
  // returns 3 indexes, we might want to produce three derivatives instead...
  produceDerivative(calculations: ReturnType<typeof this.deduceCalculations>) {
    const seedTopic = seeder();
    const topic = seedTopic.charAt(0).toUpperCase() + seedTopic.slice(1);
    return {
      merchant: this.name,
      type: topic,
      threshold: calculations.precipitationRisk === "High" ? 50 : 30,
      price: faker.finance.amount({ min: 100, max: 1000 }),
      location: faker.location.country(),
      expirationDate: faker.date.future({ years: 2 }),
      purchased: false,
    };
  }

  floatDerivative(derivative: ReturnType<typeof this.produceDerivative>) {
    console.log("Weather Derivative:", derivative);

    console.log("\nFinding buyers...");

    setTimeout(
      () => {
        const isPurchased = Math.random() > 0.5;
        Object.assign(derivative, { purchased: isPurchased });
        // TODO: this console log can be asynchronous. Whether or not who buys it
        // shouldn't necessary be logged here as purchasing of a weather derivative
        // can happen at _any_ time.
        console.log(
          "\n" + `Derivative ${isPurchased ? "purchased" : "not purchased"}`,
        );
        !isPurchased && console.log("-".repeat(40));
        if (isPurchased) this.visualizeDerivative(derivative);
      },
      generator(2000, 6000),
    );
  }

  private visualizeDerivative(
    derivative: ReturnType<typeof this.produceDerivative>,
  ) {
    console.log(this.getDerivativeVisuals(derivative));
    console.log("-".repeat(40));
  }

  private getDerivativeVisuals(
    derivative: ReturnType<typeof this.produceDerivative>,
  ) {
    const topicGraphics =
      derivativeGraphics.graphics[
        derivative.type.toLowerCase() as ReturnType<typeof seeder>
      ];
    const topicSeedNumber = generator(0, 3);
    return topicGraphics[topicSeedNumber];
  }
}
