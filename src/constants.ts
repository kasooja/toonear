import * as dotenv from "dotenv";
dotenv.config();
import * as nearApi from "near-api-js";

export const AURORA_DENOMINATION = Math.pow(10, 18);
export const NEAR_DENOMINATION = Math.pow(10, 24);

export const AURORA_TOKEN_ADDRESS =
  "aaaaaa20d9e0e2461697782ef11675f668207961.factory.bridge.near";

export const REF_FIN_AUR_NEAR_POOL_ID = 1395;
export const REF_FIN_AUR_NEAR_POOL_FEES = 0.3;

export const MAINNET_CONFIG = {
  networkId: "mainnet",
  keyStore: new nearApi.keyStores.UnencryptedFileSystemKeyStore(
    String(process.env.NEAR_CRED_STORE_PATH)
  ),
  nodeUrl: "https://rpc.mainnet.near.org",
  walletUrl: "https://wallet.mainnet.near.org",
  helperUrl: "https://helper.mainnet.near.org",
  explorerUrl: "https://explorer.mainnet.near.org",
};
