import assert from 'assert';

import Lexer from './index.mjs';

describe('Lexer', function() {
    it('extracts keys from translation components', function() {
        const lexer = new Lexer({function: ['i18n']});
        const content = "<p>{{i18n 'first'}}";
        assert.deepEqual(lexer.extract(content), [{key: 'first'}]);
    });
});
