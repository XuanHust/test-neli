import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { ScheduleModule } from "@nestjs/schedule";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from "./config/configuration";
import { PrismaModule } from './modules/prisma/prisma.module';
import { TodoModule } from './modules/todo/todo.moduler';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [() => configuration]
    }),
    ScheduleModule.forRoot(),
    PrismaModule,
    TodoModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
