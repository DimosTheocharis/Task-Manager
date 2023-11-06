import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { AuthModule } from './auth/auth.module';

const ormOptions: TypeOrmModuleOptions = {
  type: "mysql",
  host: process.env.HOST,
  port: Number(process.env.DEV_PORT) || 3306,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DB,
  autoLoadEntities: true,
  synchronize: true
}

@Module({
  imports: [
    TodoModule,
    TypeOrmModule.forRoot(ormOptions),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
