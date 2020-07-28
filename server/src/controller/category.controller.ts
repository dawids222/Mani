import { BadRequestException, Body, ConflictException, Controller, Delete, Get, HttpCode, Inject, Param, Post, Put, Request, UseGuards } from "@nestjs/common";
import { CategoryPlain } from "src/business/entity/category/category.plain.entity";
import { UserPayload } from "src/business/entity/user/user.payload.entity";
import { ICategoryRepository } from "src/data/repository/contract/category.repository";
import { JwtTokenGuard } from "src/security/token/passport/jwt.token.guard";
import { ILogger } from "src/util/logger/contract/logger";
import { IValidator } from "src/validation/contract/iValidator";

@Controller('categories')
@UseGuards(JwtTokenGuard)
export class CategoryController {
    constructor(
        @Inject('ICategoryRepository') private readonly categoryRepository: ICategoryRepository,
        @Inject('ICategoryPlainValidator') private readonly categoryValidator: IValidator<CategoryPlain>,
        @Inject('ILogger') private readonly logger: ILogger,
    ) { }

    @Get()
    async getCategories(@Request() request) {
        const user: UserPayload = request.user;
        return this.categoryRepository.getByUserId(user.id);
    }

    @Get(':id')
    async getCategory(@Request() request, @Param('id') categoryId: number) {
        const user: UserPayload = request.user;
        const haveRalation = await this.categoryRepository.haveRelation(user.id, categoryId);
        if (!haveRalation) { throw new ConflictException(); }
        return this.categoryRepository.getByCategoryId(categoryId);
    }

    @Post()
    async createCategory(@Request() request, @Body() category: CategoryPlain) {
        const validationResult = this.categoryValidator.validate(category);
        if (!validationResult.isValid) { throw new BadRequestException(validationResult.errors); }
        const user: UserPayload = request.user;
        return this.categoryRepository.create(category, user.id);
    }

    @Put(':id')
    async editCategory(
        @Request() request,
        @Param('id') categoryId: number,
        @Body() category: CategoryPlain,
    ) {
        const validationResult = this.categoryValidator.validate(category);
        if (!validationResult.isValid) { throw new BadRequestException(validationResult.errors); }
        const user: UserPayload = request.user;
        const haveRelation = await this.categoryRepository.haveRelation(user.id, categoryId);
        if (!haveRelation) { throw new ConflictException(); }
        return this.categoryRepository.edit(categoryId, category);
    }

    @HttpCode(204)
    @Delete(':id')
    async deleteCategory(@Request() request, @Param('id') categoryId: number) {
        const user: UserPayload = request.user;
        const haveRelation = await this.categoryRepository.haveRelation(user.id, categoryId);
        if (!haveRelation) { throw new ConflictException(); }
        this.categoryRepository.delete(categoryId);
    }
}