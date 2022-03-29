import assert from 'assert';

import Lexer from './index.mjs';

describe('Lexer', function() {
    it('extracts keys from translation components', function() {
        const lexer = new Lexer({functions: ['i18n']});
        const content = "<p>{{i18n 'first'}}</p>";
        assert.deepEqual(lexer.extract(content), [{key: 'first'}]);
    });
});
