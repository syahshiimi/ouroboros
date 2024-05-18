import { type Stations, type Humidity, type Temperature, type UV, type Rainfall } from "../../data-access/models/types";
import { builder } from "./builder";

export const HumidityType = builder.objectRef<Humidity>("Humidity")
export const RainfallType = builder.objectRef<Rainfall>("Rainfall")
export const StationsType = builder.objectRef<Stations>("Stations")
export const TemperatureType = builder.objectRef<Temperature>("Temperature")
export const UvType = builder.objectRef<UV>("UV")
