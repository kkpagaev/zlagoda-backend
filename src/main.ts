import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { swagger } from "./swagger"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  if (process.env.NODE_ENV === "dev") {
    swagger(app)
  }

  await app.listen(3000)
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap()
