import { faker } from "@faker-js/faker";
import { generator } from "../../utils/generator.ts";

/**
 * The creator object responsible for producing emulated derivatives.
 */
export const derivativeCreator = () => {
  const derivativeLocation = faker.location.country();
  const derivativeSeason = "Summer 2023";
  const derivativeOption = "Temperature";
  const derivativePrice = Number(
    faker.finance.amount({ min: 1199, max: 8500 }),
  );
  return {
    location: derivativeLocation,
    season: derivativeSeason,
    strikeLevel: generator(4, 12),
    purchasePrice: derivativePrice,
    payoutMultiplier: 1, // 200% of purchase price
    topic: derivativeOption,
  };
};
