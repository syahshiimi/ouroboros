import { type Stations, type Humidity, type Temperature, type UV } from "../../data-access/models/types";
import { builder } from "./builder";

export const StationsType = builder.objectRef<Stations>("Stations")
export const HumidityType = builder.objectRef<Humidity>("Humidity")
export const TemperatureType = builder.objectRef<Temperature>("Temperature")
export const UvType = builder.objectRef<UV>("UV")
