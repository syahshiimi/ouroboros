import { rainfallText } from "../../../public/text/rainfall.text";

// Example JSON
// {
//             "stationId": "S104",
//             "value": 2.4
//           },
//           {
//             "stationId": "S226",
//             "value": 0
//           },
//           {
//             "stationId": "S223",
//             "value": 0.203
//           },
//           {
export function getRainfall(rainfall: number) {
  if (rainfall === 0) {
    return rainfallText[Math.floor(Math.random() * 3) + 1]; // Dry spell texts
  } else if (rainfall < 0.2) {
    return rainfallText[Math.floor(Math.random() * 3) + 4]; // Very light rain texts
  } else if (rainfall < 1) {
    return rainfallText[Math.floor(Math.random() * 3) + 7]; // Light rain texts
  } else if (rainfall < 2) {
    return rainfallText[Math.floor(Math.random() * 3) + 10]; // Moderate rain texts
  } else {
    return rainfallText[Math.floor(Math.random() * 3)]; // Heavy rain texts
  }
}
