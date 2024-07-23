import { faker } from "@faker-js/faker";
import { type Derivative, merchant } from "./domains/derivatives/derivative.ts";
import { agents } from "./domains/participant";
import { derivativeGraphics } from "./domains/derivatives/graphics";
import { generator } from "./utils/generator.ts";

/**
 * The agent (market participant) emulation service responsible for
 * 1. The creation of a market agent (market participant).
 * 2. The emulated return/response of purchasing weather derivatives.
 * 3, The emulated creation of a weather derivative asset class and contract by the merchant service.
 *
 * Formerly known as the _Agent Trade Book_.
 */
function agentEmulation() {
  // TODO: This object initialisiation could be encapsulated
  // into the merchant.create() method to abstract and encapsulate
  // it out. This provides the benefit that this emulation() tasks doesn't
  // need to initialise anything. Let `create()` handle that logic.
  const agentName = faker.company.name();
  const derivativeLocation = faker.location.country();
  const derivativeOption = "Temperature";
  const seedNumber = generator(0, 3);

  const asset: Derivative = {
    location: derivativeLocation,
    season: "Summer 2024",
    strikeLevel: generator(5, 12),
    purchasePrice: Number(faker.finance.amount({ min: 1200, max: 8500 })),
    payoutMultiplier: 2,
    topic: derivativeOption,
  };
  const derivative = merchant.create(asset).log();

  merchant.generateContract(derivative).log();
  agents.purchase(agentName);

  // This is a representation of the actual derivative asset class.
  // Agents: Visual representation of a _successful_ derivative transaction by agents (Market participants)
  setTimeout(() => {
    console.log(derivativeGraphics.getVisuals(seedNumber, "temperature"));
  }, 500);

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

     ${derivativeLocation} WEATHER
       DERIVATIVE
    `);
  }, 2000);
}

const main = () => {
  setInterval(() => {
    agentEmulation();
  }, 5000);
};

main();
