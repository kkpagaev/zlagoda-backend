import { Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { DbModule } from "./db/db.module"
import { ConfigModule } from "@nestjs/config"
import { AuthModule } from "./auth/auth.module"
import { EmployeeModule } from "./employee/employee.module"
import { CategoryModule } from './category/category.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [".env", ".env." + process.env.NODE_ENV],
    }),
    DbModule,
    EmployeeModule,
    AuthModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
