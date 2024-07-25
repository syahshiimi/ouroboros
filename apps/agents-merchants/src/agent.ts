import { faker } from "@faker-js/faker";
import { merchant } from "./domains/derivatives/derivative.ts";
import { agents } from "./domains/participant";
import { derivativeGraphics } from "./domains/derivatives/graphics/derivatives.ts";
import { generator } from "./utils/generator.ts";
import { seeder } from "./utils/seeder.ts";

/**
 * The agent (market participant) emulation service responsible for
 * 1. The creation of a market agent (market participant).
 * 2. The emulated return/response of purchasing weather derivatives.
 * 3, The emulated creation of a weather derivative asset class and contract by the merchant service.
 *
 * Formerly known as the _Agent Trade Book_.
 */
function agentEmulation() {
  const agentName = faker.company.name();
  const topic = seeder();
  const derivative = merchant.create(topic).log();

  merchant.generateContract(derivative).log();
  agents.purchase(agentName);

  // This is a representation of the actual derivative asset class.
  // Agents: Visual representation of a _successful_ derivative transaction by agents (Market participants)
  setTimeout(() => {
    console.log(derivativeGraphics.getVisuals(generator(0, 3), topic));
  }, 500);

  // TODO: Might want to remove this part... considering this seems to be the responsibiliyt of the merchant to emit.
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
    agentEmulation();
  }, 5000);
};

main();
