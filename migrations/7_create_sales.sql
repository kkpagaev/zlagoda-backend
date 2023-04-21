CREATE TABLE "Sale" (
  "UPC" VARCHAR(12) NOT NULL,
  "check_number" VARCHAR(10) NOT NULL,
  "product_number" INT NOT NULL,
  "selling_price" DECIMAL(13, 4) NOT NULL,
  PRIMARY KEY ("UPC", "check_number"),
  FOREIGN KEY("UPC") 
    REFERENCES "Store_Product" ("UPC") 
    ON DELETE NO ACTION 
    ON UPDATE CASCADE,
  FOREIGN KEY("check_number") 
    REFERENCES "Check" ("check_number") 
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);