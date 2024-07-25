import { creator } from "./contracts/creator.ts";
import { derivativeCreator } from "./creator.ts";

/**
 * The weather derivative object method that constructs and implements the necessary
 * details for the creation of a weather derivative.
 */
export const merchant = {
  create: function (topic: string) {
    const asset = derivativeCreator(topic);
    return {
      result: asset,
      log: () => {
        this.log("Creating a new weather derivative", asset, "\n");
        return asset;
      },
    };
  },
  generateContract: function (
    derivative: ReturnType<typeof derivativeCreator>,
  ) {
    const contract = creator(derivative);
    return {
      contract: contract,
      log: () => {
        this.log(
          `${derivative.weather} hedge contractual details: \n`,
          contract,
        );
        return contract;
      },
    };
  },
  log: function (...args: unknown[]) {
    console.log(...args);
  },
};
