import * as constants from "./constants";
import * as utils from "./utils";
import * as aurora_validator from "./contracts/aurora_validator_utils";
import * as ref_finance from "./contracts/ref_finance_utils";
import * as wrap_near from "./contracts/wrap_near_utils";

async function main() {
  // const response = await aurora_validator.claimRewards(
  //   constants.MAINNET_CONFIG,
  //   String(process.env.USER_ACCOUNT_ID_1)
  // );
  // console.log(response);
  /********************************************************************************************************************/
  // // const response = await ref_finance.getPoolInfo(
  //   constants.MAINNET_CONFIG,
  //   String(process.env.USER_ACCOUNT_ID_1),
  //   1395
  // );
  // let amounts = response["amounts"];
  // let amount_to_sell = 10;
  // let per_aurora_price_for_x_amount = ref_finance.get_pool_token_1_sell_price(
  //   amount_to_sell,
  //   amounts[0] / constants.AURORA_DENOMINATION,
  //   amounts[1] / constants.NEAR_DENOMINATION,
  //   0.3
  // );
  // console.log(per_aurora_price_for_x_amount);
  /********************************************************************************************************************/
  let amount_to_sell = 1;
  let per_token_min_price_in_near = 1.2;
  const response = await ref_finance.sellTokenTowNear(
    constants.MAINNET_CONFIG,
    String(process.env.USER_ACCOUNT_ID_1),
    1395,
    utils.get_big_num_str_rep(amount_to_sell * constants.AURORA_DENOMINATION),
    constants.AURORA_TOKEN_ADDRESS,
    utils.get_big_num_str_rep(
      per_token_min_price_in_near * amount_to_sell * constants.NEAR_DENOMINATION
    )
  );
  console.log(response);
  /********************************************************************************************************************/
  // let near_amount_to_unwrap = 1 * constants.NEAR_DENOMINATION;
  // let near_amount_to_unwrap_in_str = utils.get_big_num_str_rep(
  //   near_amount_to_unwrap
  // );
  // const response = await wrap_near.unwrap(
  //   constants.MAINNET_CONFIG,
  //   String(process.env.USER_ACCOUNT_ID_1),
  //   near_amount_to_unwrap_in_str
  // );
  // console.log(response);
  /********************************************************************************************************************/
}

main();
