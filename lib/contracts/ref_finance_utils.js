"use strict";
/* Temp fix: Using .js for files where a protected method e.g. signAndSendTransaction, is being used, as
  .ts would not allow access these methods directly. */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sellTokenTowNear = exports.getPoolInfo = exports.get_pool_token_1_sell_price = void 0;
const constants = __importStar(require("../constants"));
const nearApi = __importStar(require("near-api-js"));
const get_pool_token_1_sell_price = function get_pool_token_1_sell_price(token_1_amount_to_be_sold, pool_token_1_count, pool_token_2_count, fees) {
    const product = pool_token_1_count * pool_token_2_count;
    const pool_token_amount_after_tx = pool_token_1_count + token_1_amount_to_be_sold;
    if (token_1_amount_to_be_sold == 0) {
        token_1_amount_to_be_sold = 1;
    }
    let token_price_for_tx = (pool_token_2_count - product / pool_token_amount_after_tx) /
        token_1_amount_to_be_sold;
    token_price_for_tx = token_price_for_tx - (fees / 100) * token_price_for_tx;
    return token_price_for_tx;
};
exports.get_pool_token_1_sell_price = get_pool_token_1_sell_price;
const getPoolInfo = async function getPoolInfo(config, accountId, pool_id) {
    const near = await nearApi.connect(config);
    const account = await near.account(accountId);
    const action1 = nearApi.transactions.functionCall("get_pool", { pool_id: pool_id }, 100000000000000);
    let res = await account.signAndSendTransaction({
        receiverId: "v2.ref-finance.near",
        actions: [action1],
    });
    let decodedRes = await nearApi.providers.getTransactionLastResult(res);
    return decodedRes;
};
exports.getPoolInfo = getPoolInfo;
const sellTokenTowNear = async function sellTokenTowNear(config, accountId, pool_id, token_amount, token_address, min_amount_out) {
    const near = await nearApi.connect(config);
    const account = await near.account(accountId);
    const action1 = nearApi.transactions.functionCall("ft_transfer_call", {
        receiver_id: "v2.ref-finance.near",
        amount: token_amount,
        msg: '{"force":0,"actions":[{"pool_id":' +
            pool_id +
            ',"token_in":"' +
            token_address +
            '","token_out":"wrap.near","amount_in":"' +
            token_amount +
            '","min_amount_out":"' +
            min_amount_out +
            '"}]}',
    }, 100000000000000, nearApi.utils.format.parseNearAmount(String(nearApi.utils.format.formatNearAmount("1"))));
    let res = await account.signAndSendTransaction({
        receiverId: constants.AURORA_TOKEN_ADDRESS,
        actions: [action1],
    });
    let decodedRes = await nearApi.providers.getTransactionLastResult(res);
    return decodedRes;
};
exports.sellTokenTowNear = sellTokenTowNear;
//# sourceMappingURL=ref_finance_utils.js.map