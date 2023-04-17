-- TODO roles?
CREATE TYPE role AS ENUM ('user', 'admin', 'moderator');

CREATE TABLE IF NOT EXISTS roles (
  id SERIAL PRIMARY KEY,
  name role NOT NULL
);

INSERT INTO roles (name) VALUES ('user'), ('admin'), ('moderator');
