import { Module } from "@nestjs/common"
import { PG_CONNECTION } from "../constants"
import { Pool, PoolClient } from "pg"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { readFileSync, readdir } from "fs"

const createMigrationTableIfNotExists = async (client: PoolClient) => {
  await client.query(`
    CREATE TABLE IF NOT EXISTS migrations (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `)
}

const migrate = async (pool: Pool) => {
  const client = await pool.connect()
  await createMigrationTableIfNotExists(client)
  try {
    await client.query("BEGIN")
    readdir("./migrations", async (err, files) => {
      if (err) {
        console.log(err)
      }
      const migrations = files.filter((file) => file.endsWith(".sql"))

      for (const migration of migrations) {
        const { rows } = await client.query(
          "SELECT * FROM migrations WHERE name = $1",
          [migration],
        )
        if (rows.length === 1) {
          continue
        }
        const sql = readFileSync(`./migrations/${migration}`, "utf-8")
        console.log(`Running migration ${migration}`)
        await client.query(sql)
        await client.query("INSERT INTO migrations (name) VALUES ($1)", [
          migration,
        ])
        console.log(`Migration ${migration} completed`)
      }
      await client.query("COMMIT")
    })
  } catch (e) {
    await client.query("ROLLBACK")
    throw e
  } finally {
    client.release()
  }
}

const dbProvider = {
  provide: PG_CONNECTION,
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (conf: ConfigService) => {
    const pool = new Pool({
      user: conf.get("DB_USER"),
      host: conf.get("DB_HOST"),
      database: conf.get("DB_NAME"),
      password: conf.get("DB_PWD"),
      port: conf.get("DB_PORT"),
    })

    await migrate(pool)

    return pool
  },
}

@Module({
  imports: [ConfigModule],
  exports: [dbProvider],
  providers: [dbProvider],
})
export class DbModule {}
