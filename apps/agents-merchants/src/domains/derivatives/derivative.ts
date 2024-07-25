import { creator } from "./contracts/creator.ts";
import { derivativeCreator } from "./creator.ts";

export interface Derivative {
  location: string;
  season: string;
  strikeLevel: number;
  purchasePrice: number;
  payoutMultiplier: number;
  topic: string;
}

/**
 * The weather derivative object method that constructs and implements the necessary
 * details for the creation of a weather derivative.
 */
export const merchant = {
  create: function () {
    const asset = derivativeCreator();
    return {
      result: asset,
      log: () => {
        this.log("Creating a new weather derivative", asset, "\n");
        return asset;
      },
    };
  },
  generateContract: function (derivative: Derivative) {
    const contract = creator(derivative);
    return {
      contract: contract,
      log: () => {
        this.log(`${derivative.topic} hedge contractual details: \n`, contract);
        return contract;
      },
    };
  },
  log: function (...args: unknown[]) {
    console.log(...args);
  },
};
