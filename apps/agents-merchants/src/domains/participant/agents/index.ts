import { de, faker } from "@faker-js/faker";
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
      if (derivativeSeed === 0) return "options";
      if (derivativeSeed === 1) return "swaps";
      if (derivativeSeed === 2) return "futures";
      return "options";
    };
    return {
      derivatives: derivativesStream[topicSeed][derivativeType()],
      derivativeType: derivativeType(),
      topic: topicSeed,
    };
  }

  // Produces the various derivatives that are available in the market.
  private getDerivativesStream() {
    return {
      temperature: {
        options: this.optionsGenerator(),
        swaps: this.swapsGenerator(),
        futures: this.futuresGenerator(),
      },
      rainfall: {
        options: this.optionsGenerator(),
        swaps: this.swapsGenerator(),
        futures: this.futuresGenerator(),
      },
      humidity: {
        options: this.optionsGenerator(),
        swaps: this.swapsGenerator(),
        futures: this.futuresGenerator(),
      },
    };
  }

  private optionsGenerator() {
    return {
      price: Number(faker.finance.amount({ min: 7, max: 125, dec: 3 })),
      quantity: this.produceAvailableQuantity(),
    };
  }

  private swapsGenerator() {
    return {
      price: Number(faker.finance.amount({ min: 5, max: 100, dec: 3 })),
      quantity: this.produceAvailableQuantity(),
    };
  }

  // TODO: These futures have no risk. We can add in a strikeLevel + payout structure to determine a more dynamic risk price.
  //  The riskier the option the higher the price, which is predicated upon an extreme weather event.
  private futuresGenerator() {
    return {
      price: Number(faker.finance.amount({ min: 6, max: 250, dec: 2 })),
      quantity: this.produceAvailableQuantity(),
    };
  }

  private produceAvailableQuantity() {
    return faker.number.int({ min: 5000, max: 150000 });
  }

  // Given the options it previously was interested in, submit a bid.
  // The bidding process can begin as such
  // 1. The buyer has a randomly allocated budget.
  // 2. Given the risk appetite of the agent, it may buy a certain percentage of derivatives.
  submitDerivativeBid(derivative: ReturnType<typeof this.lurkOptions>) {
    const { capital, riskAppetite } = this.agentTraits();
    console.log(
      `The agent has a risk appetite of ${riskAppetite} and a capital of ${capital}\n`,
    );
    return this.agentBidding(riskAppetite, capital, derivative);
  }

  private agentBidding(
    riskAppetite: number,
    capital: number,
    derivative: ReturnType<typeof this.lurkOptions>,
  ) {
    const pricePerDerivative = derivative.derivatives.price;
    if (riskAppetite <= 0.2) {
      // The agent has a low-risk appetite, it might only want to deploy 30-40% of their total capital (budget)
      const budget = capital * faker.number.float({ min: 0.3, max: 0.4 });
      const bidQuantity = budget / pricePerDerivative;
      return {
        budget,
        bidQuantity,
      };
    } else if (riskAppetite > 0.2 && riskAppetite < 0.5) {
      // Medium-low risk appetite, 40-50% of capital.
      const budget = capital * faker.number.float({ min: 0.4, max: 0.5 });
      const bidQuantity = budget / pricePerDerivative;
      return {
        budget,
        bidQuantity,
      };
    } else if (riskAppetite > 0.5 && riskAppetite < 0.8) {
      // Medium-high risk appetite, 50-60% of capital.
      const budget = capital * faker.number.float({ min: 0.5, max: 0.6 });
      const bidQuantity = budget / pricePerDerivative;
      return {
        budget,
        bidQuantity,
      };
    } else {
      // Highest risk, 70% capital and above.
      const budget = capital * faker.number.float({ min: 0.7, max: 1 });
      const bidQuantity = budget / pricePerDerivative;
      return {
        budget,
        bidQuantity,
      };
    }
  }

  private agentTraits() {
    const capital = Number(
      faker.finance.amount({
        min: 5000,
        max: 10000,
        dec: 2,
      }),
    );
    const riskAppetite = faker.number.float({
      min: 0,
      max: 1,
      fractionDigits: 2,
    });
    return {
      capital,
      riskAppetite,
    };
  }

  // A method to deduce if the bid is successful.
  // The merchant, based on specific factors may
  // 1. Proceed to sell for the entire quantity in the bid
  // 2. Proceed to negotiate and sell at a higher price
  // 3. Proceed to negotiate and sell a lower amount
  determineBid(bid: ReturnType<typeof this.submitDerivativeBid>) {
    // As the application is 'stateless', we pass the initial option object to get the
    // floated derivative quantity.
    const merchantPropensity = faker.number.float({
      min: 0.2,
      max: 1,
      fractionDigits: 2,
    });
    console.log(
      `\nThe merchant has received a bid quantity of ${bid.bidQuantity}`,
    );

    // We derive the merchants propensity to sell at the bid's requested qty based on the propensity value.
    if (merchantPropensity < 0.8) {
      const sellingQty = merchantPropensity * bid.bidQuantity;
      console.log(
        `\nThe merchant which has a propensity of ${merchantPropensity} is selling ${sellingQty} worth of derivatives`,
      );
      return sellingQty;
    } else {
      console.log(
        `\nThe merchant which has a propensity of ${merchantPropensity} is selling ${bid.bidQuantity} worth of derivatives.`,
      );
      return bid.bidQuantity;
    }
  }

  // A method to visualise the graphics, predicated on its success on bidding.
  visualizeDerivative() {
    // We want to also reuse the derivative graphics.
    // Maybe we can also consider adding in some contractual details of the purchase.
  }
}
