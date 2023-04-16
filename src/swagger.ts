import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"

export const swagger = (app: any) => {
  const config = new DocumentBuilder()
    .setTitle("Cats example")
    .setDescription("The cats API description")
    .setVersion("1.0")
    .addTag("cats")
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("swagger", app, document)
}
