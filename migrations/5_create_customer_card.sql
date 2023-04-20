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