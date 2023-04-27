import { Module } from "@nestjs/common"
import { PG_CONNECTION } from "../constants"
import { Pool } from "pg"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { MigrationService } from "./migration.service"

const dbProvider = {
  provide: PG_CONNECTION,
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (conf: ConfigService) => {
    const pool = new Pool({
      user: conf.get("DB_USER"),
      host: conf.get("DB_HOST"),
      database: conf.get("DB_NAME"),
      password: conf.get("DB_PWD"),
      port: conf.get("DB_PORT"),
    })
    pool.on("error", (err) => {
      console.error("Unexpected error on idle client", err)
    })

    pool.on("connect", (client) => {
      console.log("Connected to DB")
    })

    return pool
  },
}

@Module({
  imports: [ConfigModule],
  exports: [dbProvider],
  providers: [dbProvider, MigrationService],
})
export class DbModule {}
