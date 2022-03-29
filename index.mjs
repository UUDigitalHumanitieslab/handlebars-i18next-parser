import { HandlebarsLexer } from 'i18next-parser';

export default class HbsI18nLexer extends HandlebarsLexer {
    constructor(options = {}) {
        options.functions = options.functions || ['i18n'];
        super(options);
    }
}
