import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { region } from "../region";

export const psi = pgTable('psi', {
  id: uuid("id").defaultRandom(),
})
