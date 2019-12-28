import { AccountancyJop } from './accountancy.jop';

describe('Accountancy', () => {
    describe('GenerateDigest', () => {
        it('Should generate correct digest with an empty body', () => {
            const expected = 'sha-512=z4PhNX7vuL3xVChQ1m2AB9Yg5AULVxXcg/SpIdNs6c5H0NE8XYXysP+DGNKHfuwvY7kxvUdBeoGlODJ6+SfaPg==';
            const actual = AccountancyJop.generateDigest('');

            expect(actual).toBe(expected);
        });
    });
});
