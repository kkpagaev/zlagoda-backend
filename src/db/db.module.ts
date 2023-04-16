import { Module } from "@nestjs/common"
import { PG_CONNECTION } from "../constants"
import { Pool } from "pg"

const dbProvider = {
  provide: PG_CONNECTION,
  useValue: new Pool({
    user: "user",
    host: "127.0.0.1",
    database: "user",
    password: "user",
    port: 5438,
  }),
}

@Module({
  providers: [dbProvider],
})
export class DbModule {}
