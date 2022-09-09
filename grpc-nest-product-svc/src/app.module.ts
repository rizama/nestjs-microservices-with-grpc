import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ProductModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'micro_product',
      username: 'sam',
      password: 'sam',
      entities: ['dist/**/*.entity.{ts,js}'],
      synchronize: true, // never true in production!
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
