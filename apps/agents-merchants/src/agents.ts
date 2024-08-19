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
  const isLogging = process.env["AGENT_LOGGING"] === "true";
  const enableGfx = process.env["ENABLE_GFX"] === "true";

  isLogging &&
    console.log(`${agent.name} searching through the trade book... \n`);
  const options = agent.lurkOptions(isLogging);

  enableGfx &&
    console.log(
      `${agent.name} has submitted a bid for ${options.topic} weather derivative ${options.derivativeType} at a cost of ${options.derivatives.price} USD per derivative.`,
    );
  const bid = agent.submitDerivativeBid(options);
  isLogging && console.log("\n", bid);

  agent.determineBid(bid, options, agentName, isLogging, enableGfx);
}

(async () => {
  setInterval(() => {
    agentEmulation();
  }, 15000);
})();
