CREATE TYPE role AS ENUM ('user', 'admin', 'moderator');

CREATE TABLE IF NOT EXISTS Employee (
  id_employee SERIAL NOT NULL,
  empl_name VARCHAR(50) NOT NULL,
  empl_surname VARCHAR(50) NOT NULL,
  empl_patronymic VARCHAR(50) NOT NULL,
  -- TODO best practice for password
  password VARCHAR(255) NOT NULL,
  role role NOT NULL DEFAULT 'user',
  PRIMARY KEY (id_employee)
);

