"use client";
export default function MercantilerDerivativeGenerator() {
  const WeatherDerivative = {
    create: function (
      location: any,
      season: any,
      temperatureThreshold: any,
      contractValue: any,
    ) {
      return {
        location: location,
        season: season,
        temperatureThreshold: temperatureThreshold,
        contractValue: contractValue,
        payoutMultiplier: 1.5, // 150% of contract value
      };
    },

    generateContract: function (derivative: {
      season: any;
      location: any;
      temperatureThreshold: any;
      payoutMultiplier: number;
      contractValue: number;
    }) {
      return `
Temperature Increase Derivative Contract

1. Underlying Event: Average temperature during ${derivative.season} in ${derivative.location}.
2. Temperature Threshold: ${derivative.temperatureThreshold}°C
3. Payout Structure: If average temperature exceeds the threshold, the holder receives a payout of ${derivative.payoutMultiplier * 100}% of the contract value.
4. Contract Period: ${derivative.season}
5. Location: ${derivative.location}
6. Measurement Authority: [Designated meteorological agency]
7. Settlement: Payout to be made within 5 business days after the end of the contract period.
8. Contract Value: $${derivative.contractValue.toFixed(2)}
      `;
    },
  };

  const Mercantiler = {
    generateDerivative: function (currentTemperature: number, location: any) {
      const temperatureThreshold = currentTemperature + 2; // Set threshold 2°C above current
      const contractValue = 1000 + currentTemperature * 10; // Example pricing model
      const season = "Summer 2024"; // Example season

      const newDerivative = WeatherDerivative.create(
        location,
        season,
        temperatureThreshold,
        contractValue,
      );
      console.log("New derivative generated:");
      console.log(WeatherDerivative.generateContract(newDerivative));

      this.publishGraphic(newDerivative);

      return newDerivative;
    },
    publishGraphic: function (derivative: {
      temperatureThreshold: number;
      location: any;
      contractValue: number;
    }) {
      const currentTemp = derivative.temperatureThreshold - 2;
      console.log(`
  Temperature Increase Derivative for ${derivative.location}

       ☀️   ☀️   ☀️   ☀️   ☀️
    __/\\/\\__/\\/\\__/\\/\\__/\\/\\__
   (     TEMPERATURE RISE     )
    )                        (
   (  Current   Threshold     )
    ) ${currentTemp.toFixed(1)}°C   ${derivative.temperatureThreshold.toFixed(1)}°C (
   (     |          |         )
    )    |          |        (
   (     |          |         )
    )    |          |        (
   (    🌡️         🌡️         )
    )    |          |        (
   (     |          |         )
    )    |          |        (
   (__________________________)
      |  |   |   |   |  |  |
     🌴 🌿  🌴  🌿  🌴 🌿 🌴
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     HUMIDITY: ${(70 + Math.random() * 20).toFixed(1)}%
   Contract Value: $${derivative.contractValue.toFixed(2)}
  `);
    },
  };

  // Demo
  console.log("Simulating temperature increase and derivative generation:");
  let currentTemperature = 30;
  const location = "Bangkok, Thailand";

  console.log(`Current temperature in ${location}: ${currentTemperature}°C`);
  Mercantiler.generateDerivative(currentTemperature, location);

  // Simulate temperature increase
  currentTemperature += 1.5;
  console.log(`\nTemperature increased to ${currentTemperature}°C`);
  Mercantiler.generateDerivative(currentTemperature, location);

  return <></>;
}
