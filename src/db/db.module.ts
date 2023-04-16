import { Module } from "@nestjs/common"
import { PG_CONNECTION } from "../constants"
import { Pool } from "pg"
import { ConfigModule, ConfigService } from "@nestjs/config"

const dbProvider = {
  provide: PG_CONNECTION,
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (conf: ConfigService) => {
    return new Pool({
      user: conf.get("DB_USER"),
      host: conf.get("DB_HOST"),
      database: conf.get("DB_NAME"),
      password: conf.get("DB_PWD"),
      port: conf.get("DB_PORT"),
    })
  },
}

@Module({
  imports: [ConfigModule],
  exports: [dbProvider],
  providers: [dbProvider],
})
export class DbModule {}
