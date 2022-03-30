import assert from 'assert';

import Lexer from './index.mjs';

function assertExtract(lexer, content, result) {
    assert.deepEqual(lexer.extract(content), result);
}

describe('Lexer', function() {
    beforeEach(function() {
        this.lexer = new Lexer();
    });

    // The first few tests have been roughly copied from the
    // `i18next-parser/test/lexers/handlebars-lexer.test.js` module. This is
    // behavior from the base class that we want to preserve in the subclass.
    // Note that we did not copy *all* tests.

    it('extracts keys from translation components', function() {
        assertExtract(this.lexer, "<p>{{i18n 'first'}}</p>", [{key: 'first'}]);
    });

    it('extracts multiple keys on a single line', function() {
        assertExtract(this.lexer, "<p>{{i18n 'first'}} {{i18n 'second'}}</p>", [
            {key: 'first'},
            {key: 'second'},
        ]);
    });

    it('extracts the defaultValue argument', function() {
        const content = "<p>{{i18n 'first', defaultValue='bla'}}</p>";
        assertExtract(this.lexer, content, [
            {key: 'first', defaultValue: 'bla'},
        ]);
    });

    it('extracts the context argument', function() {
        const content = "<p>{{i18n 'first', context='bla'}}</p>";
        assertExtract(this.lexer, content, [{key: 'first', context: 'bla'}]);
    });

    it('supports a `functions` option', function() {
        const lexer = new Lexer({functions: ['t', '_e']});
        assertExtract(lexer, "<p>{{t 'first'}}: {{_e 'second'}}</p>", [
            {key: 'first'},
            {key: 'second'}
        ]);
    });

    it('extracts custom options', function() {
        const content = "<p>{{i18n 'first' description='bla'}}</p>";
        assertExtract(this.lexer, content, [
            {key: 'first', description: 'bla'},
        ]);
    });

    // End of copied tests.
    // In the original test suite, there was also a subsuite dedicated to the
    // `parseArguments` method. We did not copy this suite, because we inherit
    // the method without override.

    // The remaining tests represent our custom behavior.

    it('extracts keys and default content from block helpers', function() {
        assertExtract(this.lexer, "<p>{{#i18n 'first'}}bla{{/i18n}}</p>", [
            {key: 'first', defaultValue: 'bla'},
        ]);
    });

    it('supports line breaks inside Handlebars interpolation tags', function() {
        const content = "<p>{{i18n\n'first'}}</p>";
        assertExtract(this.lexer, content, [{key: 'first'}]);
    });

    it('supports line breaks inside Handlebars block open tags', function() {
        const content = "<p>{{#i18n\n'first'}}{{/i18n}}</p>";
        assertExtract(this.lexer, content, [{key: 'first'}]);
    });

    it('supports line breaks between Handlebars block tags', function() {
        const content = "<p>{{#i18n 'first'}}\n{{/i18n}}</p>";
        assertExtract(this.lexer, content, [{key: 'first'}]);
    });

    it('extracts multiple blocks on a single line', function() {
        const content = "<p>{{#i18n 'first'}}bla{{/i18n}}{{#i18n 'second'}}{{/i18n}}</p>";
        assertExtract(this.lexer, content, [
            {key: 'first', defaultValue: 'bla'},
            {key: 'second'},
        ]);
    });

    it('supports custom function names for block helper tags', function() {
        const lexer = new Lexer({functions: ['t']});
        assertExtract(lexer, "<p>{{#t 'first'}}{{/t}}</p>", [{key: 'first'}]);
    });

    it('extracts keyword arguments from blocks', function() {
        const content = "<p>{{#i18n 'first' lng='en'\ncontext='bla'}}{{/i18n}}</p>";
        assertExtract(this.lexer, content, [{
            key: 'first',
            lng: 'en',
            context: 'bla',
        }]);
    });

    it('supports interpolation tags inside block default content', function() {
        const content = "<p>{{#i18n 'first'}}default with {{interpolation}} tag{{/i18n}}</p>";
        assertExtract(this.lexer, content, [
            {key: 'first', defaultValue: 'default with {{interpolation}} tag'},
        ]);
    });
});
