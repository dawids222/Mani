import { BadRequestException, Body, ConflictException, Controller, Get, Inject, Param, Put, Request, UseGuards } from "@nestjs/common";
import { Setting } from "src/business/entity/setting/setting.entity";
import { UserPayload } from "src/business/entity/user/user.payload.entity";
import { ISettingRepository } from "src/data/repository/contract/setting.repository";
import { JwtTokenGuard } from "src/security/token/passport/jwt.token.guard";
import { ILogger } from "src/util/logger/contract/logger";
import { IValidator } from "src/validation/contract/iValidator";

@Controller('settings')
@UseGuards(JwtTokenGuard)
export class SettingController {
    constructor(
        @Inject('ISettingRepository') private readonly settingRepository: ISettingRepository,
        @Inject('ISettingValidator') private readonly settingValidator: IValidator<Setting>,
        @Inject('ILogger') private readonly logger: ILogger,
    ) { }

    @Get()
    async getSetting(@Request() request) {
        const user: UserPayload = request.user;
        return this.settingRepository.get(user.id);
    }

    @Put(':id')
    async editSetting(
        @Request() request,
        @Param('id') settingId: number,
        @Body() settings: Setting,
    ) {
        const validationResult = this.settingValidator.validate(settings);
        if (!validationResult.isValid) { throw new BadRequestException(validationResult.errors); }
        const user: UserPayload = request.user;
        const haveRelation = await this.haveRelation(user.id, settingId);
        if (!haveRelation) { throw new ConflictException(); }
        return this.settingRepository.edit(settingId, settings);
    }

    private async haveRelation(userId: number, settingId: number): Promise<boolean> {
        const setting = await this.settingRepository.get(userId);
        return setting ? setting.id == settingId : false;
    }
}