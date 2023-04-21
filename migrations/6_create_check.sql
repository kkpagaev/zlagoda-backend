CREATE TABLE "Check" (
  "check_number" VARCHAR(10) NOT NULL,
  "id_employee" VARCHAR(10) NOT NULL,
  "card_number" VARCHAR(13) NULL,
  "print_date" TIMESTAMPTZ NOT NULL,
  "sum_total" DECIMAL(13, 4) NOT NULL,
  "vat" DECIMAL(13, 4) NOT NULL,
  PRIMARY KEY ("check_number"),
  FOREIGN KEY("id_employee") 
    REFERENCES "employee" ("id_employee") 
    ON DELETE NO ACTION 
    ON UPDATE CASCADE,
  FOREIGN KEY("card_number") 
    REFERENCES "Customer_Card" ("card_number") 
    ON DELETE NO ACTION 
    ON UPDATE CASCADE
);