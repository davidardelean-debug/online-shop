import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersModule } from './customers/customers.module';
import { HealthController } from './health.controller';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    OrdersModule,
    ProductsModule,
    CustomersModule,
    SharedModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${(process.env.NODE_ENV as string) || 'dev'}`,
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [],
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [HealthController],
})
export class AppModule {}
