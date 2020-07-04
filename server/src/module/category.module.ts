import { Module } from "@nestjs/common";
import { CategoryController } from "src/controller/category.controller";
import { CategoryAdapter } from "src/data/adapter/category/category.adapter";
import { CategoryRepository } from "src/data/repository/postgres/category.repository";
import { CategoryPlainValidator } from "src/validation/validator/category.plain.validator";
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
        provide: 'ICategoryPlainValidator',
        useClass: CategoryPlainValidator,
    }, {
        provide: 'ICategoryAdapter',
        useClass: CategoryAdapter,
    }],
})
export class CategoryModule { }