import { faker } from "@faker-js/faker";
import { merchant } from "./domains/derivatives";
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
export default function agentEmulation() {
  const agentName = faker.company.name();
  const derivativeLocation = faker.location.country();
  const derivativeOption = "Humidity";
  const newDerivative = merchant.create(
    derivativeLocation,
    "Summer 2024",
    10,
    Number(faker.finance.amount({ min: 1200, max: 8500 })),
    // TODO: We can randomise this between the topics of 1) Temperature, 2) Rainfall, 3) Humidity.
    derivativeOption,
  );
  const seedNumber = generator(0, 3);
  const contract = merchant.generateContract(newDerivative);

  console.log("Creating a new weather derivative", newDerivative, "\n");
  console.log(`${newDerivative.topic} hedge contractual details \n`, contract);

  agents.purchase(agentName);

  // Agents: Visual representation of a _successful_ derivative transaction by agents (Market participants)
  // This is a representation of the actual derivative asset class.
  setTimeout(() => {
    console.log(derivativeGraphics.getVisuals(seedNumber, "humidity"));
  }, 500);

  // Merchants: Visual representation of the derivative contracts the merchant has produced.
  // This is a representation of the actual contract derivative produced by the merchant.
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
