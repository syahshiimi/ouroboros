import { de, faker } from "@faker-js/faker";
import { Merchant } from "../merchants";
import { seeder } from "../../../utils/seeder.ts";
import { generator } from "../../../utils/generator.ts";

/**
 * Produces the market participant
 */
export const agents = {
  purchase: function (name: string) {
    console.log(`\n${name} has purchased the following weather derivative:`);
  },
};

// TODO: Refactor and use clases to create methods for the agent story.

// 1. Agent lurks the public tradebook market to see options available. We can emulatoe through an optiona
// trade options such as swaps, optoins, futures or forwards.
// 2. Given the option that it is interested, submit a bit for the weather derivative based on the topic of weather derivative
// it would be most inclined to go for i.e. temperature or rainfall or humidity.
// 3. The bid may or may not be successful, and the trader can buy the weather derivative
// for a given price and at fractional levels as well.
// 4. Upon successful purchase, we display the graphics.
export class Agent {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  // A method for the agent to lurk the market and find a weather derivative
  // it would be interested in.
  // It should return the topic + the derivative type it is interested in retrieving.
  lurkOptions() {
    const derivativesStream = this.getDerivativesStream();
    const topicSeed = seeder();
    const derivativeSeed = generator(0, 2);
    const derivativeType = () => {
      if (derivativeSeed === 0) return "option";
      if (derivativeSeed === 1) return "swaps";
      if (derivativeSeed === 2) return "futures";
      return "option";
    };
    return {
      derivatives: derivativesStream[topicSeed][derivativeType()],
      topic: topicSeed,
    };
  }

  // Produces the various derivatives that are available in the market.
  private getDerivativesStream() {
    return {
      temperature: {
        option: this.optionsGenerator(),
        swaps: this.swapsGenerator(),
        futures: this.futuresGenerator(),
      },
      rainfall: {
        option: this.optionsGenerator(),
        swaps: this.swapsGenerator(),
        futures: this.futuresGenerator(),
      },
      humidity: {
        option: this.optionsGenerator(),
        swaps: this.swapsGenerator(),
        futures: this.futuresGenerator(),
      },
    };
  }

  private optionsGenerator() {
    return {
      price: faker.finance.amount({ min: 7, max: 125, dec: 3 }),
      quantity: this.produceAvailableQuantity(),
    };
  }

  private swapsGenerator() {
    return {
      price: faker.finance.amount({ min: 5, max: 100, dec: 3 }),
      quantity: this.produceAvailableQuantity(),
    };
  }

  private futuresGenerator() {
    return {
      price: faker.finance.amount({ min: 6, max: 250, dec: 3 }),
      quantity: this.produceAvailableQuantity(),
    };
  }

  private produceAvailableQuantity() {
    return faker.number.int({ min: 5000, max: 150000 });
  }

  // A method to submit the bid for the option the agent is interested in.
  // We may want to initialise a set of basic defaults ie budget to make things
  // realistic.
  submitBid() {
    // Initialise budget
    // Given the options it previously was interested in, submit a bid.
  }

  // A method to deduce if the bid is successful.
  determineBid() {}

  // A method to visualise the graphics, predicated on its success on bidding.
  visualizeDerivative() {}
}
