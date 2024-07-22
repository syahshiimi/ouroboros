interface Derivative {
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
 *
 * @method create - Create a weather derivative asset class.
 * @method generateContract - Constructs the contract object, referencing the object constructed
 * by the .create method.
 *
 * Currently ,it is only producing a Rainfall Weather Derivative
 * TODO: Implement the creation of other weather derivatives i.e. temperature, humidity etc.
 */
export const WeatherDerivative = {
  create: function (
    location: string,
    season: string,
    strikeLevel: number,
    purchasePrice: number,
    topic: string,
  ) {
    return {
      location: location,
      season: season,
      strikeLevel: strikeLevel,
      purchasePrice: purchasePrice,
      payoutMultiplier: 2, // 200% of purchase price
      topic: topic,
    };
  },
  generateContract: function (derivative: Derivative) {
    return contractCreator(derivative);
  },
};

export const contractCreator = (derivative: Derivative) => {
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
