CREATE TABLE IF NOT EXISTS "area_forecast" (
	"id" uuid DEFAULT gen_random_uuid(),
	"area_name" varchar(40) PRIMARY KEY NOT NULL,
	"latitude" double precision,
	"longitude" double precision,
	"date_created" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "fetch_jobs_task" (
	"id" uuid DEFAULT gen_random_uuid(),
	"fetch_job_type_id" varchar(256),
	"fetch_date" timestamp with time zone,
	"fetch_job_start_date" timestamp with time zone,
	"fetch_url" varchar(256),
	"file_name" varchar(256),
	"workflow_id" varchar(256),
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "fetch_jobs_task_id_pk" PRIMARY KEY("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "humidity" (
	"id" uuid DEFAULT gen_random_uuid(),
	"station_id" varchar(20),
	"timestamp" timestamp with time zone,
	"humidity_value" numeric,
	"date_created" timestamp DEFAULT now(),
	"file_name" varchar(256),
	CONSTRAINT "humidity_id_timestamp_station_id_pk" PRIMARY KEY("id","timestamp","station_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rainfall" (
	"id" uuid DEFAULT gen_random_uuid(),
	"station_id" varchar(20),
	"timestamp" timestamp with time zone,
	"rainfall_value" numeric,
	"date_created" timestamp DEFAULT now(),
	"file_name" varchar(256),
	CONSTRAINT "rainfall_id_timestamp_station_id_pk" PRIMARY KEY("id","timestamp","station_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "region" (
	"id" uuid DEFAULT gen_random_uuid(),
	"region_name" varchar PRIMARY KEY NOT NULL,
	"latitude" double precision,
	"longitude" double precision,
	"date_created" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "stations" (
	"id" uuid DEFAULT gen_random_uuid(),
	"station_id" varchar(20) PRIMARY KEY NOT NULL,
	"location_name" varchar(256),
	"latitude" double precision,
	"longitude" double precision,
	"date_created" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "temperature" (
	"id" uuid DEFAULT gen_random_uuid(),
	"station_id" varchar(20),
	"timestamp" timestamp with time zone,
	"reading_value" numeric,
	"date_created" timestamp DEFAULT now(),
	"file_name" varchar(256),
	CONSTRAINT "temperature_id_timestamp_station_id_pk" PRIMARY KEY("id","timestamp","station_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "uv" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"uv_index" integer,
	"timestamp" timestamp,
	"date_created" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "humidity" ADD CONSTRAINT "humidity_station_id_stations_station_id_fk" FOREIGN KEY ("station_id") REFERENCES "public"."stations"("station_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rainfall" ADD CONSTRAINT "rainfall_station_id_stations_station_id_fk" FOREIGN KEY ("station_id") REFERENCES "public"."stations"("station_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "temperature" ADD CONSTRAINT "temperature_station_id_stations_station_id_fk" FOREIGN KEY ("station_id") REFERENCES "public"."stations"("station_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
