import { Injectable } from "@nestjs/common"
import { Pool, PoolClient } from "pg"
import { readFileSync, readdir } from "fs"
import { AppLoggerService } from "src/shared/services/app-logger.service"
import { OnModuleInit } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { InjectDB } from "./inject-db.decorator"

@Injectable()
export class MigrationService implements OnModuleInit {
  constructor(
    private readonly logger: AppLoggerService,
    private readonly configService: ConfigService,
    @InjectDB()
    private readonly pool: Pool,
  ) {
    this.logger.setContext(MigrationService.name)
  }

  public async onModuleInit() {
    if (this.configService.get("RUN_MIGRATIONS") === "true") {
      await this.migrate(this.pool)
    }
  }

  public async migrate(pool: Pool) {
    const client = await pool.connect()
    await this.createMigrationTable(client)
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

          this.logger.log(`Running migration ${migration}`)

          await client.query(sql)
          await client.query("INSERT INTO migrations (name) VALUES ($1)", [
            migration,
          ])

          this.logger.log(`Migration ${migration} completed`)
        }
        await client.query("COMMIT")
      })
    } catch (e) {
      await client.query("ROLLBACK")

      this.logger.error(e)

      throw e
    } finally {
      client.release()
    }
  }

  private async createMigrationTable(client: PoolClient) {
    await client.query(
      `CREATE TABLE IF NOT EXISTS migrations (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT NOW()
        )`,
    )
  }
}
