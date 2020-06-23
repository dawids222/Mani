import { Module } from "@nestjs/common";
import { CategoryController } from "src/controller/category.controller";
import { CategoryRepository } from "src/data/repository/postgres/category.repository";
import { CategoryValidator } from "src/validation/validator/category.validator";
import { IdCategoryValidator } from "src/validation/validator/id.category.validator";
import { BaseModule } from "./base.module";

@Module({
    imports: [
        BaseModule,
    ],
    controllers: [
        CategoryController
    ],
    providers: [{
        provide: 'ICategoryRepository',
        useClass: CategoryRepository,
    }, {
        provide: 'ICategoryValidator',
        useClass: CategoryValidator,
    }, {
        provide: 'IIdCategoryValidator',
        useClass: IdCategoryValidator,
    }],
})
export class CategoryModule { }