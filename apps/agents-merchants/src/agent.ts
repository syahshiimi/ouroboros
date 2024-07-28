import { faker } from "@faker-js/faker";
import { merchant } from "./domains/derivatives/derivative.ts";
import { Agent, agents } from "./domains/participant/agents";
import { derivativeGraphics } from "./domains/derivatives/graphics/derivatives";
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
  const agent = new Agent(agentName);

  console.log(`${agent.name} searching through the tradebook... \n`);
  const options = agent.lurkOptions();
  console.log(`${agent.name} has chosen a derivative to interact. \n`);
  console.log(options.topic, options.derivatives);

  // const topic = seeder();
  // const derivative = merchant.create(topic).result;
  //
  // agents.purchase(agentName);
  // merchant.generateContract(derivative);
  //
  // // This is a representation of the actual derivative asset class.
  // // Agents: Visual representation of a _successful_ derivative transaction by agents (Market participants)
  // setTimeout(
  //   () => {
  //     console.log(derivativeGraphics.getVisuals(generator(0, 3), topic));
  //   },
  //   generator(500, 2000),
  // );
}

const main = () => {
  setInterval(() => {
    agentEmulation();
  }, 5000);
};

main();
