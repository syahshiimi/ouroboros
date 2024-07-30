import { faker } from "@faker-js/faker";
import { Agent } from "./domains/participant/agents";

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
  console.log(
    `${agent.name} has chosen derivative ${options.derivativeType} to bid. \n`,
  );
  console.log(options.topic, options.derivatives);

  const bid = agent.submitDerivativeBid(options);
  console.log(
    `${agent.name} has submitted a bid for the topic of ${options.topic} with a 
total qty of ${bid.bidQuantity} at ${options.derivatives.price} per derivative
with a deployment capital of ${bid.budget}.`,
  );

  agent.determineBid(bid);
}

const main = () => {
  setInterval(() => {
    agentEmulation();
  }, 5000);
};

main();
