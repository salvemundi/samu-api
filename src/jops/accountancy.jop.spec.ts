import { AccountancyJop } from './accountancy.jop';

// Private key and certificate generate only for this unit test
const privateKeyString = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDI1ErzOFMlymIR
XYDcNRmZ1ltCxOha6eHnzn47NvYaL4r3BMQH6lhgiYrE3/DV/aUgv7fmhMfOlGL0
ED0LSHpO8vcNru46HzeErWEulvpyKcYFBRVHZhuH7M2QJegpcjzrnm2+4VGvtU3n
pNNWs9MblCy6yStBw68LI62YTw2hK7mrZVzP4/7Nvt5Pp8HxrPM4uVV+ny3DxyJ5
1ahZkgw1u3gfrW6Vp5R4SV5mAZGkeeF4m0ygNZtvv/NRFMjFbDm5bRZXfE3Zyb2a
/MIwTCmtrwugdPSKOABrPDRq5ZXDBhvQ7NqxLQQ+xBN9gmsRPEh+Rn1l8S3nIQWi
HdOcSIR1AgMBAAECggEAIDTbaDHqM69HFt3V4nqphmA39nc5hArp7ZDR8ZEY2o4x
TPf4sARG9ARausPnDYpFxwC370HwARMO43EPORYAd1TDhfA9yBhlgOOFKEGSHGjS
ls9/4Blh5OR2+tz5ZFwrpOWdV/Uucm0y9ykZs1fXTR7wJWxJgZxuH+0y07Ap0WS2
6AB9mpKDYVi5hHHFio07b7SAw+RhOxrR81aSDZdxrAgHggzI82FUjlL1TJCFqiKT
R5nYHjC8jtrVFAuqDZLl25TeadlOUPpb2uyNeqaT5N+eUIJZpy2oJgBO8ZANyB5U
46JZte3GbRLIRzyUOESVa9w0BoSoWIJ9iunuNMCegQKBgQDvFxQX83SWlHpb7XXI
WwrokSTx+Mf42jR9rSWgg7JjeQn7AAZKSdDUOfVP3Oho8Zxs2L5WUxMu0AvlN5pp
eZgVioApGLgXozG/8nR8th2gmWrk03auY6S/PckOumIeiVGz0OH+FUQdVRz4pMtc
G2pnff0AozrrDjsgIUC9gmCcBQKBgQDXCHhMuiL5QNDi6MPH5AXooNu+2tJCUlvQ
JwrNa+3/2mrD20xDUvHKJCGYwMjST2HUcY5XldiNqbRySTN9IO+U/yqmP8vbKDTJ
KRUllohm/d50D3lG2ByAqYRel6TzAd+9DutPYD7syV+nrsAJC4cCwApa1kdpjDMP
grpGs+AhsQKBgEknMoqxfraj71w5J5SJ5qiJ4Ff42paVjQH2/FBEe0xcOGWH+GS6
eR62LQymdqXFZysWlgYrnO7x0PHtNV2YSqQsoFHyskDpOcuVD3co8Z+10TL6UJHD
AyFQcjgDZwoY0drGyp7HOvQOmrKpGV+xM7k+ny6Wwuwwin6mLfzN62lRAoGBAJda
hdpztcQ9hAoDDjL3Y9VOy/11ZkN6VteXc3oNuvK4mSeMhwxoKHpAnkk3gOLPLyvq
Ved+OHPV/IXo0k4Dzb7RMALeqq1yil0BBrpzT0U28co9Tf64hK9nIh22nUrSido3
0xcGxqPCRgrv7IkxTPF5nJA9fPxky1fiixzS5TKxAoGAO8k02IYsCnW5jQb+l80n
IinhyaBY9C9XaKfyAQR4hZgJHie9eyG/XDOG9lx1ubjmfpszdEAbwwNnl4OlVWRf
umoYxlH7Gf3EBNcm5+73Ea7oIEBKoff/rpu3nRCXNQGH7mGmWF+sslkmVY5Od4QT
LPS9mtDpV02f1+frrKyuaNA=
-----END PRIVATE KEY-----`;

const certificateString = `-----BEGIN CERTIFICATE-----
MIID4DCCAsgCCQC1XrMIJTmshzANBgkqhkiG9w0BAQsFADCBsTELMAkGA1UEBhMC
TkwxFjAUBgNVBAgMDU5vb3JkLUJyYWJhbnQxEjAQBgNVBAcMCUVpbmRob3ZlbjEZ
MBcGA1UECgwQVmVyaGFhclNvbHV0aW9uczETMBEGA1UECwwKRm9uc3RhZ3JhbTEW
MBQGA1UEAwwNSm9wIFZlcmhvZXZlbjEuMCwGCSqGSIb3DQEJARYfam9wLnZlcmhv
ZXZlbkBzdHVkZW50LmZvbnR5cy5ubDAeFw0xOTEyMDIwODEyMjBaFw0yMDEyMDEw
ODEyMjBaMIGxMQswCQYDVQQGEwJOTDEWMBQGA1UECAwNTm9vcmQtQnJhYmFudDES
MBAGA1UEBwwJRWluZGhvdmVuMRkwFwYDVQQKDBBWZXJoYWFyU29sdXRpb25zMRMw
EQYDVQQLDApGb25zdGFncmFtMRYwFAYDVQQDDA1Kb3AgVmVyaG9ldmVuMS4wLAYJ
KoZIhvcNAQkBFh9qb3AudmVyaG9ldmVuQHN0dWRlbnQuZm9udHlzLm5sMIIBIjAN
BgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyNRK8zhTJcpiEV2A3DUZmdZbQsTo
Wunh585+Ozb2Gi+K9wTEB+pYYImKxN/w1f2lIL+35oTHzpRi9BA9C0h6TvL3Da7u
Oh83hK1hLpb6cinGBQUVR2Ybh+zNkCXoKXI8655tvuFRr7VN56TTVrPTG5Qsuskr
QcOvCyOtmE8NoSu5q2Vcz+P+zb7eT6fB8azzOLlVfp8tw8ciedWoWZIMNbt4H61u
laeUeEleZgGRpHnheJtMoDWbb7/zURTIxWw5uW0WV3xN2cm9mvzCMEwpra8LoHT0
ijgAazw0auWVwwYb0OzasS0EPsQTfYJrETxIfkZ9ZfEt5yEFoh3TnEiEdQIDAQAB
MA0GCSqGSIb3DQEBCwUAA4IBAQB1mT+PiGTof6fssH7ddjMwv+Gf2j6vKUsDBqH5
OggGulOprakS+NTBksaYnMQX9CSJAYBvSR+zdExkBtWRRvdoLIk7YIzG/dGedAPh
9/mbppdCbIXn41zPsdrVpTFCM6sv72MtHnNTm/F+QD/uwyictbl92Lf8pipdh2uY
tMzcr7BHr1gt34oKwXPC8AwwVfRnfu3flRPUNd2a0r2Ysg985GK3GEYg8Xk6M6tR
GokuQRU+J8cP+2/d0hk/sTC5fmBS3eez5ot5E3bVUyJAadLmOGrxAGH1IyDJEf5C
+EIcMR0ttiZmYdDkdM/qkQS8eJz0UjKdH4lTe5Hf6eg/2YHc
-----END CERTIFICATE-----`;

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
            const signatureString = 'date: Sat, 28 Dec 2019 19:06:59 GMT\ndigest: sha-512=z4PhNX7vuL3xVChQ1m2AB9Yg5AULVxXcg/SpIdNs6c5H0NE8XYXysP+DGNKHfuwvY7kxvUdBeoGlODJ6+SfaPg==\nx-request-id: db18e9eb-a274-49fa-aa9d-5ca776b740ae';
            const signatureHeaders = 'date digest x-request-id';
            const privateKey = Buffer.from(privateKeyString);
            const keyId = 123456;

            const expected = `keyId="${keyId}",algorithm="rsa-sha512",headers="${signatureHeaders}",signature="oXDMR5Gfj57yZVdWIhMUCoslH5TjwQr2G6ZCGB7BHI2rU3/y9/hjEuT05oyB1w0VpdTJo0CF3An3GEq+PSYZZfORpop6zEGMyeYCuBZT27FoS9Z9eFg6BpL9B3Ya0PIWmlX4vbsEfYfIXEMXFQWGO/9aFOQ/BRXWOSS2fdEQWbM3//Tn0HzHnZT1YOymPi9OelkFXlbGKsBTKdB+wf7TN0RR2HDlhwAxHi2LtTHQI5NXhRTqKBW0/Vd+FfVIYeqpPirEf6OtS8Mv8qiAe7Pe3f7tqlVs1NazPL5sc1ynkZ5DCDDLkmRYgVpKA1w+d0sW3L27XMAFkkU8cL7ZIsN5yw=="`;
            const actual = AccountancyJop.generateSignature(signatureString, signatureHeaders, privateKey, keyId);

            expect(actual).toBe(expected);
        });
    });

    describe('Get Http header', () => {
        it('Should generate a correct header', () => {
            const token = 'Random token';
            const privateKey = Buffer.from(privateKeyString);
            const certificate = Buffer.from(certificateString);
            const clientId = 'Random ClientId';
            const certificateId = 123456;

            const actual = AccountancyJop.getHttpsHeader(token, certificate, privateKey, clientId, certificateId);
            const expected = {
                'Authorization': `Bearer ${token}`,
                'digest': 'sha-512=z4PhNX7vuL3xVChQ1m2AB9Yg5AULVxXcg/SpIdNs6c5H0NE8XYXysP+DGNKHfuwvY7kxvUdBeoGlODJ6+SfaPg==',
                'tpp-signature-certificate': certificate.toString('utf8').replace(/\r?\n|\r/g, '').substr(27, 1224),
                'x-ibm-client-id': clientId,
            };

            expect(actual.Authorization).toBe(expected.Authorization);
            expect(actual.digest).toBe(expected.digest);
            expect(actual['tpp-signature-certificate']).toBe(expected['tpp-signature-certificate']);
            expect(actual['x-ibm-client-id']).toBe(expected['x-ibm-client-id']);
            expect(actual.date).toBeDefined();
            expect(actual.signature).toBeDefined();
            expect(actual['tpp-signature-certificate']).toBeDefined();
        });
    });
});
