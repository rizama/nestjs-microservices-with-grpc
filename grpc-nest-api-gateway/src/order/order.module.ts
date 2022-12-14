import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthModule } from 'src/auth/auth.module';
import { OrderController } from './order.controller';
import { ORDER_PACKAGE_NAME, ORDER_SERVICE_NAME } from './order.pb';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: ORDER_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50052', // url Order Microservice
          package: ORDER_PACKAGE_NAME,
          protoPath: 'node_modules/grpc-nest-proto/proto/order.proto',
        }
      }
    ]),
  ],
  controllers: [OrderController]
})
export class OrderModule {}
