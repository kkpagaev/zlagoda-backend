import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"

export const swagger = (app: any) => {
  const config = new DocumentBuilder()
    .setTitle("Cats example")
    .addBearerAuth(
      {
        type: "http",
        in: "header",
        name: "jwt",
        description: "JWT Access Bearer Token",
      },
      "jwt",
    )
    .setDescription("The cats API description")
    .setVersion("1.0")
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("swagger", app, document)
}
