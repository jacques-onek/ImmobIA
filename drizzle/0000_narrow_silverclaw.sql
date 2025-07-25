CREATE TYPE "public"."role" AS ENUM('ADMIN', 'USER', 'SELLER');--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY ,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"profileCover" varchar(300),
	"role" "role" DEFAULT 'USER',
	"created" timestamp NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
