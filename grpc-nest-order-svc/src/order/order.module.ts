import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './order.controller';
import { Order } from './order.entity';
import { OrderService } from './order.service';
import { PRODUCT_PACKAGE_NAME, PRODUCT_SERVICE_NAME } from './proto/product.pb';

@Module({
  imports: [
    // Since we going to connect to the Product Microservice, we need to register a client.
    ClientsModule.register([
      {
        name: PRODUCT_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          package: PRODUCT_PACKAGE_NAME,
          url: '0.0.0.0:50053',
          protoPath: 'node_modules/grpc-nest-proto/proto/product.proto',
        }
      }
    ]),
    TypeOrmModule.forFeature([Order]),
  ],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
