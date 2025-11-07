import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { KnexModule } from 'nest-knexjs';
import { TaskModule } from './task/task.module';
import { ProjectModule } from './project/project.module';
import { AuthModule } from './auth/auth.module';
import { RahbarModule } from './rahbar/rahbar.module';
import { HodimModule } from './hodim/hodim.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:'.env',
    }),
    KnexModule.forRoot({
      config: {
        client: 'pg',
        connection: process.env.PG_CONNECTION_STRING,
      },
    }),
    TaskModule,
    ProjectModule,
    AuthModule,
    RahbarModule,
    HodimModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
