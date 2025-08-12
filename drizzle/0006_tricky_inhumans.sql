CREATE TYPE "public"."type" AS ENUM('Appartement', 'Maison', 'Studio', 'Immeuble', 'Duplex', 'Penthouse');--> statement-breakpoint
CREATE TABLE "properties" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"bedrooms" integer NOT NULL,
	"bathrooms" integer NOT NULL,
	"address" text NOT NULL,
	"latitude" numeric(9, 6) NOT NULL,
	"longitude" numeric(9, 6) NOT NULL,
	"rating" numeric(2, 1) NOT NULL,
	"type" varchar(50) NOT NULL,
	"features" text[] NOT NULL,
	"area" integer NOT NULL,
	"image" text NOT NULL,
	"listed_at" timestamp DEFAULT now(),
	"available" boolean DEFAULT true NOT NULL,
	CONSTRAINT "properties_id_unique" UNIQUE("id")
);
