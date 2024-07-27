import { faker } from "@faker-js/faker";
import { Merchant } from "./domains/participant/merchants";

function merchantEmulation() {
  const merchant = new Merchant(faker.company.name());

  console.log("\nIncoming weather data stream...");
  const weatherData = merchant.readWeatherStream();
  console.log("\n Weather data:", weatherData);

  console.log("\nCalculating weather stream asset classes...");
  const calculations = merchant.deduceCalculations(weatherData);
  console.log("\n Calculations:", calculations);

  const derivative = merchant.produceDerivative(calculations);

  console.log("\nA new derivative floated in the market...\n");
  merchant.floatDerivative(derivative);
}

const main = () => {
  setInterval(() => {
    merchantEmulation();
  }, 15000);
};

main();
