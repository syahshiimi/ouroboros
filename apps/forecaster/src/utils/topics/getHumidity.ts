import { HumidityText } from "../../../public/text/humidity.text";

export function getHumidityText(humidity: number) {
  if (humidity < 60) {
    return "A rare dry spell! Quick, take a picture before it changes.";
  } else if (humidity >= 60) {
    return HumidityText[Math.floor(Math.random() * HumidityText.length)];
  }
}
