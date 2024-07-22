import { Faker, faker } from "@faker-js/faker";
import { WeatherDerivative } from "./src/domains/derivatives/derivative.ts";
import { MarketParticipant } from "./src/domains/participant/participant.ts";

/**
 * The market participant service responsible for
 * 1. The creation of a market participant
 * 2. The emulated return/response of purchasing weather derivatives.
 *
 * Formerly known as the _Agent Trade Book_.
 */
export default function marketParticipant() {
  const marketParticipantName = faker.company.name();
  const derivativeLocation = faker.location.country();
  const newDerivative = WeatherDerivative.create(
    derivativeLocation,
    "Summer 2024",
    10,
    Number(faker.finance.amount({ min: 1200, max: 8500 })),
    // TODO: We can randomise this between the topics of 1) Temperature, 2) Rainfall, 3) Humidity.
    "Temperature",
  );
  const contract = WeatherDerivative.generateContract(newDerivative);

  console.log("Creating a new weather derivative", newDerivative);
  console.log(`${newDerivative.topic} hedge contractual details`, contract);

  MarketParticipant.purchase(marketParticipantName, newDerivative);

  // Visual representation of a _successful_ transaction.
  setTimeout(() => {
    // TODO: Let's have each topic produce three separate graphics.
    // Therefore, if there are three topics, we should have a total of 9 graphics.
    console.log(`
         .-~~~-.
  .- ~ ~-(       )_ _
 /                    ~ -.
|                          \\
 \\                         .'
   ~- . _____________ . -~
         \\\\\\\\\\\\\\\\\\\\
          \\\\\\\\\\\\\\\\\\
           \\\\\\\\\\\\\\\\
            \\\\\\\\\\\\\\
             \\\\\\\\\\\\
              \\\\\\\\\\
               \\\\\\\\
                \\\\\\
     _________________________
    |                         |
    |   A MONSOON RAINFALL    |
    |   DERIVATIVE WAS SOLD.  |
    |_________________________|
      `);
  }, 500);

  // Visual representation of the derivative produced.
  setTimeout(() => {
    // TODO: Let's have each topic produce three separate graphics.
    // Therefore, if there are three topics, we should have a total of 9 graphics.
    console.log(`
       ☀️   ☁️   ☁️  ☀️  
    __/\\/\\__/\\/\\__/\\/\\__
     )  ☂️   ☂️   ☂️   (  
    (     HUMIDITY    ) 
     )    90% | 90%  (   
    (     80% | 80%   )  
     )    70% | 70%  (   
    (     60% | 60%   )  
     )  WET   | DRY  (   
    (___________________) 
      |  |  |🌡️|  |  |
      |  |  |35°|  |  |
    ~~|  |~~|   |~~|  |~~
    🌿 🌴  🌿 🌴 🌿 🌴 🌿

     ${derivativeLocation} WEATHER
       DERIVATIVE
    `);
  }, 1000);
}

const main = () => {
  setInterval(() => {
    marketParticipant();
  }, 5000);
};

main();
