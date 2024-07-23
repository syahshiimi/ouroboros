import { HumidityText } from "../../../public/text/humidity.text";

export function getHumidityText(humidity: number) {
  if (humidity < 60) {
    return "A rare dry spell! Quick, take a picture before it changes.";
  } else if (humidity >= 60 && humidity < 80) {
    return HumidityText[Math.floor(Math.random() * HumidityText.length)];
  } else {
    return "The air is so wet, fish are swimming through it.";
  }
}
