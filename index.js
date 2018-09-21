'use strict'
const Decimal = require('decimal.js');

class ROC {
    constructor(values, period) {
        this.values = values ? values.reverse() : [];
        this.period = period;
    }

    calculate(callback) {
        this.calculateROC((err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    }

    calculateROC(callback) {
        const data = [];
        const values = this.values;

        if (values && values.length > this.period) {
            values.forEach((val, idx) => {
                if (idx > (this.period - 1)) {
                    const closingPrice = values[(idx - (this.period ))];
                    const momentum = Decimal.sub(val, closingPrice).toNumber();
                    const roc = Decimal.mul(Decimal.div(momentum, closingPrice), 100).toNumber();

                    data[idx] = {
                        value: val,
                        closingPrice,
                        momentum,
                        roc
                    };
                } else {
                    data[idx] = { value: val };
                }

            });
        }
        return callback(null, data);
    }
}

module.exports = ROC;