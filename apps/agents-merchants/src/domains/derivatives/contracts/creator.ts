import type { Derivative } from "../derivative.ts";

export const creator = (derivative: Derivative) => {
  return `
Weather Derivative Contract: Monsoon ${derivative.topic} Hedge

0. Underlying Event: Cumulative ${derivative.topic} during the ${derivative.season} monsoon season.
1. Strike Level: ${derivative.strikeLevel} mm of rainfall
2. Payout Structure: If cumulative rainfall exceeds the strike level, the buyer receives a payout of ${derivative.payoutMultiplier * 100}% of the purchase price of this derivative.
3. Contract Period: ${derivative.season}
4. Location: ${derivative.location}
5. Measurement Authority: [Designated meteorological agency]
6. Settlement: Payout to be made within 5 business days after the end of the contract period.
7. Purchase Price: $${derivative.purchasePrice}
    `;
};
