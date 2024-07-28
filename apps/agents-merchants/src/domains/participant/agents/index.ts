/**
 * Produces the market participant
 */
export const agents = {
  purchase: function (name: string) {
    console.log(`\n${name} has purchased the following weather derivative:`);
  },
};

// TODO: Refactor and use clases to create methods for the agent story.

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

  lurkOptions() {
    // Return the preferred weather derivative topic and type of derivative.
  }

  private getTradeOptions() {
    return {
      temperature: {
        option: null,
        swaps: null,
        futures: null,
        forwards: null,
      },
      rainfall: {
        option: null,
        swaps: null,
        futures: null,
        forwards: null,
      },
      precipitation: {
        option: null,
        swaps: null,
        futures: null,
        forwards: null,
      },
    };
  }

  // A method to submit the bid for the option the agent is interested in.
  // We may want to initialise a set of basic defaults ie budget to make things
  // realistic.
  submitBid() {
    // Initialise budget
    // Given the options it previously was interested in, submit a bid.
  }

  // A method to deduce if the bid is successful.

  // A method to visualise the graphics, predicated on its success on bidding.
}
