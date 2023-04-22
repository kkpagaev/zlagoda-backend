import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common"
import { NestFactory, Reflector } from "@nestjs/core"
import { AppModule } from "./app.module"
import { swagger } from "./swagger"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  if (process.env.NODE_ENV === "dev") {
    swagger(app)
  }
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))

  await app.listen(3000)
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap()
