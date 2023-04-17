CREATE TABLE IF NOT EXISTS roles_users (
  role_id INTEGER REFERENCES roles(id),
  user_id INTEGER REFERENCES users(id),
  PRIMARY KEY (role_id, user_id)
);
