import { generator } from "./generator.ts";

export const seeder = () => {
  const topicSeed = generator(0, 2);
  const seededTopic = () => {
    if (topicSeed === 0) {
      return "temperature";
    } else if (topicSeed === 1) {
      return "rainfall";
    } else {
      return "humidity";
    }
  };
  return seededTopic();
};
