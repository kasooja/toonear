"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calc_apy = exports.get_big_num_str_rep = void 0;
const get_big_num_str_rep = function (num) {
    return num.toLocaleString("fullwide", {
        useGrouping: false,
    });
};
exports.get_big_num_str_rep = get_big_num_str_rep;
const calc_apy = function (r, n) {
    r = Math.round(r * 100) / 100;
    let apy = Math.pow(1 + r / 100 / n, n) - 1;
    apy = Math.round(apy * 100 * 100) / 100;
    // apy = (1 + r/n )n – 1
    return apy;
};
exports.calc_apy = calc_apy;
//# sourceMappingURL=utils.js.map