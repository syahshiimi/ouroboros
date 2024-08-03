import { TemperatureText } from "../../../public/text/temperature.text";

export function getTemperatureText(temp: number) {
  if (temp < 27) {
    return TemperatureText[Math.floor(Math.random() * 5)]; // Cool texts
  } else if (temp >= 27 && temp < 30) {
    return TemperatureText[Math.floor(Math.random() * 5) + 5]; // Moderate texts
  } else if (temp >= 30 && temp < 34) {
    return TemperatureText[Math.floor(Math.random() * 5) + 10]; // Hot texts
  } else {
    return "It's so hot, even the sun is considering early retirement.";
  }
}
