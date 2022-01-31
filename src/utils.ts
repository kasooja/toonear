import * as constants from "./constants";

export const get_big_num_str_rep = function (num: number) {
  return num.toLocaleString("fullwide", {
    useGrouping: false,
  });
};

export const fix_decimal = function (num: number, denomination: number) {
  return Math.floor(num * denomination) / denomination;
};

export const calc_apy = function (r: number, n: number) {
  r = Math.round(r * 100) / 100;
  let apy = Math.pow(1 + r / 100 / n, n) - 1;
  apy = Math.round(apy * 100 * 100) / 100;
  // apy = (1 + r/n )n – 1
  return apy;
};
