export default function ascii() {
  const WeatherDerivative = {
    create: function (location, season, strikeLevel, purchasePrice) {
      return {
        location: location,
        season: season,
        strikeLevel: strikeLevel,
        purchasePrice: purchasePrice,
        payoutMultiplier: 2, // 200% of purchase price
      };
    },

    generateContract: function (derivative) {
      return `
Weather Derivative Contract: Monsoon Rainfall Hedge

1. Underlying Event: Cumulative rainfall during the ${derivative.season} monsoon season.
2. Strike Level: ${derivative.strikeLevel} mm of rainfall
3. Payout Structure: If cumulative rainfall exceeds the strike level, the buyer receives a payout of ${derivative.payoutMultiplier * 100}% of the purchase price of this derivative.
4. Contract Period: ${derivative.season}
5. Location: ${derivative.location}
6. Measurement Authority: [Designated meteorological agency]
7. Settlement: Payout to be made within 5 business days after the end of the contract period.
8. Purchase Price: $${derivative.purchasePrice.toFixed(2)}
    `;
    },
  };

  const MarketParticipant = {
    purchase: function (name, derivative) {
      console.log(`${name} has purchased the following weather derivative:`);
      console.log(WeatherDerivative.generateContract(derivative));
    },
  };

  // Demo
  const newDerivative = WeatherDerivative.create(
    "Mumbai, India",
    "Summer 2024",
    10,
    1000,
  );

  console.log("Creating a new weather derivative");
  console.log(newDerivative);

  const contract = WeatherDerivative.generateContract(newDerivative);
  console.log(contract);

  MarketParticipant.purchase("Raj Investments Ltd", newDerivative);

  console.log(`
         .-~~~-.
  .- ~ ~-(       )_ _
 /                    ~ -.
|                          \\
 \\                         .'
   ~- . _____________ . -~
         \\\\\\\\\\\\\\\\\\\\
          \\\\\\\\\\\\\\\\\\
           \\\\\\\\\\\\\\\\
            \\\\\\\\\\\\\\
             \\\\\\\\\\\\
              \\\\\\\\\\
               \\\\\\\\
                \\\\\\
     _________________________
    |                         |
    |   A MONSOON RAINFALL    |
    |   DERIVATIVE WAS SOLD.  |
    |_________________________|
      `);
  console.log(`
       ☀️   ☁️   ☁️  ☀️  
    __/\\/\\__/\\/\\__/\\/\\__
     )  ☂️   ☂️   ☂️   (  
    (     HUMIDITY    ) 
     )    90% | 90%  (   
    (     80% | 80%   )  
     )    70% | 70%  (   
    (     60% | 60%   )  
     )  WET   | DRY  (   
    (___________________) 
      |  |  |🌡️|  |  |
      |  |  |35°|  |  |
    ~~|  |~~|   |~~|  |~~
    🌿 🌴  🌿 🌴 🌿 🌴 🌿

   SOUTHEAST ASIAN WEATHER
       DERIVATIVE
    `);
  return <></>;
}
