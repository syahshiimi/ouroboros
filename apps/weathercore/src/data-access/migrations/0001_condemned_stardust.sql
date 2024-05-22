ALTER TABLE "fetch_jobs_task" RENAME COLUMN "fetch_job_type_id" TO "topic_id";--> statement-breakpoint
ALTER TABLE "fetch_jobs_task" ALTER COLUMN "id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "fetch_jobs_task" ALTER COLUMN "topic_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "fetch_jobs_task" ALTER COLUMN "fetch_date" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "fetch_jobs_task" ALTER COLUMN "fetch_job_start_date" SET NOT NULL;