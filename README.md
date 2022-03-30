# handlebars-i18next-parser

Parser/lexer for the combination of [`handlebars-i18next`][handlebars-i18next] and [`i18next-parser`][i18next-parser].

[handlebars-i18next]: https://www.npmjs.com/package/handlebars-i18next
[i18next-parser]: https://www.npmjs.com/package/i18next-parser

If you are using [`handlebars-i18next`][handlebars-i18next] to insert translation strings into your Handlebars templates, then this package will enable you to extract the keys (and default values) into JSON files for your translators.

## Quickstart

Installation:

```
npm install --save-dev handlebars-i18next-parser
yarn add -D handlebars-i18next-parser
```

Configuration for [`i18next-parser`][i18next-parser] (by default this assumes you use `i18n` as the name for the helper; see below on how to override):

```js
import HbsI18nLexer from 'handlebars-i18next-parser';

{
    lexers: {
        hbs: [HbsI18nLexer],
        handlebars: [HbsI18nLexer],
    }
}
```

Finally, run [`i18next-parser`][i18next-parser] as documented.

## Using alternative helper/function names

[`handlebars-i18next`][handlebars-i18next] lets you [override the helper name][helper-override]. If you use this feature, for example to use the name `t` instead, you can notify the lexer by changing the [`i18next-parser` `lexers` configuration][lexer-conf] as follows:

[helper-override]: https://www.npmjs.com/package/handlebars-i18next#changing-the-name-of-the-helper
[lexer-conf]: https://www.npmjs.com/package/i18next-parser#lexers

```js
{
    lexers: {
        hbs: [{
            lexer: HbsI18nLexer,
            functions: ['t'],
        }],
    }
}
```

*Made by*

[![Digital Humanities Lab](http://dhstatic.hum.uu.nl/logo-lab/png/dighum-logo.png)](https://dig.hum.uu.nl)
