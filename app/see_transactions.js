const nearAPI = require("near-api-js");
const os = require("os")
const path = require("path")


CRED_PATH = path.join('/Users/gauneg/Desktop/block-chain-tools', 'cred.json')

const { connect, keyStores, KeyPair, WalletConnection, providers } = nearAPI;

const provider = new providers.JsonRpcProvider("https://rpc.mainnet.near.org")

const TX_HASH = 'EY1uZqhJnSzZC3ZK3LuafpkSzDArj6zwJcWap6vJeJGt'

const ACCOUNT_ID = 'iamtheuserofthis.near'


// transaction information ..
provider.txStatus(TX_HASH, ACCOUNT_ID)
.then(res=>{
    console.log(JSON.stringify(res))
}).catch(err=>{
    console.log(err)
})


