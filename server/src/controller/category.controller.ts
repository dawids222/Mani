import { BadRequestException, Body, ConflictException, Controller, Delete, Get, HttpCode, Inject, Param, Post, Put, Request, UseGuards } from "@nestjs/common";
import { Category } from "src/business/entity/category/category.entity";
import { UserPayload } from "src/business/entity/user/user.payload.entity";
import { ICategoryRepository } from "src/data/repository/contract/category.repository";
import { JwtTokenGuard } from "src/security/token/passport/jwt.token.guard";
import { ILogger } from "src/util/logger/contract/logger";
import { IValidator } from "src/validation/contract/iValidator";

@Controller('category')
@UseGuards(JwtTokenGuard)
export class CategoryController {
    constructor(
        @Inject('ICategoryRepository') private readonly categoryRepository: ICategoryRepository,
        @Inject('ICategoryValidator') private readonly categoryValidator: IValidator<Category>,
        @Inject('IIdCategoryValidator') private readonly idCategoryValidator: IValidator<Category>,
        @Inject('ILogger') private readonly logger: ILogger,
    ) { }

    @Get()
    async getCategories(@Request() request) {
        const user: UserPayload = request.user;
        return this.categoryRepository.getByUserId(user.id);
    }

    @Post()
    async createCategory(@Request() request, @Body() category: Category) {
        const validationResult = this.categoryValidator.validate(category);
        if (!validationResult.isValid) { throw new BadRequestException(validationResult.errors); }
        const user: UserPayload = request.user;
        return this.categoryRepository.create(category, user.id);
    }

    @Put()
    async editCategory(@Request() request, @Body() category: Category) {
        const validationResult = this.idCategoryValidator.validate(category);
        if (!validationResult.isValid) { throw new BadRequestException(validationResult.errors); }
        const user: UserPayload = request.user;
        const haveRelation = await this.haveRelation(user.id, category.id);
        if (!haveRelation) { throw new ConflictException(); }
        return this.categoryRepository.edit(category);
    }

    @HttpCode(204)
    @Delete(':id')
    async deleteCategory(@Request() request, @Param('id') categoryId: number) {
        const user: UserPayload = request.user;
        const haveRaltion = await this.haveRelation(user.id, categoryId);
        if (!haveRaltion) { throw new ConflictException(); }
        this.categoryRepository.delete(categoryId);
    }

    private async haveRelation(userId: number, categoryId: number): Promise<boolean> {
        const categories = await this.categoryRepository.getByUserId(userId);
        return categories.some(x => x.id == categoryId);
    }
}