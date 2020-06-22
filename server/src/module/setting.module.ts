import { Module } from "@nestjs/common";
import { SettingController } from "src/controller/setting.controller";
import { SettingRepository } from "src/data/repository/postgres/setting.repository";
import { SettingValidator } from "src/validation/validator/setting.validator";
import { BaseModule } from "./base.module";

@Module({
    imports: [
        BaseModule,
    ],
    controllers: [SettingController],
    providers: [{
        provide: 'ISettingRepository',
        useClass: SettingRepository,
    }, {
        provide: 'ISettingValidator',
        useClass: SettingValidator,
    }],
})
export class SettingModule { }