
import { Controller, Get, Inject, OnModuleInit, Param, ParseIntPipe, UseGuards, Post, Body } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
    FindOneResponse,
    ProductServiceClient,
    PRODUCT_SERVICE_NAME,
    CreateProductResponse,
    CreateProductRequest,
} from './product.pb';
import { AuthGuard } from '../auth/auth.guard';

@Controller('product')
export class ProductController implements OnModuleInit {
    private svc: ProductServiceClient;

    @Inject(PRODUCT_SERVICE_NAME)
    private readonly client: ClientGrpc;

    public onModuleInit(): void {
        this.svc = this.client.getService<ProductServiceClient>(PRODUCT_SERVICE_NAME);
    }

    @Post()
    @UseGuards(AuthGuard)
    private async createProduct(@Body() body: CreateProductRequest): Promise<Observable<CreateProductResponse>> {
        console.log(body, "* Hit Create Product API Gateway");

        return this.svc.createProduct(body);
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    private async findOne(@Param('id', ParseIntPipe) id: number): Promise<Observable<FindOneResponse>> {
        console.log( "Hit Detail Product API Gateway");
        return this.svc.findOne({ id });
    }
}