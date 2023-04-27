CREATE TABLE "Employee" (
  "id_employee" VARCHAR(10) NOT NULL,
  "empl_surname" VARCHAR(50) NOT NULL,
  "empl_name" VARCHAR(50) NOT NULL,
  "password" VARCHAR(72) NOT NULL,
  "role" VARCHAR(15) NOT NULL,
  "empl_patronymic" VARCHAR(50) NULL,
  "salary" DECIMAL(13, 4) NOT NULL CHECK("salary" > 0),
  "date_of_birth" DATE NOT NULL,
  "date_of_start" DATE NOT NULL,
  "phone_number" VARCHAR(13) NOT NULL,
  "city" VARCHAR(50) NOT NULL,
  "street" VARCHAR(50) NOT NULL,
  "zip_code" VARCHAR(9) NOT NULL,
  PRIMARY KEY("id_employee")
);

CREATE TABLE "Category" (
  "category_number" SERIAL NOT NULL,
  "category_name" VARCHAR(50) NOT NULL,
  PRIMARY KEY ("category_number")
);
CREATE TABLE "Product" (
  "id_product" SERIAL NOT NULL,
  "category_number" INT NOT NULL,
  "product_name" VARCHAR(50) NOT NULL,
  "characteristics" VARCHAR(100) NOT NULL,
  PRIMARY KEY("id_product"),
  FOREIGN KEY ("category_number") 
    REFERENCES "Category" ("category_number") 
    ON DELETE NO ACTION 
    ON UPDATE CASCADE
);
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
CREATE TABLE "Customer_Card" (
  "card_number" VARCHAR(13) NOT NULL,
  "cust_surname" VARCHAR(50) NOT NULL,
  "cust_name" VARCHAR(50) NOT NULL,
  "cust_patronymic" VARCHAR(50) NULL,
  "phone_number" VARCHAR(13) NOT NULL,
  "city" VARCHAR(50) NULL,
  "street" VARCHAR(50) NULL,
  "zip_code" VARCHAR(9) NULL,
  "percent" INT NOT NULL CHECK ("percent" >= 0 AND "percent" <= 100),
  PRIMARY KEY ("card_number")
);
CREATE TABLE "Check" (
  "check_number" VARCHAR(10) NOT NULL,
  "id_employee" VARCHAR(10) NOT NULL,
  "card_number" VARCHAR(13) NULL,
  "print_date" TIMESTAMPTZ NOT NULL,
  "sum_total" DECIMAL(13, 4) NOT NULL,
  "vat" DECIMAL(13, 4) NOT NULL,
  PRIMARY KEY ("check_number"),
  FOREIGN KEY("id_employee") 
    REFERENCES "Employee" ("id_employee") 
    ON DELETE NO ACTION 
    ON UPDATE CASCADE,
  FOREIGN KEY("card_number") 
    REFERENCES "Customer_Card" ("card_number") 
    ON DELETE NO ACTION 
    ON UPDATE CASCADE
);
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
