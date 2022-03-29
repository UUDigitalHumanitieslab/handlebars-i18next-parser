import { HandlebarsLexer } from 'i18next-parser';

export default class HbsI18nLexer extends HandlebarsLexer {
    constructor(options = {}) {
        options.functions = options.functions || ['i18n'];
        super(options);
    }

    createFunctionRegex() {
        const funcName = this.functionPattern();
        const anything = '([^]*?)';
        const interpolation = `\\{\\{${funcName}\\s+${anything}}}`;
        const blockOpen = `\\{\\{#${funcName}\\s+${anything}}}`;
        const blockClose = `\\{\\{/${funcName}}}`;
        const block = `${blockOpen}${anything}${blockClose}`;
        const pattern = `${interpolation}|${block}`;
        return this.functionRegex = new RegExp(pattern, 'gi');
    }
}
