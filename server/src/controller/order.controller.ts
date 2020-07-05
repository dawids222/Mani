import { BadRequestException, Body, ConflictException, Controller, Delete, Get, HttpCode, Inject, Param, Post, Put, Query, Request, UseGuards } from "@nestjs/common";
import { OrderPlain } from "src/business/entity/order/order.plain";
import { UserPayload } from "src/business/entity/user/user.payload.entity";
import { OrderQuery } from "src/business/query/order.query";
import { IOrderRepository } from "src/data/repository/contract/order.repository";
import { JwtTokenGuard } from "src/security/token/passport/jwt.token.guard";
import { ILogger } from "src/util/logger/contract/logger";
import { IValidator } from "src/validation/contract/iValidator";

@Controller('orders')
@UseGuards(JwtTokenGuard)
export class OrderController {
    constructor(
        @Inject('IOrderRepository') private readonly orderRepository: IOrderRepository,
        @Inject('IOrderValidator') private readonly orderValidator: IValidator<OrderPlain>,
        @Inject('IOrderQueryValidator') private readonly orderQueryValidator: IValidator<OrderQuery>,
        @Inject('ILogger') private readonly logger: ILogger,
    ) { }

    @Get()
    async getOrders(
        @Request() request,
        @Query() query: OrderQuery,
    ) {
        const validationResult = this.orderQueryValidator.validate(query);
        if (!validationResult.isValid) { throw new BadRequestException(validationResult.errors); }
        const user: UserPayload = request.user;
        return this.orderRepository.get(user.id, query);
    }

    @Post()
    async createOrder(
        @Request() request,
        @Body() order: OrderPlain,
    ) {
        const validationResult = this.orderValidator.validate(order);
        if (!validationResult.isValid) { throw new BadRequestException(validationResult.errors); }
        const user: UserPayload = request.user;
        return this.orderRepository.create(order);
    }

    @Put(':id')
    async editOrder(
        @Request() request,
        @Param('id') orderId: number,
        @Body() order: OrderPlain,
    ) {
        const validationResult = this.orderValidator.validate(order);
        if (!validationResult.isValid) { throw new BadRequestException(validationResult.errors); }
        const user: UserPayload = request.user;
        const haveRelation = await this.orderRepository.haveRelation(user.id, orderId);
        if (!haveRelation) { throw new ConflictException(); }
        return this.orderRepository.edit(orderId, order);
    }

    @HttpCode(204)
    @Delete(':id')
    async deleteOrder(
        @Request() request,
        @Param('id') orderId: number,
    ) {
        const user: UserPayload = request.user;
        const haveRelation = await this.orderRepository.haveRelation(user.id, orderId);
        if (!haveRelation) { throw new ConflictException(); }
        return this.orderRepository.delete(orderId);
    }
}