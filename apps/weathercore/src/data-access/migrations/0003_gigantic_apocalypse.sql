ALTER TABLE "temperature" DROP CONSTRAINT "temperature_id_timestamp_station_id_pk";--> statement-breakpoint
ALTER TABLE "temperature" ADD CONSTRAINT "temperature_timestamp_station_id_pk" PRIMARY KEY("timestamp","station_id");