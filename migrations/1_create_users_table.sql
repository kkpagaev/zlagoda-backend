CREATE TYPE role AS ENUM ('user', 'admin', 'moderator');

CREATE TABLE IF NOT EXISTS Employee (
  id_employee SERIAL NOT NULL,

  password VARCHAR(255) NOT NULL,
  role role NOT NULL DEFAULT 'user',
  PRIMARY KEY (id)
);

