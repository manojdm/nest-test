import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { User } from './entities/user.entity';
import { Report } from './reports/report.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`
    }),
    TypeOrmModule.forRoot(),
    // TypeOrmModule.forRootAsync({
    //   inject: [ConfigService],
    //   useFactory: (config: ConfigService) => {
    //     return {
    //         type: 'sqlite',
    //         database: 'db.sqlite',
    //         entities: ['**/*.entity.js'],
    //         synchronize: false,
    //         migrations: ['migrations/*.js'],
    //         cli: {
    //           migrationsDir: 'migrations',
    //         },
    //     }
    //   }
    // }),
  //   ,TypeOrmModule.forRoot({
  //   type: 'sqlite',
  //   database: 'db.sqlite',
  //   entities: [User, Report],
  //   synchronize: true
  // }),
  UsersModule, ReportsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
