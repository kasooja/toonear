"use strict";
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
exports.MAINNET_CONFIG = exports.AURORA_TOKEN_ADDRESS = exports.NEAR_DENOMINATION = exports.AURORA_DENOMINATION = void 0;
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const nearApi = __importStar(require("near-api-js"));
exports.AURORA_DENOMINATION = Math.pow(10, 18);
exports.NEAR_DENOMINATION = Math.pow(10, 24);
exports.AURORA_TOKEN_ADDRESS = "aaaaaa20d9e0e2461697782ef11675f668207961.factory.bridge.near";
exports.MAINNET_CONFIG = {
    networkId: "mainnet",
    keyStore: new nearApi.keyStores.UnencryptedFileSystemKeyStore(String(process.env.NEAR_CRED_STORE_PATH)),
    nodeUrl: "https://rpc.mainnet.near.org",
    walletUrl: "https://wallet.mainnet.near.org",
    helperUrl: "https://helper.mainnet.near.org",
    explorerUrl: "https://explorer.mainnet.near.org",
};
//# sourceMappingURL=constants.js.map