/* 
    Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
    We are working on making it available!

    Meanwhile you can:
        1. Check pk name in your database, by running
            SELECT constraint_name FROM information_schema.table_constraints
            WHERE table_schema = 'public'
                AND table_name = 'uv'
                AND constraint_type = 'PRIMARY KEY';
        2. Uncomment code below and paste pk name manually
        
    Hope to release this update as soon as possible
*/

-- ALTER TABLE "uv" DROP CONSTRAINT "<constraint_name>";--> statement-breakpoint
ALTER TABLE "uv" ALTER COLUMN "id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "uv" ALTER COLUMN "timestamp" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "uv" ADD CONSTRAINT "uv_id_uv_index_timestamp_pk" PRIMARY KEY("id","uv_index","timestamp");--> statement-breakpoint
ALTER TABLE "uv" ADD COLUMN "updated_timestamp" varchar;