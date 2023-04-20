CREATE TABLE "Store_Product" (
  "UPC" VARCHAR(12) NOT NULL,
  "UPC_prom" VARCHAR(12) NULL,
  "id_product" INT NOT NULL,
  "selling_price" DECIMAL(13, 4) NOT NULL CHECK ("selling_price" > 0),
  "products_number" INT NOT NULL CHECK ("products_number" >= 0),
  "promotional_product" BOOLEAN NOT NULL,
  PRIMARY KEY("UPC"),
  FOREIGN KEY("UPC_prom") 
    REFERENCES "Store_Product" ("UPC") 
    ON DELETE SET NULL 
    ON UPDATE CASCADE,
  FOREIGN KEY("id_product") 
    REFERENCES "Product" ("id_product") 
    ON DELETE NO ACTION 
    ON UPDATE CASCADE
);