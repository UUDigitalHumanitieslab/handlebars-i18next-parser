import assert from 'assert';

import Lexer from './index.mjs';

function assertExtract(lexer, content, result) {
    assert.deepEqual(lexer.extract(content), result);
}

describe('Lexer', function() {
    beforeEach(function() {
        this.lexer = new Lexer({functions: ['i18n']});
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
});
