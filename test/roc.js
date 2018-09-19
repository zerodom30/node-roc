const assert = require('assert');
const ROC = require('../index');

describe('ROC Indicator', () => {
    describe('calculate ROC', () => {
        it('should calculate momentum on a 5 day period', (done) => {
            const data = [
                52.00,
                51.00,
                51.50,
                48.50,
                53.00,
                53.50,
                53.50,
                54.00,
                54.00,
                55.00
            ].reverse(); //lazy, i built the array backwards
            const expected = [
                { value: 52.00 },
                { value: 51.00 },
                { value: 51.50 },
                { value: 48.50 },
                { value: 53.00 },
                { value: 53.50, momentum: 1.50, closingPrice: 52.00, roc: 2.8846153846153846 },
                { value: 53.50, momentum: 2.50, closingPrice: 51.00, roc: 4.901960784313726 },
                { value: 54.00, momentum: 2.50, closingPrice: 51.50, roc: 4.854368932038835 },
                { value: 54.00, momentum: 5.50, closingPrice: 48.50, roc: 11.34020618556701 },
                { value: 55.00, momentum: 2.00, closingPrice: 53.00, roc: 3.7735849056603774 }
            ];

            const roc = new ROC(data, 5);
            roc.calculate((err, data) => {
                assert.deepEqual(data, expected);
                done();
            });
        });
    });
});
