import { AccountancyJop } from './accountancy.jop';

describe('Accountancy', () => {
    describe('GenerateDigest', () => {
        it('Should generate correct digest with an empty body', () => {
            const expected = 'sha-512=z4PhNX7vuL3xVChQ1m2AB9Yg5AULVxXcg/SpIdNs6c5H0NE8XYXysP+DGNKHfuwvY7kxvUdBeoGlODJ6+SfaPg==';
            const actual = AccountancyJop.generateDigest('');

            expect(actual).toBe(expected);
        });

        it('Should generate correct digest with a body', () => {
            const expected = 'sha-512=usgcCih/9wfB+Sz7rli5No4+pc8D+CDOQkYBRzAwxzRlFC54wFxzDL4BVuUhzqP7Fp/B3e++Vq8JDdrdfFX5rg==';
            const actual = AccountancyJop.generateDigest('Salve Mundi is great!');

            expect(actual).toBe(expected);
        });
    });

    describe('Generate signature', () => {
        it('Should generate correct signature for header', () => {
            const signatureString = '';
            const signatureHeaders = 'date digest x-request-id';
            const privateKey: Buffer = null;
            const keyId = 123456;

            const expected = `keyId="${keyId}",algorithm="rsa-sha512",headers="${signatureHeaders}",signature="${''}"`;
            const actual = AccountancyJop.generateSignature(signatureString, signatureHeaders, privateKey, keyId);

            expect(actual).toBe(expected);
        });
    });
});
