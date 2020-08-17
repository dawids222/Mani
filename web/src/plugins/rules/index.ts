import * as VeeValidate from "vee-validate";
import { ValidationRule } from 'vee-validate/dist/types/types';
import i18n from '../i18n';

const noWhiteSpaces: ValidationRule = {
    message: field => i18n.tc('validationMessages.noWhiteSpaces'),
    validate: value => !/\s/g.test(value),
}

const restrictedCharacters = `;<>\\{}[]+=?&,:'"\`'`;
const restricted: ValidationRule = {
    message: field => i18n.tc('validationMessages.restricted'),
    validate: (value) => {
        for (const char of value) {
            if (restrictedCharacters.includes(char)) {
                return false;
            }
        }
        return true;
    }
}

VeeValidate.extend('noWhiteSpaces', noWhiteSpaces);
VeeValidate.extend('restricted', restricted);

export const customRules = {
    noWhiteSpaces,
    restricted,
}



