CREATE TABLE `orders` (
  `id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `title` text NOT NULL,
  `description` text,
  `date` datetime NOT NULL
);

CREATE TABLE `products` (
  `id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `serialNumber` integer NOT NULL,
  `isNew` boolean NOT NULL,
  `photo` text NOT NULL,
  `title` text NOT NULL,
  `type` text NOT NULL,
  `specification` text NOT NULL,
  `guaranteeStart` datetime NOT NULL,
  `guaranteeEnd` datetime NOT NULL,
  `priceValueUSD` real NOT NULL,
  `priceValueUAH` real NOT NULL,
  `orderId` integer,
  `date` datetime NOT NULL
);

ALTER TABLE `products` ADD FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`);
