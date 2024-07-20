import { rainfall } from "./rainfall.ts";
import { temperature } from "./temperature.ts";

export const derivativeGraphics = {
  graphics: {
    rainfall: rainfall,
    temperature: temperature,
  },
  getVisuals: function <T extends keyof typeof this.graphics>(
    index: number,
    topic: T,
  ): string | undefined {
    if (topic in this.graphics) {
      const topicGraphics = this.graphics[topic];
      if (index >= 0 && index < topicGraphics.length) {
        return topicGraphics[index];
      } else {
        return topicGraphics[Math.floor(Math.random() * topicGraphics.length)];
      }
    } else {
      throw new Error(`Invalid topic: ${topic}`);
    }
  },
};
