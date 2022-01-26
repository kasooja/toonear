const nearAPI = require("near-api-js");
const os = require("os")
const path = require("path")


CRED_PATH = path.join('/Users/gauneg/Desktop/block-chain-tools', 'cred.json')

const { connect, keyStores, KeyPair, WalletConnection } = nearAPI;


async function con(){

  
// creates a public / private key pair using the provided private key
// adds the keyPair you created to keyStore


const config = {
  networkId: "mainnet",
  keyStore: new keyStores.UnencryptedFileSystemKeyStore(CRED_PATH),
  nodeUrl: "https://rpc.mainnet.near.org",
  walletUrl: "https://wallet.mainnet.near.org",
  helperUrl: "https://helper.mainnet.near.org",
  explorerUrl: "https://explorer.mainnet.near.org",
};

// connect to NEAR
const near = await connect(config);

// create wallet connection
// const wallet = new WalletConnection(near);
const senderAccount = await near.account('iamtheuserofthis.near');

return senderAccount.getAccountBalance()
}

con().then(res=> {

  let ob = {
    'total': nearAPI.utils.format.formatNearAmount(res['total']),
    'stateStaked': nearAPI.utils.format.formatNearAmount(res['stateStaked']),
    'staked': nearAPI.utils.format.formatNearAmount(res['staked']),
    'available': nearAPI.utils.format.formatNearAmount(res['available'])
  }
  console.log(ob)

}).catch(err=> {
  console.log('ERROR')
  console.log(err)
  console.log('--------------')
  
})

