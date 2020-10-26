CREATE TABLE "todos" (
	"id" serial primary key,
	"description" varchar(120) not null,
	"complete" boolean not null
);

INSERT INTO "todos" ("description", "complete")
VALUES ('Get Milk', false),
('Find Sunglasses', false),
('Locate Brain', true);