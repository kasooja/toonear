import * as nearApi from "near-api-js";
import * as functions from "firebase-functions";
import * as firebase_utils from "./utils/firebase_admin_utils";
const { keyStores, KeyPair } = nearApi;
import * as constants from "./library/constants";
import * as aurora_validator from "./library/contracts/aurora_validator_utils";
import * as ref_finance from "./library/contracts/ref_finance_utils";
import * as wrap_near from "./library/contracts/wrap_near_utils";
import * as utils from "./library/utils";

const get_near_config = async function get_near_keystore() {
  const keyStore = new keyStores.InMemoryKeyStore();
  let near_account_priv_key = null;
  let near_account_id = null;
  try {
    near_account_priv_key = functions.config().near_account_1.private_key;
    near_account_id = functions.config().near_account_1.account_id;
  } catch (err) {
    const near_account_1 = JSON.parse(String(process.env.USER_ACCOUNT_1));
    near_account_priv_key = near_account_1["private_key"] || undefined;
    near_account_id = near_account_1["account_id"] || undefined;
  }

  const keyPair = KeyPair.fromString(near_account_priv_key);
  await keyStore.setKey("mainnet", near_account_id, keyPair);

  let mainnet_config = {
    networkId: "mainnet",
    keyStore: keyStore,
    nodeUrl: "https://rpc.mainnet.near.org",
    walletUrl: "https://wallet.mainnet.near.org",
    helperUrl: "https://helper.mainnet.near.org",
    explorerUrl: "https://explorer.mainnet.near.org",
  };
  return { mainnet_config, near_account_id };
};

export const autocompound = async function autocompound(admin: any) {
  console.log("Autocompounder started");
  const near_connection = await get_near_config();
  const near_config = near_connection.mainnet_config;
  const near_account_id = near_connection.near_account_id;

  const db = admin.firestore.Firestore;
  const parameter_path = "/auto_compounder/aurora_validator";
  const parameter_data = await firebase_utils.getDocData(
    admin,
    null,
    parameter_path
  );

  const aur_tokens_sell_per = parameter_data["aur_tokens_sell_per"];
  console.log("aur tokens % to sell: ", aur_tokens_sell_per);
  const min_per_aur_token_price_to_sell =
    parameter_data["min_per_aur_token_price_to_sell"];
  console.log("min near per token price: ", min_per_aur_token_price_to_sell);

  const test_amt_to_sell = 5;
  const pool_info_response = await ref_finance.getPoolInfo(
    near_config,
    near_account_id,
    constants.REF_FIN_AUR_NEAR_POOL_ID
  );
  let amounts = pool_info_response["amounts"];

  let per_aurora_price_for_x_amount = ref_finance.get_pool_token_1_sell_price(
    test_amt_to_sell,
    amounts[0] / constants.AURORA_DENOMINATION,
    amounts[1] / constants.NEAR_DENOMINATION,
    constants.REF_FIN_AUR_NEAR_POOL_FEES
  );
  console.log(
    "Current aur price for trade size in terms of near on ref fin: ",
    per_aurora_price_for_x_amount
  );

  /********************************************************************************************************************/
  if (per_aurora_price_for_x_amount > min_per_aur_token_price_to_sell) {
    let claim_response = await aurora_validator.claimRewards(
      near_config,
      near_account_id
    );
    const claim_reg = "Transfer\\s*(\\d+)\\s*from\\s*aur.*to.*near";
    let claim_match: any = claim_response.join(", ").match(claim_reg);
    if (claim_match !== null) {
      let aur_token: string | null = claim_match[1];
      if (aur_token !== null) {
        let aur_tokens_in_num = Number(aur_token);
        console.log(
          "Aurora tokens claimed as rewards: ",
          aur_tokens_in_num / constants.AURORA_DENOMINATION
        );
        let amount_to_sell: number =
          (aur_tokens_sell_per * aur_tokens_in_num) /
          constants.AURORA_DENOMINATION;
        amount_to_sell = utils.fix_decimal(
          amount_to_sell,
          constants.AURORA_DENOMINATION
        );
        console.log("amount to sell: ", amount_to_sell);

        let min_nears_to_be_received =
          min_per_aur_token_price_to_sell * amount_to_sell;
        min_nears_to_be_received = utils.fix_decimal(
          min_nears_to_be_received,
          constants.NEAR_DENOMINATION
        );
        console.log("Min wNears to be received: ", min_nears_to_be_received);
        const sell_response = await ref_finance.sellTokenTowNear(
          near_config,
          near_account_id,
          constants.REF_FIN_AUR_NEAR_POOL_ID,
          utils.get_big_num_str_rep(
            amount_to_sell * constants.AURORA_DENOMINATION
          ),
          constants.AURORA_TOKEN_ADDRESS,
          utils.get_big_num_str_rep(
            min_nears_to_be_received * constants.NEAR_DENOMINATION
          )
        );
        const sell_reg =
          "Transfer\\s*(\\d+)\\s*from\\s*v2.ref-finance.near.*to.*near";
        let sell_match: any = sell_response.join(", ").match(sell_reg);
        if (sell_match !== null) {
          let wnear_received: string | null = sell_match[1];
          if (wnear_received !== null) {
            console.log(
              "Actual wNear received: ",
              Number(wnear_received) / constants.NEAR_DENOMINATION
            );

            const unwrap_response = await wrap_near.unwrap(
              near_config,
              near_account_id,
              wnear_received
            );
            console.log("unwrapped wNear");

            const stake_response = await aurora_validator.stakeNear(
              near_config,
              near_account_id,
              wnear_received
            );
            console.log("staker near");
          }
        }
      }
    }
  }
};
