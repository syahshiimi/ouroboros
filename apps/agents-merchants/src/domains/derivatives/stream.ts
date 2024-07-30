import { faker } from "@faker-js/faker";

export class DerivativeStream {
  constructor() {}

  produceDerivativeStream() {
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
}
