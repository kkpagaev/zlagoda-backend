import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common"
import { NestFactory, Reflector } from "@nestjs/core"
import { AppModule } from "./app.module"
import { swagger } from "./swagger"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  if (process.env.NODE_ENV === "dev") {
    swagger(app)
  }
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))

  app.enableCors()

  const PORT = process.env.APP_PORT ?? 8000

  await app.listen(PORT)

  console.log(`Server started on port ${PORT}`)
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap()
