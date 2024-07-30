import { faker } from "@faker-js/faker";
import { seeder } from "../../../utils/seeder.ts";
import { generator } from "../../../utils/generator.ts";
import { derivativeGraphics } from "../../derivatives/graphics/derivatives";
import { DerivativeStream } from "../../derivatives/stream.ts";

/**
 * Produces the agent as a market participant.
 */
export class Agent {
  name: string;
  derivativeStream = new DerivativeStream();
  constructor(name: string) {
    this.name = name;
  }

  lurkOptions() {
    const derivativesStream = this.derivativeStream.produceDerivativeStream();
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
    let bid: number;

    if (riskAppetite <= 0.2) {
      bid = this.calculateBid(capital, 0.3, 0.4);
    } else if (riskAppetite > 0.2 && riskAppetite < 0.5) {
      bid = this.calculateBid(capital, 0.4, 0.5);
    } else if (riskAppetite > 0.5 && riskAppetite < 0.8) {
      bid = this.calculateBid(capital, 0.5, 0.6);
    } else {
      bid = this.calculateBid(capital, 0.7, 1);
    }
    const bidQuantity = bid / pricePerDerivative;
    return { bid, bidQuantity, derivative };
  }

  private calculateBid(
    capital: number,
    minFactor: number,
    maxFactor: number,
  ): number {
    return capital * faker.number.float({ min: minFactor, max: maxFactor });
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
