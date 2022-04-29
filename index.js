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
        const blockClose = `\\{\\{/${funcName}\\s*}}`;
        const block = `${blockOpen}${anything}${blockClose}`;
        const pattern = `${interpolation}|${block}`;
        return this.functionRegex = new RegExp(pattern, 'g');
    }

    parseCall(interpolationArgs, blockArgs, blockContent) {
        const args = this.parseArguments(interpolationArgs || blockArgs);
        const firstArgument = args.arguments[0];

        if (!this.validateString(firstArgument)) {
            this.emit(
                'warning',
                `Key is not a string literal: ${firstArgument}`,
            );
            return;
        }

        const result = args.options;
        result.key = firstArgument.slice(1, -1);
        if (blockContent != null) {
            blockContent = blockContent.trim();
            if (blockContent) result.defaultValue = blockContent;
        }
        return result;
    }

    extract(content) {
        let match;
        while (match = this.functionRegex.exec(content)) {
            const key = this.parseCall(match[1], match[2], match[3]);
            if (key) this.keys.push(key);
        }
        return this.keys;
    }
}
