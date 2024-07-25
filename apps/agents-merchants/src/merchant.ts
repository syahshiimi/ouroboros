import { faker } from "@faker-js/faker";
import { seeder } from "./utils/seeder.ts";
import { merchant } from "./domains/derivatives/derivative.ts";

// Market Story
// The merchant should
// 1. Read from incoming weather streams/
// 2. Deduce some calculations
// 3. Give a set of thresholds, produce a derivative that is floated in the market
// 4. indicate if a derivative has been purchased
function merchantEmulation() {
  const merchantName = faker.company.name();
  const topic = seeder();
  const derivative = merchant.create(topic).log();

  merchant.generateContract(derivative).log();

  // This is a representation of the actual contract derivative produced by the merchant.
  // Merchants: Visual representation of the derivative contracts the merchant has produced.
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

     ${derivative.location} WEATHER
       DERIVATIVE
    `);
  }, 2000);
}

const main = () => {
  setInterval(() => {
    merchantEmulation();
  }, 8000);
};

main();
