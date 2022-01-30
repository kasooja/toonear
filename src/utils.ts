export const get_big_num_str_rep = function (num: number) {
  return num.toLocaleString("fullwide", {
    useGrouping: false,
  });
};
