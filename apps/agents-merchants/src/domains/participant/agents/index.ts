import { faker } from "@faker-js/faker";
import { seeder } from "../../../utils/seeder.ts";
import { generator } from "../../../utils/generator.ts";
import { derivativeGraphics } from "../../derivatives/graphics/derivatives";

/**
 * Produces the agent as a market participant.
 */
export class Agent {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

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
    console.log(
      `${this.name} has chosen derivative ${derivativeType()} to bid. \n`,
    );
    return {
      derivatives: derivativesStream[topicSeed][derivativeType()],
      derivativeType: derivativeType(),
      topic: topicSeed,
    };
  }

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
  submitDerivativeBid(derivative: ReturnType<typeof this.lurkOptions>) {
    const { capital, riskAppetite } = this.agentTraits();
    return this.agentBidding(riskAppetite, capital, derivative);
  }

  private agentBidding(
    riskAppetite: number,
    capital: number,
    derivative: ReturnType<typeof this.lurkOptions>,
  ) {
    const pricePerDerivative = derivative.derivatives.price;
    const derivativeTopic = derivative.topic;
    if (riskAppetite <= 0.2) {
      const bid = capital * faker.number.float({ min: 0.3, max: 0.4 });
      const bidQuantity = bid / pricePerDerivative;
      return {
        bid,
        bidQuantity,
        derivativeTopic,
      };
    } else if (riskAppetite > 0.2 && riskAppetite < 0.5) {
      const bid = capital * faker.number.float({ min: 0.4, max: 0.5 });
      const bidQuantity = bid / pricePerDerivative;
      return {
        bid,
        bidQuantity,
        derivativeTopic,
      };
    } else if (riskAppetite > 0.5 && riskAppetite < 0.8) {
      const bid = capital * faker.number.float({ min: 0.5, max: 0.6 });
      const bidQuantity = bid / pricePerDerivative;
      return {
        bid,
        bidQuantity,
        derivativeTopic,
      };
    } else {
      const bid = capital * faker.number.float({ min: 0.7, max: 1 });
      const bidQuantity = bid / pricePerDerivative;
      return {
        bid,
        bidQuantity,
        derivativeTopic,
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

  determineBid(
    bid: ReturnType<typeof this.submitDerivativeBid>,
    options: ReturnType<typeof this.lurkOptions>,
    agentName: string,
  ) {
    const merchantPropensity = faker.number.float({
      min: 0.2,
      max: 1,
      fractionDigits: 2,
    });
    const merchantName = faker.company.name();
    console.log(
      `\n${merchantName} has received a bid for ${options.topic} weather derivative ${options.derivativeType} from ${agentName}.`,
    );
    if (merchantPropensity >= 0.22 && merchantPropensity < 0.8) {
      const sellingQty = merchantPropensity * bid.bidQuantity;
      const totalSellingPrice = sellingQty * options.derivatives.price;
      console.log(
        `\n${merchantName} has sold ${totalSellingPrice.toFixed(2)} USD worth of derivatives to ${agentName}.`,
      );
    } else if (merchantPropensity <= 0.21) {
      console.log(
        `\n${merchantName} has rejected the bid of ${bid.bid.toFixed(2)} USD worth of derivatives from ${agentName}.`,
      );
    } else {
      console.log(
        `\n${merchantName} has sold ${bid.bid.toFixed(2)} USD worth of derivatives to ${agentName}.`,
      );
    }

    setTimeout(() => {
      this.getDerivativeVisuals(options.topic);
    }, 5000);
  }

  private getDerivativeVisuals(
    topic: ReturnType<typeof this.lurkOptions>["topic"],
  ) {
    console.log(derivativeGraphics.graphics[topic][generator(0, 3)]);
    console.log("-".repeat(40));
  }
}
