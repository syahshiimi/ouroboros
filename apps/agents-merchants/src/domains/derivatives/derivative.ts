export interface Derivative {
  location: string;
  season: string;
  strikeLevel: number;
  purchasePrice: number;
  payoutMultiplier: number;
  topic: string;
}

const derivativeCreator = (derivative: Derivative) => {
  return {
    location: derivative.location,
    season: derivative.season,
    strikeLevel: derivative.strikeLevel,
    purchasePrice: derivative.purchasePrice,
    payoutMultiplier: 2, // 200% of purchase price
    topic: derivative.topic,
  };
};

const contractCreator = (derivative: Derivative) => {
  return `
Weather Derivative Contract: Monsoon ${derivative.topic} Hedge

1. Underlying Event: Cumulative ${derivative.topic} during the ${derivative.season} monsoon season.
2. Strike Level: ${derivative.strikeLevel} mm of rainfall
3. Payout Structure: If cumulative rainfall exceeds the strike level, the buyer receives a payout of ${derivative.payoutMultiplier * 100}% of the purchase price of this derivative.
4. Contract Period: ${derivative.season}
5. Location: ${derivative.location}
6. Measurement Authority: [Designated meteorological agency]
7. Settlement: Payout to be made within 5 business days after the end of the contract period.
8. Purchase Price: $${derivative.purchasePrice}
    `;
};

/**
 * The weather derivative object method that constructs and implements the necessary
 * details for the creation of a weather derivative.
 */
export const merchant = {
  create: function (derivative: Derivative) {
    const asset = derivativeCreator(derivative);
    return {
      result: asset,
      log: () => {
        this.log("Creating a new weather derivative", asset, "\n");
        return asset;
      },
    };
  },
  generateContract: function (derivative: Derivative) {
    const contract = contractCreator(derivative);
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
