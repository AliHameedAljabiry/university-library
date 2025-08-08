ALTER TABLE "borrow_requests" ALTER COLUMN "status" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "borrow_requests" ALTER COLUMN "status" SET DEFAULT 'REJECTED'::text;--> statement-breakpoint
DROP TYPE "public"."promotion_borrowing_status";--> statement-breakpoint
CREATE TYPE "public"."promotion_borrowing_status" AS ENUM('APPROVED', 'REJECTED');--> statement-breakpoint
ALTER TABLE "borrow_requests" ALTER COLUMN "status" SET DEFAULT 'REJECTED'::"public"."promotion_borrowing_status";--> statement-breakpoint
ALTER TABLE "borrow_requests" ALTER COLUMN "status" SET DATA TYPE "public"."promotion_borrowing_status" USING "status"::"public"."promotion_borrowing_status";