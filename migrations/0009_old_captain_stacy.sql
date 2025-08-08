ALTER TABLE "users" ALTER COLUMN "books_borrowed" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "books_borrowed" DROP NOT NULL;