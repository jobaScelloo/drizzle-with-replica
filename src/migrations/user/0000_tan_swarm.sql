CREATE TABLE `users` (
	`id` varchar(767) NOT NULL,
	`email` varchar(255) NOT NULL,
	`version` date,
	`created_at` timestamp NOT NULL DEFAULT current_timestamp,
	`updated_at` timestamp NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `users_id_pk` PRIMARY KEY(`id`),
	CONSTRAINT `users_id_unique` UNIQUE(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
